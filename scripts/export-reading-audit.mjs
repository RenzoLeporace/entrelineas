import fs from 'node:fs';
import vm from 'node:vm';

const scope={console};scope.window=scope;vm.createContext(scope);
for(const match of fs.readFileSync('dist/index.html','utf8').matchAll(/<script[^>]+src="([^"]+)"/g)){
 const file=match[1];if(file==='app.js')continue;
 vm.runInContext(fs.readFileSync('dist/'+file,'utf8'),scope,{filename:file});
}
const folder='docs/auditoria-v2';fs.mkdirSync(folder,{recursive:true});
const expand=(world,state)=>{
 const chapter=world.chapters[state.chapter],base=chapter.narrative;
 const extra=typeof chapter.routeScenes==='function'?chapter.routeScenes(state):[];
 const position=base.findIndex(line=>line.id===chapter.routeInsertAfter);
 if(extra.length&&position<0)throw Error(`${world.id}/${state.chapter}: falta un ancla para la ruta`);
 return base.flatMap((line,i)=>i===position?[line,...extra]:[line]);
};
const text=value=>String(value||'').replaceAll('{{player}}','Alex');
const opening=scope.PROLOGUE.map((entry,i)=>`## ${i+1}. ${entry[0]}\n\n${text(entry[1])}`).join('\n\n');
fs.writeFileSync(folder+'/00-prologo.md',opening);
const inventory=[];
for(const world of scope.STORIES){
 for(const route of [0,1,2]){
  const state={choices:[route,route,route,route],repairs:[true,true,true,true],completed:[],diagnosis:{correct:true}};
  let out=`# ${world.title} · lectura de la variante ${route}\n\nEsta transcripción presenta lo que se lee: llegada, fuentes, decisión, debate y consecuencia. No sustituye una auditoría editorial.\n`;
  for(let chapterIndex=0;chapterIndex<world.chapters.length;chapterIndex++){
   state.chapter=chapterIndex;const chapter=world.chapters[chapterIndex];
   out+=`\n## Sección ${chapterIndex+1}: ${chapter.title}\n`;
   let location=chapter.location;
   for(const line of expand(world,state)){
    if(line.location&&line.location!==location){location=line.location;out+=`\n**Lugar: ${location}**\n`;}
    out+=`\n${line.id?`[${line.id}] `:''}**${line.speaker==='player'?'Alex':line.speaker}**\n\n${text(line.text)}\n`;
   }
   out+=`\n### Investigación\n\n${text(chapter.investigationIntro)}\n`;
   for(const [i,doc] of chapter.docs.entries())out+=`\n#### Documento ${i+1}: ${doc.title}\n\n${text(doc.text)}\n\nCuaderno: ${text(doc.clue)}\n`;
   if(chapter.repair)out+=`\n### Anotación de la fuente\n\n${chapter.repair.map(text).join('\n\n')}\n`;
   if(chapterIndex===world.chapters.length-1)out+=`\n### Hipótesis ante el Índice\n\n${world.mystery.question}\n\n${world.mystery.suspects.join(' / ')}\n\nFuentes exigidas: ${world.mystery.evidence.map(i=>`${Math.floor(i/3)+1}.${i%3+1}`).join(', ')}\n`;
   out+=`\n### Tu decisión\n\n${text(chapter.decision.question)}\n`;
   chapter.decision.options.forEach((option,i)=>{out+=`\n${i===route?'→':'·'} ${text(option)}\n`;});
   out+=`\n${text(chapter.decision.results[route])}\n\n### Confrontación con ${chapter.debate?.opponent||chapter.boss}\n\n${text(chapter.debate?.reason)}\n\n${text(chapter.debate?.opening)}\n`;
   for(const [i,round] of chapter.rounds.entries()){
    out+=`\n#### Intervención ${i+1} · ${round.kind||'argument'}\n\n${text(round.status)}\n`;
    const options=round.kind==='evidence'?chapter.docs.map(doc=>doc.title):round.kind==='sequence'?(round.sequence||chapter.timeline):round.options;
    if(!Array.isArray(options))throw Error(`${world.id}/${chapterIndex}/${i}: opciones ausentes`);
    out+=`\n${text(round.challengePrompt)}\n\n${options.map(text).join('\n\n')}\n\nRespuesta del interlocutor tras presentar la fuente adecuada:\n\n${text(round.why)}\n`;
   }
   const consequence=chapter.debateAfterByChoice?.[route];
   out+=`\n### Lo establecido al terminar\n\n${text(chapter.debate?.finding)}\n\n${text(chapter.debate?.infection)}\n\n### Lo que efectivamente hacés\n\n${text(typeof consequence==='function'?consequence(state):consequence)}\n`;
   if(route===0)inventory.push({world:world.id,section:chapterIndex+1,nodes:chapter.narrative.length,anchor:chapter.routeInsertAfter,opponent:chapter.debate?.opponent,kinds:chapter.rounds.map(r=>r.kind||'argument'),openingLocation:chapter.narrative.find(n=>n.location)?.location});
   state.completed.push(chapterIndex);
  }
  if(world.synthesis)out+=`\n## Conclusiones del expediente\n\n${world.synthesis.map(q=>`${q.question}\n\n${q.options.join('\n\n')}\n\n${q.explanation}`).join('\n\n')}`;
  const interlude=world.interlude||scope.INTERLUDES[scope.STORIES.indexOf(world)];
  if(Array.isArray(interlude))out+=`\n\n## Retorno al Umbral\n\n${interlude.map(e=>`${e[0]}\n\n${text(e[1])}`).join('\n\n')}`;
  fs.writeFileSync(`${folder}/${world.id}-ruta-${route}.md`,out);
 }
}
fs.writeFileSync(folder+'/inventario.json',JSON.stringify(inventory,null,2));
console.log(`Exportadas ${scope.STORIES.length*3} lecturas y el prólogo para revisión editorial.`);
