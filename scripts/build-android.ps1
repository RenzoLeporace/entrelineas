param([switch]$Qa,[string]$AndroidJdk)
$ErrorActionPreference='Stop'
$workspaceRoot=[IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
Set-Location -LiteralPath $workspaceRoot
$androidSdk=if($env:ANDROID_HOME){$env:ANDROID_HOME}else{Join-Path $env:LOCALAPPDATA 'Android\Sdk'}
$buildTools=Join-Path $androidSdk 'build-tools\34.0.0'
$androidJar=Join-Path $androidSdk 'platforms\android-34\android.jar'
if(-not $AndroidJdk){
  $installed17=Get-ChildItem -LiteralPath 'C:\Program Files\Eclipse Adoptium' -Directory -ErrorAction SilentlyContinue | Where-Object {$_.Name -like 'jdk-17*'} | Sort-Object Name -Descending | Select-Object -First 1
  $AndroidJdk=if($installed17){$installed17.FullName}else{$env:JAVA_HOME}
}
if($AndroidJdk){$env:JAVA_HOME=$AndroidJdk;$javaCompiler=Join-Path $AndroidJdk 'bin\javac.exe';$keyTool=Join-Path $AndroidJdk 'bin\keytool.exe'}else{$javaCompiler='javac';$keyTool='keytool'}
$buildRoot=Join-Path $workspaceRoot $(if($Qa){'build\android-qa'}else{'build\android'})
$classes=Join-Path $buildRoot 'classes'
$assets=Join-Path $buildRoot 'assets'
$signing=Join-Path $workspaceRoot 'private-signing'
New-Item -ItemType Directory -Force -Path $classes,(Join-Path $assets 'game'),$signing,(Join-Path $workspaceRoot 'entrega') | Out-Null
Get-ChildItem -LiteralPath 'dist' -Force | Copy-Item -Destination (Join-Path $assets 'game') -Recurse -Force
Copy-Item -LiteralPath 'LICENSE','THIRD_PARTY_NOTICES' -Destination (Join-Path $assets 'game')
& (Join-Path $buildTools 'aapt2.exe') compile --dir 'native\android\res' -o (Join-Path $buildRoot 'resources.zip')
if($LASTEXITCODE -ne 0){throw 'Falló aapt2 compile.'}
$manifestPath=Join-Path $workspaceRoot 'native\android\AndroidManifest.xml'
if($Qa){
  $qaManifest=[IO.File]::ReadAllText($manifestPath).Replace('package="com.leporacerenzo.entrelineas"','package="com.leporacerenzo.entrelineas.qa"').Replace('android:name=".MainActivity"','android:name="com.leporacerenzo.entrelineas.MainActivity"').Replace('android:label="EntreLíneas"','android:label="EntreLíneas · Pruebas"')
  $manifestPath=Join-Path $buildRoot 'AndroidManifest.xml'
  [IO.File]::WriteAllText($manifestPath,$qaManifest,[Text.UTF8Encoding]::new($false))
}
& (Join-Path $buildTools 'aapt2.exe') link -o (Join-Path $buildRoot 'unsigned.apk') --manifest $manifestPath -I $androidJar --min-sdk-version 26 --target-sdk-version 34 (Join-Path $buildRoot 'resources.zip')
if($LASTEXITCODE -ne 0){throw 'Falló aapt2 link.'}
& $javaCompiler -encoding UTF-8 -source 8 -target 8 -classpath $androidJar -d $classes 'native\android\src\com\leporacerenzo\entrelineas\MainActivity.java'
if($LASTEXITCODE -ne 0){throw 'Falló javac.'}
$classFiles=@(Get-ChildItem -LiteralPath $classes -Filter '*.class' -Recurse | ForEach-Object {$_.FullName})
& (Join-Path $buildTools 'd8.bat') --lib $androidJar --min-api 26 --output $buildRoot @classFiles
if($LASTEXITCODE -ne 0){throw 'Falló d8.'}
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip=[IO.Compression.ZipFile]::Open((Join-Path $buildRoot 'unsigned.apk'),[IO.Compression.ZipArchiveMode]::Update)
try{
  [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip,(Join-Path $buildRoot 'classes.dex'),'classes.dex',[IO.Compression.CompressionLevel]::Optimal) | Out-Null
  # Android ZIP asset paths must use '/', including when packaging on Windows.
  foreach($assetFile in Get-ChildItem -LiteralPath $assets -File -Recurse){
    $assetName='assets/'+$assetFile.FullName.Substring($assets.Length+1).Replace('\','/')
    [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip,$assetFile.FullName,$assetName,[IO.Compression.CompressionLevel]::Optimal) | Out-Null
  }
}finally{$zip.Dispose()}
& (Join-Path $buildTools 'zipalign.exe') -f -p 4 (Join-Path $buildRoot 'unsigned.apk') (Join-Path $buildRoot 'aligned.apk')
if($LASTEXITCODE -ne 0){throw 'Falló zipalign.'}
$keyFile=Join-Path $signing 'entrelineas-release.jks'
$passwordFile=Join-Path $signing 'signing-password.txt'
if(-not(Test-Path -LiteralPath $keyFile)){
  $env:VN_SIGN_PASSWORD=[Guid]::NewGuid().ToString('N')+[Guid]::NewGuid().ToString('N')
  [IO.File]::WriteAllText($passwordFile,$env:VN_SIGN_PASSWORD)
  & $keyTool -genkeypair -keystore $keyFile -storepass:env VN_SIGN_PASSWORD -keypass:env VN_SIGN_PASSWORD -alias entrelineas -keyalg RSA -keysize 3072 -validity 10950 -dname 'CN=Leporace Renzo, OU=EntreLineas, O=Leporace Renzo'
  if($LASTEXITCODE -ne 0){throw 'Falló la generación de la clave local.'}
}else{$env:VN_SIGN_PASSWORD=[IO.File]::ReadAllText($passwordFile)}
$output=if($Qa){Join-Path $buildRoot 'EntreLineas-Android-QA.apk'}else{Join-Path $workspaceRoot 'entrega\EntreLineas-v2.1-Android.apk'}
& (Join-Path $buildTools 'apksigner.bat') sign --ks $keyFile --ks-key-alias entrelineas --ks-pass env:VN_SIGN_PASSWORD --key-pass env:VN_SIGN_PASSWORD --out $output (Join-Path $buildRoot 'aligned.apk')
if($LASTEXITCODE -ne 0){throw 'Falló la firma APK.'}
& (Join-Path $buildTools 'apksigner.bat') verify --verbose $output
if($LASTEXITCODE -ne 0){throw 'La firma APK no pasó la verificación.'}
Remove-Item Env:VN_SIGN_PASSWORD
Get-Item -LiteralPath $output | Select-Object Name,Length
