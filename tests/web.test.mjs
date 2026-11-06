import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const html=fs.readFileSync('build/pages/index.html','utf8');
const manifest=JSON.parse(html.match(/id="game-scripts">([^<]+)/)[1]);
const elements=new Map(),loaded=[],memory=new Map();
function element(id){
 if(!elements.has(id))elements.set(id,{innerHTML:'',textContent:'',value:'',type:'password',handlers:{},addEventListener(name,fn){this.handlers[name]=fn;},focus(){},setAttribute(){}});
 return elements.get(id);
}
element('#game-scripts').textContent=JSON.stringify(manifest);
const context={console,queueMicrotask,sessionStorage:{getItem:k=>memory.get(k),setItem:(k,v)=>memory.set(k,v),removeItem:k=>memory.delete(k)},document:{querySelector:element,createElement:()=>({}),body:{classList:{remove(){}}},head:{append(script){loaded.push(script.src);queueMicrotask(script.onload);}}},location:{reload(){}}};
vm.createContext(context);
vm.runInContext(fs.readFileSync('web/login.js','utf8'),context);
assert.equal(loaded.length,0,'el juego espera al formulario');
element('#access-user').value='ADMIN';element('#access-password').value='incorrecta';
await element('#access-form').handlers.submit({preventDefault(){}});
assert.equal(loaded.length,0,'un acceso incorrecto no inicia el juego');
assert.match(element('#access-message').textContent,/incorrectos/);
element('#access-password').value='ADMIN1234';
await element('#access-form').handlers.submit({preventDefault(){}});
assert.deepEqual(loaded,manifest,'el acceso correcto carga los scripts en el orden del juego');
assert.equal(memory.get('entrelineas-web-preview-access'),'granted');
assert(html.includes('© 2026 Leporace Renzo · Todos los derechos reservados.'));
assert(!fs.readFileSync('dist/index.html','utf8').includes('web-login'),'la edición nativa conserva acceso directo');
assert.equal(fs.readFileSync('LICENSE','utf8'),fs.readFileSync('build/pages/LICENSE.txt','utf8'));
console.log('PASS: acceso web, carga ordenada, sesión, aviso de derechos, licencia y acceso nativo directo.');
