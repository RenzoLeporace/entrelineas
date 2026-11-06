$ErrorActionPreference='Stop'
$projectRoot=[IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
Set-Location -LiteralPath $projectRoot
& node 'scripts/prepare-web.mjs'
if($LASTEXITCODE -ne 0){throw 'No se pudo preparar la edición web.'}
& node 'tests/web.test.mjs'
if($LASTEXITCODE -ne 0){throw 'La edición web no pasó sus comprobaciones.'}
$publishRoot=Join-Path $projectRoot 'build/pages'
function Invoke-PublishGit([string[]]$GitArguments){
 & git -C $publishRoot @GitArguments
 if($LASTEXITCODE -ne 0){throw ('Falló Git al publicar: '+$GitArguments[0])}
}
$remoteUrl=(& git -C $projectRoot remote get-url origin)
if($LASTEXITCODE -ne 0 -or $remoteUrl -ne 'https://github.com/RenzoLeporace/entrelineas.git'){throw 'El remoto debe ser el repositorio autorizado RenzoLeporace/entrelineas.'}
if(-not(Test-Path -LiteralPath (Join-Path $publishRoot '.git'))){
 Invoke-PublishGit @('init','-b','gh-pages')
 Invoke-PublishGit @('remote','add','origin',$remoteUrl)
 Invoke-PublishGit @('fetch','origin','gh-pages')
 Invoke-PublishGit @('reset','--mixed','origin/gh-pages')
}
Invoke-PublishGit @('config','user.name','Leporace Renzo')
Invoke-PublishGit @('config','user.email','111261473+RenzoLeporace@users.noreply.github.com')
Invoke-PublishGit @('add','.')
& git -C $publishRoot diff --cached --quiet
if($LASTEXITCODE -eq 1){Invoke-PublishGit @('commit','-m','Actualizar la edicion web de EntreLineas')}
elseif($LASTEXITCODE -ne 0){throw 'No se pudo comprobar la edición preparada.'}
Invoke-PublishGit @('push','-u','origin','gh-pages')
Write-Output 'Edición enviada a gh-pages. Comprobar la publicación en GitHub Pages antes de anunciarla disponible.'
