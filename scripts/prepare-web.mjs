import fs from 'node:fs';
import path from 'node:path';

// Separate output: native packages continue to embed dist without this gate.
const output=path.resolve('build/pages');
fs.mkdirSync(output,{recursive:true});
fs.cpSync('dist',output,{recursive:true});
for(const name of ['LICENSE','THIRD_PARTY_NOTICES'])fs.copyFileSync(name,path.join(output,name+'.txt'));
fs.copyFileSync('web/login.js',path.join(output,'web-login.js'));
fs.copyFileSync('web/login.css',path.join(output,'web-login.css'));
const original=fs.readFileSync('dist/index.html','utf8');
const scripts=[...original.matchAll(/<script\b[^>]*src="([^"]+)"[^>]*><\/script>/g)].map(match=>match[1]);
if(!scripts.length||scripts.at(-1)!=='app.js')throw Error('El manifiesto de scripts no coincide con el juego.');
let html=original.replace(/<script\b[^>]*src="[^"]+"[^>]*><\/script>/g,'');
html=html.replace('</head>','<meta name="author" content="Leporace Renzo"><meta name="copyright" content="© 2026 Leporace Renzo. Todos los derechos reservados."><link rel="stylesheet" href="web-login.css"></head>');
html=html.replace('<body>','<body class="web-access-pending">');
html=html.replace('</body>',`<footer class="web-rights" aria-label="Derechos de autor"><strong>© 2026 Leporace Renzo · Todos los derechos reservados.</strong><p>Prohibida la copia, redistribución o comercialización de los elementos originales sin autorización del titular, salvo los usos permitidos por la ley o la licencia.</p><a href="LICENSE.txt" target="_blank" rel="noopener">Licencia y condiciones de uso</a> · <a href="THIRD_PARTY_NOTICES.txt" target="_blank" rel="noopener">Créditos y derechos de terceros</a></footer><script type="application/json" id="game-scripts">${JSON.stringify(scripts)}</script><script src="web-login.js" defer></script><noscript>Activá JavaScript para jugar EntreLíneas.</noscript></body>`);
fs.writeFileSync(path.join(output,'index.html'),html);
fs.writeFileSync(path.join(output,'.nojekyll'),'');
console.log('Web preparada en build/pages; dist y los paquetes nativos conservan acceso directo.');
