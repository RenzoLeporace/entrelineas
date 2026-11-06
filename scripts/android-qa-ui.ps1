param([string]$TapText)
$ErrorActionPreference='Stop'
$adbPath='C:\Users\renzo\AppData\Local\Android\Sdk\platform-tools\adb.exe'
$qaFolder=Join-Path ([IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))) 'docs\qa'
New-Item -ItemType Directory -Force -Path $qaFolder | Out-Null
$xmlPath=Join-Path $qaFolder 'android-ui.xml'
for($attempt=0;$attempt -lt 5;$attempt++){
  & $adbPath shell uiautomator dump /sdcard/entrelineas-qa.xml | Out-Null
  & $adbPath pull /sdcard/entrelineas-qa.xml $xmlPath 2>$null | Out-Null
  [xml]$screen=Get-Content -LiteralPath $xmlPath
  $nodes=@($screen.SelectNodes('//node'))
  if(-not($nodes | Where-Object {$_.package -eq 'com.leporacerenzo.entrelineas.qa'})){throw 'La pantalla no pertenece al juego de pruebas.'}
  if(-not $TapText){$nodes | Where-Object {$_.text} | ForEach-Object {'{0}: {1}' -f $_.text,$_.bounds};break}
  $button=$nodes | Where-Object {($_.text -eq $TapText -or $_.'content-desc' -eq $TapText) -and $_.clickable -eq 'true'} | Select-Object -First 1
  if(-not $button){throw "No se encontró el control solicitado: $TapText"}
  if($button.bounds -match '^\[(\d+),(\d+)\]\[(\d+),(\d+)\]$'){
    $left=[int]$Matches[1];$top=[int]$Matches[2];$right=[int]$Matches[3];$bottom=[int]$Matches[4]
    if($right -gt $left -and $bottom -gt $top -and $top -ge 48 -and $bottom -lt 1384){
      & $adbPath shell input tap ([int](($left+$right)/2)) ([int](($top+$bottom)/2))
      Write-Output "Pulsado: $TapText";break
    }
  }
  if($attempt -eq 4){throw 'El control continúa fuera de la vista.'}
  & $adbPath shell input swipe 610 1190 610 500 400
}
