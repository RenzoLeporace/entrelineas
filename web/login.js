'use strict';
// Presentation gate requested for the web preview. This is not server-side
// authentication: GitHub Pages serves every asset publicly.
(() => {
 const root=document.querySelector('#app');
 const scripts=JSON.parse(document.querySelector('#game-scripts').textContent);
 const sessionKey='entrelineas-web-preview-access';
 let loading=false;
 const render=()=>{
  root.innerHTML=`<main class="web-access"><section class="web-access-card" aria-labelledby="access-title"><img class="web-access-mark" src="assets/favicon.svg" width="52" height="52" alt=""><p class="web-access-kicker">EL ARCHIVO DE LO IMPOSIBLE</p><h1 id="access-title">EntreLíneas</h1><p class="web-access-intro">Ingresá para abrir el Archivo.</p><form id="access-form"><label for="access-user">Usuario</label><input id="access-user" name="username" autocomplete="username" required autocapitalize="none" spellcheck="false"><label for="access-password">Contraseña</label><div class="web-password-row"><input id="access-password" name="password" type="password" autocomplete="current-password" required><button id="access-reveal" type="button" aria-label="Mostrar contraseña" aria-pressed="false">Ver</button></div><p id="access-message" role="status" aria-live="polite"></p><button class="web-access-submit" type="submit">Ingresar <span aria-hidden="true">→</span></button></form><footer>© 2026 Leporace Renzo<br><a href="LICENSE.txt" target="_blank" rel="noopener">Licencia</a><span aria-hidden="true"> · </span><a href="THIRD_PARTY_NOTICES.txt" target="_blank" rel="noopener">Créditos y avisos</a></footer></section></main>`;
  const form=document.querySelector('#access-form'),message=document.querySelector('#access-message');
  document.querySelector('#access-reveal').addEventListener('click',()=>{
   const input=document.querySelector('#access-password'),button=document.querySelector('#access-reveal'),show=input.type==='password';input.type=show?'text':'password';button.textContent=show?'Ocultar':'Ver';button.setAttribute('aria-label',show?'Ocultar contraseña':'Mostrar contraseña');button.setAttribute('aria-pressed',String(show));
  });
  form.addEventListener('submit',async event=>{
   event.preventDefault();if(loading)return;
   if(document.querySelector('#access-user').value.trim()!=='ADMIN'||document.querySelector('#access-password').value!=='ADMIN1234'){message.textContent='Usuario o contraseña incorrectos.';document.querySelector('#access-password').focus();return;}
   try{sessionStorage.setItem(sessionKey,'granted');}catch{}
   await launch();
  });
 };
 async function launch(){
  if(loading)return;loading=true;
  const button=document.querySelector('.web-access-submit'),message=document.querySelector('#access-message');if(button){button.disabled=true;button.textContent='Abriendo el Archivo…';}if(message)message.textContent='';
  try{
   for(const source of scripts)await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=source;script.async=false;script.onload=resolve;script.onerror=()=>reject(Error(source));document.head.append(script);});
   document.body.classList.remove('web-access-pending');
  }catch{
   try{sessionStorage.removeItem(sessionKey);}catch{}
   root.innerHTML='<main class="web-access"><section class="web-access-card"><h1>No pudimos abrir el Archivo</h1><p>Comprobá tu conexión y volvé a intentarlo. Tu partida guardada se conserva.</p><button class="web-access-submit" id="access-retry">Volver a intentar</button></section></main>';
   document.querySelector('#access-retry').addEventListener('click',()=>location.reload());
  }
 }
 let granted=false;try{granted=sessionStorage.getItem(sessionKey)==='granted';}catch{}
 if(granted)launch();else render();
})();
