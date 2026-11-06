$ErrorActionPreference='Stop'
$workspaceRoot=[IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
Set-Location -LiteralPath $workspaceRoot
$sdkRoot=Join-Path $workspaceRoot 'vendor\webview2'
if(-not(Test-Path -LiteralPath $sdkRoot)){throw 'Falta vendor/webview2 (SDK oficial Microsoft).'}
$buildRoot=Join-Path $workspaceRoot 'build\windows'
$packageRoot=Join-Path $buildRoot 'package'
New-Item -ItemType Directory -Force -Path $packageRoot,(Join-Path $packageRoot 'game'),(Join-Path $packageRoot 'licenses'),(Join-Path $workspaceRoot 'entrega') | Out-Null
Get-ChildItem -LiteralPath 'dist' -Force | Copy-Item -Destination (Join-Path $packageRoot 'game') -Recurse -Force
Copy-Item -LiteralPath 'LICENSE','THIRD_PARTY_NOTICES' -Destination (Join-Path $packageRoot 'licenses')
Copy-Item -LiteralPath (Join-Path $sdkRoot 'lib\net462\Microsoft.Web.WebView2.Core.dll'),(Join-Path $sdkRoot 'lib\net462\Microsoft.Web.WebView2.WinForms.dll'),(Join-Path $sdkRoot 'build\native\x64\WebView2Loader.dll') -Destination $packageRoot
Get-ChildItem -LiteralPath $sdkRoot -File | Where-Object {$_.Name -match 'license|notice|terms'} | Copy-Item -Destination (Join-Path $packageRoot 'licenses')
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archivePath=Join-Path $buildRoot ('game-'+[Guid]::NewGuid().ToString('N')+'.zip')
[IO.Compression.ZipFile]::CreateFromDirectory($packageRoot,$archivePath,[IO.Compression.CompressionLevel]::Optimal,$false)
$compiler=Join-Path $env:WINDIR 'Microsoft.NET\Framework64\v4.0.30319\csc.exe'
$output=Join-Path $workspaceRoot 'entrega\EntreLineas-v2.1-Windows-x64.exe'
Add-Type -AssemblyName System.Drawing
$bitmap=New-Object Drawing.Bitmap 64,64
$graphics=[Drawing.Graphics]::FromImage($bitmap)
$graphics.Clear([Drawing.Color]::FromArgb(23,61,52))
$gold=New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(237,202,129))
$green=New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(182,233,184))
$dark=New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(23,61,52))
$graphics.FillRectangle($gold,10,15,18,34);$graphics.FillRectangle($gold,36,15,18,34);$graphics.FillRectangle($gold,26,21,12,34);$graphics.FillRectangle($dark,30,24,4,25)
$graphics.FillRectangle($green,42,20,4,4);$graphics.FillRectangle($green,48,20,4,4);$graphics.FillRectangle($green,42,24,10,4);$graphics.FillRectangle($green,45,28,4,4)
$iconPath=Join-Path $buildRoot 'game.ico'
$icon=[Drawing.Icon]::FromHandle($bitmap.GetHicon());$iconStream=[IO.File]::Create($iconPath);$icon.Save($iconStream);$iconStream.Dispose();$icon.Dispose();$graphics.Dispose();$bitmap.Dispose();$gold.Dispose();$green.Dispose();$dark.Dispose()
& $compiler /nologo /target:winexe /platform:x64 /optimize+ /utf8output /codepage:65001 "/out:$output" '/r:System.dll' '/r:System.Core.dll' '/r:System.Drawing.dll' '/r:System.Windows.Forms.dll' '/r:System.IO.Compression.dll' '/r:System.IO.Compression.FileSystem.dll' "/r:$sdkRoot\lib\net462\Microsoft.Web.WebView2.Core.dll" "/r:$sdkRoot\lib\net462\Microsoft.Web.WebView2.WinForms.dll" "/resource:$archivePath,game.zip" "/win32icon:$iconPath" '/win32manifest:native\windows\app.manifest' 'native\windows\Program.cs'
if($LASTEXITCODE -ne 0){throw 'Falló la compilación Windows.'}
Get-Item -LiteralPath $output | Select-Object Name,Length
