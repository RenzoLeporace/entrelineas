import fs from 'node:fs';
import vm from 'node:vm';
const scope={console};scope.window=scope;vm.createContext(scope);
for(const [,src] of fs.readFileSync('dist/index.html','utf8').matchAll(/<script[^>]+src="([^"]+)"/g))if(src!=='app.js')vm.runInContext(fs.readFileSync('dist/'+src,'utf8'),scope,{filename:src});
const segmenter=new Intl.Segmenter('es',{granularity:'word'});
const words=value=>[...segmenter.segment(String(value??''))].filter(part=>part.isWordLike).length;
const sum=values=>values.reduce((a,b)=>a+b,0);
const total=values=>sum(values.flat(Infinity).map(words));
function sectionWords(world,index,choices){
 const chapter=world.chapters[index],state={chapter:index,choices,repairs:[true,true,true,true],diagnosis:{correct:true}},route=chapter.routeScenes?.(state)||[];
 const narrative=total([...chapter.narrative,...route].map(node=>node.text));
 const documents=total(chapter.docs.flatMap(doc=>[doc.title,doc.text,doc.clue]));
 const annotation=total(chapter.repair||world.repair||[]),choice=choices[index];
 const decision=total([chapter.decision.question,...chapter.decision.options,chapter.decision.results[choice]]);
 const combat=total([chapter.debate?.reason,chapter.debate?.opening,...chapter.rounds.flatMap(round=>[round.status,round.challengePrompt,round.kind==='evidence'?chapter.docs.flatMap(doc=>[doc.title,doc.clue]):round.kind==='sequence'?round.sequence||chapter.timeline:round.options,round.why])]);
 const after=chapter.debateAfterByChoice?.[choice];
 const conclusion=total([chapter.closing,chapter.debate?.finding,chapter.debate?.infection,typeof after==='function'?after(state):after]);
 const hypothesis=index===world.chapters.length-1?total([world.mystery.question,world.mystery.suspects,world.mystery.why]):0;
 return {id:index+1,title:chapter.title,narrative,documents,annotation,decision,combat,conclusion,hypothesis,baseRouteWords:narrative+documents+annotation+decision+combat+conclusion+hypothesis};
}
const worlds=scope.STORIES.map(world=>{
 const choices=[0,0,0,0],sections=world.chapters.map((_,index)=>sectionWords(world,index,choices));
 const synthesis=total(world.synthesis.flatMap(question=>[question.question,question.options,question.explanation]));
 const epilogue=total(world.resolveEnding({choices,repairs:[true,true,true,true],diagnosis:{correct:true}},'true'))+words(world.mystery.resolution);
 const baseFavorableRouteWords=sum(sections.map(section=>section.baseRouteWords))+synthesis+epilogue,routeTotals=[];
 for(let code=0;code<81;code++){let n=code;const variant=Array.from({length:4},()=>{const choice=n%3;n=Math.floor(n/3);return choice;});routeTotals.push(sum(world.chapters.map((_,index)=>sectionWords(world,index,variant).baseRouteWords))+synthesis);}
 const endings=Object.entries(world.endings).map(([id,entry])=>({id,title:entry[0]}));
 return {id:world.id,title:world.title,sections,sustainedTrajectories:3,endingCount:endings.length,endings,localDecisionBranches:sum(world.chapters.map(chapter=>chapter.decision.options.length)),decisionSequences:81,decisionSequencesNote:'Combinaciones que comparten escenas y consecuencias; no son81novelas independientes.',baseFavorableRouteWords,routeWordRangeBeforeEpilogue:{minimum:Math.min(...routeTotals),maximum:Math.max(...routeTotals)},readingMinutes:{at220ppm:Math.ceil(baseFavorableRouteWords/220),at180ppm:Math.ceil(baseFavorableRouteWords/180)},estimatedMinutes:{minimum:Math.ceil(baseFavorableRouteWords/220+6),maximum:Math.ceil(baseFavorableRouteWords/180+12)}};
});
const metaStoryWords=total(scope.PROLOGUE.map(entry=>entry[1]))+total(scope.INTERLUDES.flat().map(entry=>entry[1]));
const baseFavorableRouteWords=sum(worlds.map(world=>world.baseFavorableRouteWords))+metaStoryWords,codex=scope.CODEX;
const report={generatedAt:new Date().toISOString(),title:'EntreLíneas: El Archivo de lo Imposible',copyright:'©2026 Leporace Renzo',contentVersion:scope.CONTENT_VERSION,worldCount:worlds.length,sections:sum(worlds.map(world=>world.sections.length)),endings:sum(worlds.map(world=>world.endingCount)),sustainedTrajectories:18,authoredLocalDecisionBranches:72,codex:{characters:codex.characters.length,objects:codex.objects.length,concepts:codex.concepts.length,milestones:sum(codex.characters.map(entry=>entry.milestones?.length||0)),relationshipRecords:sum(codex.characters.map(entry=>entry.relationships?.length||0)),optionalReadingNotIncluded:true},baseFavorableRouteWords,metaStoryWords,estimatedTotalMinutes:{minimum:Math.ceil(baseFavorableRouteWords/220+6*worlds.length),maximum:Math.ceil(baseFavorableRouteWords/180+12*worlds.length)},method:'Modelo de primera ruta favorable:180–220palabras/minuto y6–12minutos adicionales por mapa para examinar, elegir y ordenar. Cuenta la prosa reescrita utilizada, fuentes, anotaciones, opciones visibles del tipo de ronda, réplicas, consecuencias, síntesis, epílogos y arco superior. Omite ecos heredados y cuestionarios que ya no se muestran. No incluye códice, errores, reintentos ni relecturas. Es estimación de contenido, no prueba cronometrada ni duración mínima impuesta.',worlds};
fs.writeFileSync('docs/contenido-estadisticas.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({words:baseFavorableRouteWords,estimatedMinutes:report.estimatedTotalMinutes,codex:report.codex,perWorld:worlds.map(world=>({id:world.id,words:world.baseFavorableRouteWords,minutes:world.estimatedMinutes,sections:world.sections.map(section=>section.baseRouteWords)}))},null,2));
