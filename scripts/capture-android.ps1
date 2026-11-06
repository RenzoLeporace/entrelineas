param([string]$Name='android')
$ErrorActionPreference='Stop'
if($Name -notmatch '^[a-z0-9-]+$'){throw 'Nombre de captura inválido'}
$workspaceRoot=[IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$captureRoot=Join-Path $workspaceRoot 'docs\qa'
New-Item -ItemType Directory -Force -Path $captureRoot | Out-Null
$processInfo=[Diagnostics.ProcessStartInfo]::new()
$processInfo.FileName='C:\Users\renzo\AppData\Local\Android\Sdk\platform-tools\adb.exe'
$processInfo.Arguments='exec-out screencap -p'
$processInfo.UseShellExecute=$false
$processInfo.CreateNoWindow=$true
$processInfo.RedirectStandardOutput=$true
$captureProcess=[Diagnostics.Process]::Start($processInfo)
$destination=Join-Path $captureRoot ($Name+'.png')
$file=[IO.File]::Create($destination)
try{$captureProcess.StandardOutput.BaseStream.CopyTo($file)}finally{$file.Dispose()}
$captureProcess.WaitForExit()
if($captureProcess.ExitCode -ne 0){throw 'Falló la captura Android'}
Write-Output $destination
