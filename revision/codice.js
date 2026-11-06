'use strict';
// Las fichas amplían lo encontrado. Sus umbrales corresponden a escenas
// completadas, y los datos de los interludios esperan la lectura del regreso.
(() => {
 const byId=id=>CODEX.characters.find(entry=>entry.id===id);
 const obj=id=>CODEX.objects.find(entry=>entry.id===id);
 const amend=(id,patch)=>Object.assign(byId(id),patch);
 const milestone=(id,chapter,text)=>{
  const m=byId(id).milestones.find(item=>item.chapter===chapter&&!item.world);
  if(m)m.text=text;
 };
 const relations=(id,chapter,texts)=>{
  for(let choice=0;choice<texts.length;choice++){
   const r=byId(id).relationships?.find(item=>item.chapter===chapter&&item.choice===choice);
   if(r)r.text=texts[choice];
  }
 };
 // Campos numéricos: cero permite la información ya presentada al conocer la
 // ficha; 1..4 exige haber concluido esa sección de su propio mundo.
 const thresholds={
  visitante:[0,0],belen:[0,0],aster:[0,0],marea:[0,2],
  lia:[1,2],pipo:[2,2],teo:[3,4],nilo:[2,2],
  alma:[2,2],bruno:[1,3],melaza:[4,2],rosa:[1,3],
  vera:[1,2],tilo:[1,2],maestro:[1,2],leon:[4,3],bruna:[1,2],
  ada:[1,2],eco:[1,2],protocolo:[1,4],nora:[3,3],
  jhenn:[1,3],daro:[3,3],elvira:[2,4],olna:[1,4],
  sila:[2,2],horacio:[3,3],damian:[3,3],mara:[1,1],
  nico:[3,3],julian:[1,2],sael:[2,3],soren:[2,3]
 };
 for(const [id,[backgroundChapter,detailChapter]] of Object.entries(thresholds))amend(id,{backgroundChapter,detailChapter});
 // Umbral se acumula al acabar mundos; eso no significa que ya se hayan leído
 // las dos páginas del interludio. minInterlude es 1..5 y exige metaDone.
 for(const id of ['belen','aster','marea'])for(const m of byId(id).milestones||[]){
  if(!m.world)m.minInterlude=m.chapter;
 }
 byId('marea').detailMinInterlude=2;
 amend('marea',{bio:'Marea fue la maestra de encuadernación de Belén. Hace tres años dejó de aparecer en los registros que su alumna puede consultar; Belén sigue buscándola.'});
 amend('lia',{
  bio:'Acaba de mudarse y dejó una piedra junto a la ventana, fuera de las cajas. Le preocupa que Julia, su amiga de la escuela anterior, se acostumbre a no verla.',
  detail:'Lía puede acompañarte, hacer preguntas y objetar tus propuestas. No lleva tus debates ni decide a través de vos. Reconoce a Nilo como alguien capaz de responder por su propia ayuda y te recuerda los límites de lo que prometiste.',
  after:'Lía vuelve con su madre después del caso del reloj. Compartió la investigación y conservó su voz, incluso para oponerse a vos. El recorrido registra tus decisiones sobre el crédito de Nilo y su libertad: regresar a casa no convierte un daño en una aventura que todos deban celebrar.'
 });
 amend('pipo',{after:'La guía sellada guardada en su bufanda conecta a Pipo con un permiso de reescritura. Los contrastes sitúan el cambio junto a sus órdenes de impedir partidas; reconocer miedo no produce el mismo efecto. El expediente distingue la contención de ese permiso de las tareas que siguen siendo suyas: devolver dibujos, preguntar y aceptar que alguien quiera distancia.'});
 amend('teo',{after:'Teo encerró en el frasco azul la voz de la campana pequeña. El bronce permaneció colgado en la torre. La etiqueta y las visitas prueban ese robo y la mentira preparada contra Nilo; no identifican a Teo como portador del foco. Su hermano volvió de visita y él evitó el muelle: guardar una voz no reemplaza la conversación que no quiso tener.'});
 amend('nilo',{after:'La marca viajó con un papel prestado y no identifica a Nilo como portador. Se expresa mediante letras y dibujos, sin boca. Ayudar a abrir el pestillo no le quita el derecho a salir. Su relación con el grupo conserva el trato que recibió, el crédito por su mapa y cualquier intento de atarlo.'});
 amend('alma',{after:'Las propuestas que respaldaste afectaron lo que Alma pudo compartir, ocultar o entregar. Ella aceptó o rechazó sus propios intercambios y Bruno conservó su negativa. Abrir habitaciones, retirar contratos y devolver recuerdos son tareas distintas; las buenas intenciones de una hermana o de quien investiga no completan ninguna por sí solas.'});
 amend('bruno',{background:'Su dibujo tiene ocho apoyos y un banco para descansar a mitad de camino. No intenta arreglar él solo la crecida: busca compartir con Alma una preocupación. Su madre dejó escrito que ambos podían pedir ayuda y que no necesitaban resolverlo todo por su cuenta.'});
 amend('rosa',{
  detail:'Guarda la llave porque la casa le hizo creer que marcharse puede derrumbarla. Las cartas y el plano permiten discutir esa amenaza. Su necesidad de compañía merece escucha, pero no permite convertir a otros huéspedes en la condición para que se sienta segura.',
  after:'Las cartas prueban que su hermana la buscó entonces; la dirección necesita investigarse ahora. Las comparaciones vinculan el foco con órdenes de Rosa que impiden salidas, no con su tristeza. Contener ese permiso no devuelve cartas, recuerdos o confianza que el recorrido dejó pendientes.'
 });
 amend('vera',{after:'Vera sostiene su denuncia mientras vos defendés una reparación común, una excepción o el relato oficial. Puede explicar qué necesita sin consentir cada medio usado para obtenerlo. La licencia del taller y la relación con Tilo conservan lo que realmente ocurrió; una prueba verdadera no justifica publicar su intimidad sin permiso.'});
 amend('leon',{
  background:'Su hermana dejó el consejo porque las objeciones no quedaban registradas. León leyó aquella separación como falta de afecto, aunque la carta decía que lo quería. Después empezó a exigir silencio para gobernar sin esa incomodidad. El vínculo explica lo que temía; no autoriza las represalias.',
  after:'Los ensayos sitúan la alteración junto a órdenes de León que exigen obediencia, mientras el Maestro responde por una falsificación ordinaria. Limitar el permiso de reescritura no resuelve licencias, dinero ni represalias. El acuerdo final conserva si hubo revisión apelable, excepción revocable o control del relato oficial.'
 });
 amend('ada',{after:'La decisión que defendiste pudo sostener el reclamo del barrio o aceptar un alivio privado. Ada conserva su duelo y responde también por lo que hace con esa propuesta. El parche de Julián y sus límites siguen en el expediente; las grabaciones no le dan derecho a reclamar la memoria entera de Eco.'});
 amend('eco',{after:'La conexión de Eco es posterior a la transferencia y al permiso corregido. Puede conservar su memoria, autorizar una grabación concreta o retirar accesos después de una copia no consentida. El costo de la transmisión depende del plan respaldado. Ninguna restitución posterior obliga a recuperar el vínculo anterior.'});
 amend('nora',{
  bio:'Encargada del refugio del barrio. Llega al taller de Ada con comida y pide que revisar los registros no exponga las direcciones de quienes buscaron protección.',
  background:'Nora cosía nombres en los abrigos desde antes del apagón: Ada conserva el suyo desde niña. Durante el apagón organizó ayuda y ocultó nombres de personas perseguidas por deudas. Esos cuidados pertenecen a momentos distintos de una relación larga; las solicitudes que retuvo después también necesitan una respuesta propia.',
  after:'El contraste desconectado sitúa la alteración junto a su orden de impedir salidas; la guía aporta una conexión material. Nora no conocía todo el alcance del sello, pero sí retuvo solicitudes. Contener una reescritura no borra exclusiones ordinarias, facultades administrativas ni la responsabilidad de la empresa que aceptó sus listas.'
 });
 amend('jhenn',{after:'El ensayo de plumas vincula la alteración con Jhenn y separa persona e instrumento. La guía sellada aporta una vía de recepción. Ella conserva voz y responsabilidades, aunque se limite el permiso del foco. Tus recomendaciones sobre el paso y el tratado se registran junto a las decisiones que las autoridades realmente ejecutaron.'});
 amend('sael',{after:'Sael contrasta el desfase y documenta un plan distribuido. Su análisis permite separar ayuda y exclusión y restituir registros sin tomar toda la memoria de Eco. Vos elegís qué procedimiento respaldar; la competencia del técnico no convierte una intervención no autorizada en un permiso.'});

 milestone('pipo',1,'Acusa a Nilo sin haber visto el robo. El registro conserva una campanada posterior a la salida de la sombra. Pipo acepta leer las fuentes antes de pedir que se abra el camino al jardín.');
 milestone('pipo',3,'La copia de la nota del hermano de Teo cambia junto a Pipo cuando exige que alguien vuelva para quedarse. El original cercano a Teo conserva su texto. Es un contraste que necesita repetirse, no una prueba de que ambos hayan cometido el mismo acto.');
 milestone('nilo',1,'Su nota conserva un destino y una decisión. Todavía no hablaste con él cara a cara: el registro permite descartar una acusación limitada antes de ir a escucharlo.');
 milestone('rosa',1,'Se presenta como encargada de la mesa y de las llaves. Rompe una taza al oír hablar de una salida. Ese gesto no demuestra por sí solo infección ni autoriza decidir por ella.');
 milestone('leon',1,'El anuncio del palacio convierte tanto ver como no ver la tela en elogio. Eso impide contrastar la afirmación y no identifica todavía a quien altera textos.');
 milestone('nora',1,'Proteger una identidad y negar que esa persona exista son afirmaciones distintas. Su refugio está relacionado con las listas que necesitás investigar, pero eso aún no demuestra dónde empezó una alteración.');
 // La recepción de las tres primeras guías se presenta antes del cierre local.
 // La función común de sus sellos solo se explica al investigar el telar.
 for(const [id,text] of [
  ['pipo','El expediente conserva la guía que Pipo recibió y guardó en la bufanda, con su sello y su marca de recepción. La conexión material debe leerse junto a los contrastes de tinta, sin tratar como portador a cualquiera que toque su papel.'],
  ['rosa','La guía recibida por Rosa conserva una promesa de mesa siempre llena y una marca de recepción. Su relación con el foco se contrasta con las órdenes y el horno apagado; el deseo de compañía no basta por sí solo.'],
  ['leon','El libro recibido por León lleva el sello y la marca de aceptación de una corte sin objeciones. Las dos pruebas de tinta aportan el contraste del caso; un anillo o un regalo aislados no habrían bastado.']
 ])byId(id).milestones.push({chapter:4,text});

 // Los vínculos describen lo ocurrido en esta versión; no atribuyen a un aliado
 // una elección tomada por quien lleva el cuaderno ni adelantan la sección 2.
 relations('lia',1,[
  'Decidiste buscar una conversación y separar la pista del frasco. Lía acompaña ese límite sin prometer que Nilo quiera reconciliarse.',
  'Prometiste a Pipo recuperar la amistad de antes. Lía te recuerda que Nilo no participó de esa promesa; ella no la hizo por él.',
  'Apoyaste llevar un cordel para capturar a Nilo. Lía cuestiona la propuesta y acompaña la conversación para que la sombra tenga otra persona a quien acudir.'
 ]);
 relations('lia',2,[
  'Diste espacio para que Nilo explicara por escrito. Lía presencia un cruce seguro que conserva también el nombre de quien pensó el camino.',
  'Presentaste vos el mapa de Nilo. Lía ayuda en el cruce, pero ese resultado no reemplaza la explicación que no dejaron dar a su autor.',
  'Atribuiste el mapa a Pipo. Lía acompaña la ayuda a Sila sin que la seguridad conseguida vuelva correcta esa firma cambiada.'
 ]);
 relations('pipo',1,[
  'Guarda el cordel y lleva el lápiz que Nilo pidió. Todavía van hacia el jardín: preparar una conversación no significa haber recuperado ya la confianza.',
  'Se aferra a tu promesa de recuperar el pasado. El camino se abre para hablar; Nilo todavía tendrá que decir qué quiere ahora.',
  'Tu apoyo a la captura queda registrado. El portero autoriza una conversación acompañada, sin convertir aquella intención en una orden legítima.'
 ]);
 relations('pipo',2,[
  'Comprueba las marcas con vos mientras Nilo explica su plano. Ayuda sin recibir el crédito por inventar el camino.',
  'La explicación pasa por vos y Nilo guarda el lápiz. Evitar discutir la autoría no dejó intacta la confianza.',
  'Recibe las gracias que Sila dirige al supuesto autor. Nilo cubre su propia firma con carbón y camina apartado después del cruce.'
 ]);
 relations('pipo',4,[
  'Sostiene el apoyo que le corresponde y espera a que Nilo salga. Compartir una tarea no exige compartir para siempre todos los caminos.',
  'La promesa de no separarse vuelve a presionar a Nilo. La sombra ayuda sin aceptarla; el reloj no puede resolver por ellos ese compromiso.',
  'El intento de atadura que respaldaste falla. Nilo ayuda a abrir el pestillo y se marcha sin celebrar. Pipo no recibe una amistad como premio por reparar el reloj.'
 ]);
 relations('nilo',1,[
  'Elegiste ir a escucharlo y Pipo guardó el cordel. La nota de Nilo conserva su valor antes del encuentro: todavía no sabés qué respuesta dará.',
  'Prometiste a Pipo una amistad que Nilo no autorizó. Su nota permite encontrarlo, pero no equivale a consentir ese resultado.',
  'El portero advierte a Nilo de la intención de captura. La visita debe ser una conversación; la confianza ya tiene que responder a lo que propusiste.'
 ]);
 relations('teo',3,[
  'La tripulación conoce el riesgo y cambia el propósito del viaje para ayudar con el reloj. Teo viaja observado; eso no lo obliga aún a admitir qué tomó.',
  'Pospusiste la explicación al resto de la tripulación. Teo conserva tiempo y Horacio guarda la cuerda sin haber aceptado un uso que no le explicaron.',
  'Prometiste silencio. Damián deja su objeción por escrito y el barco parte; Teo dispone de ese tiempo para adelantar el cierre.'
 ]);
 relations('alma',1,[
  'Le explicaste las condiciones junto a Bruno y cada hermano conserva una copia. Eso facilita reclamar por el cobro que ninguno aceptó.',
  'Le pediste que firmara por los dos. La copia queda con ella y Bruno protesta: resolver la prisa no lo convierte en parte de un permiso que no dio.',
  'Ofreciste aceptar condiciones posteriores para evitar otro refugio. Alma queda ante esa propuesta y Bruno mantiene que no autorizó entregar recuerdos.'
 ]);
 relations('bruno',1,[
  'Conserva su copia y puede señalar lo que rechazó. Cuando le falta una palabra, el texto permite investigar un cobro que no aceptaron.',
  'No participó del acuerdo que pediste resolver a Alma. La palabra que le falta no se recupera dejando que ella termine otra frase por él.',
  'Repite que no autorizó entregar recuerdos. Tu ofrecimiento de aceptar más condiciones no sustituye esa negativa.'
 ]);
 relations('melaza',1,[
  'Quedan copias de una bienvenida sin deuda. La dueña no puede convertir esa comida en aceptación de una permanencia o un recuerdo.',
  'La copia queda en manos de Alma porque le pediste resolver por ambos. Melaza todavía debe responder al límite que Bruno no autorizó cruzar.',
  'Conserva tu ofrecimiento de aceptar condiciones nuevas. Eso no legitima el cobro anterior ni permite inventar la aceptación de Bruno.'
 ]);
 relations('melaza',4,[
  'Se retiran los contratos para restituir recuerdos con sus nombres. El registro permite continuar la devolución sin confundirla con un perdón debido a la dueña.',
  'Conservaste contratos para exigir cooperación. Cambiar de custodio no vuelve legítima esa deuda ni permite encerrar de nuevo a quien ya salió.',
  'El trato rápido deja restituciones pendientes. Las habitaciones que ya abriste no vuelven a cerrarse para hacer parecer más simple el final.'
 ]);
 relations('rosa',1,[
  'Presencia un acuerdo que conserva el derecho a irse. La posibilidad de una salida no elimina su necesidad de hablar sobre lo que teme.',
  'Ve que Alma conserva la copia y Bruno no participó. Que alguien permanezca junto a ella no prueba que todos hayan aceptado las mismas condiciones.',
  'Escucha la propuesta de aceptar condiciones futuras y la negativa de Bruno. La voz de un niño no se vuelve innecesaria por una firma ajena.'
 ]);
 relations('rosa',3,[
  'Recibe las tres cartas y entrega la llave. Abrís las habitaciones sin prometerle un reencuentro que las fechas no demuestran.',
  'Abrís las habitaciones, pero retenés el original de la última carta y condicionás su consulta. Rosa ya leyó el contenido: lo que le quitaste fue la posibilidad de comprobar por sí misma la fecha, el remitente y la dirección en ese papel.',
  'Entregó la llave, pero elegiste llevar primero a los hermanos y dejar otros cuartos pendientes. La salida incompleta es una decisión del recorrido, no una negativa nueva de Rosa.'
 ]);
 relations('rosa',4,[
  'La restitución permite elegir a dónde ir sin pagar con permanencia. Los nombres conservados sirven para continuar devolviendo lo que falta.',
  'Reconoce en los contratos que conservaste una condición de control que ya conocía. La nueva mano no la vuelve una ayuda libre.',
  'El trato rápido no devuelve todo lo que la casa conserva. La lista pendiente sigue existiendo aunque se cobre el olvido de los hermanos.'
 ]);
 relations('vera',1,[
  'Tu petición queda registrada con copias para Vera y Tilo. El taller aún no reabre; la investigación gana acceso sin un elogio obligatorio.',
  'El Maestro imprime tu elogio junto al anuncio y entrega a Vera una autorización temporal. Ella obtiene alivio, pero la frase recortada no fue su declaración.',
  'Declaraste perfecto lo no observado y presionaste a Tilo. Vera recibe una promesa de licencia junto a un medio que compromete al expediente.'
 ]);
 relations('vera',3,[
  'Puede presentar su denuncia mientras vos contrastás las fuentes. La solicitud al consejo conserva cuentas, ensayos y represalias como asuntos diferentes.',
  'El reclamo público se limita al traje porque así lo defendiste. Vera te pide no llamar reparación completa a la suspensión del desfile.',
  'La burla que promoviste interrumpe la ceremonia. Vera conserva su denuncia entre documentos que todavía necesitan lectura, no repetición por miedo.'
 ]);
 relations('maestro',1,[
  'Tu petición pública le impide afirmar que nadie solicitó una comparación. Autoriza el telar sin que esa concesión responda aún a la denuncia.',
  'Usa tu elogio ambiguo como respaldo de la presentación. El permiso temporal para Vera no corrige el uso que hizo de tus palabras.',
  'Recibe tu declaración y un dibujo encargado antes de observar. Su presentación gana un respaldo que el recorrido tendrá que conservar como propio.'
 ]);
 relations('tilo',2,[
  'Firma una copia con condiciones y otras custodias registran la amenaza. Puede aportar su prueba sin sostener solo todo el riesgo.',
  'Conserva la hoja guardada. La medición permite cuestionar el tejido, pero el público no tendrá todavía su testimonio personal.',
  'La hoja circula sin el límite que pidió. Su contenido mantiene valor y Tilo camina separado: una prueba verdadera no devuelve automáticamente la confianza.'
 ]);
 relations('bruna',2,[
  'Conserva junto a la guardia las hojas y la amenaza sobre la beca. Esa tarea no borra su omisión ante la denuncia anterior.',
  'La hoja personal queda guardada. Bruna conserva otros documentos, sin poder presentarlos como si también hubieras autorizado ese testimonio.',
  'La publicación sobrepasa el límite de Tilo. Bruna puede conservar la prueba sin exigirle que vuelva a confiar en quienes la usaron de ese modo.'
 ]);
 relations('ada',1,[
  'Respaldaste un reclamo con copias independientes y procedimiento compartido. Ada no queda obligada a resolver su duelo antes de ayudar al barrio.',
  'Elegiste el acceso privado al registro de Julián y pospusiste el reclamo común. Ada obtiene una ventaja mientras otras familias siguen esperando.',
  'Respaldaste negar registros ajenos a cambio de un nombre. La restitución privada no representa a quienes retiraron sus permisos después.'
 ]);
 relations('ada',4,[
  'Defendiste un plan distribuido. Ada solicita recursos y acepta negativas; Eco no paga la restitución común con su memoria.',
  'Aceptaste la transmisión inmediata con dispersión de memoria. El barrio recupera accesos y Ada debe reconocer que existía un plan más lento.',
  'Aceptaste la simulación con cierre de reclamaciones. Ada puede oír una voz familiar sin que Julián vuelva ni quede representado todo el distrito.'
 ]);
 relations('eco',2,[
  'Comparte los registros de conexión para el análisis. Vos respetás que sus canciones y el resto de su memoria no sean un requisito técnico.',
  'Autoriza una grabación concreta. Esa generosidad conserva su alcance y no contradice las negativas que pueda dar después.',
  'Se realizó una copia sin su permiso. Retira accesos y deja de compartir canciones; la utilidad de un dato no repara esa invasión.'
 ]);
 relations('nora',3,[
  'Defendiste detener el canal de exclusión conservando ayuda y privacidad. Nora debe responder por sus listas bajo límites verificables.',
  'Respaldaste apagar toda la antena. La exclusión se interrumpe junto con los avisos de comida y algunas familias quedan sin información.',
  'Ocultaste la fuente local para proteger su reputación. La acusación contra la interfaz no detiene el canal que quedó fuera del expediente.'
 ]);
 relations('jhenn',1,[
  'Recomendaste mantener el paso y verificar con las postas. Jhenn acepta que la comprobación no exija inmovilizar a todas las familias.',
  'Respaldaste una hora de cierre. Jhenn conserva la comprobación y una deuda concreta con quienes pagan la demora.',
  'Defendiste cerrar sin plazo y anunciar una invasión no demostrada. Jhenn emite la orden y Daro deja por escrito quién la dio y qué recomendación la sostuvo.'
 ]);
 relations('jhenn',2,[
  'Abriste la mesa a representantes y revisión. Jhenn cede el centro sin perder su tarea de redactar con precisión lo que se acuerde.',
  'Respaldaste una tregua previa a la consulta. Jhenn debe pedir la ratificación que quedó pendiente y aceptar cambios sin llamarlos traición.',
  'Avalaste un acuerdo definitivo por voces ausentes. La precisión de una cláusula no completa las firmas que Jhenn no recibió.'
 ]);
 relations('jhenn',3,[
  'Defendiste un expediente abierto y límites de representación. Jhenn continúa trabajando bajo revisión; su utilidad no borra el daño.',
  'Respaldaste una admisión privada. Daro ayuda a contener el foco y se niega a certificar que el expediente del consejo esté completo.',
  'Intentaste destruir tu copia y presentar a Elvira como portadora. Jhenn pide conservar los ensayos y rechaza que la defiendas fabricando otra culpable. Olna mantiene una copia independiente.'
 ]);
 relations('belen',2,[
  'Registraste su omisión y el alcance limitado del permiso. Belén responde con el borrador abierto; la alianza puede conservar preguntas y límites sin prometer que nunca volverá a tener miedo.',
  'Ofreciste consuelo y pediste aplazar la explicación de su omisión. El borrador ya se había comparado y sigue abierto. Belén pregunta cuándo retomarán esa responsabilidad; todavía no le das una fecha.',
  'La acusaste de toda la infección contra lo que permite el documento. Sigue entregando la copia y toma distancia; su testimonio no la obliga a recuperar la cercanía anterior.'
 ]);
 relations('marea',2,[
  'Conserva el borrador comparado y permite que Belén responda sin exigirle elegir entre vínculos. Su reencuentro no decide por el expediente.',
  'Anota la reserva que pediste sobre la omisión de Belén. El texto ya se contrastó; el consuelo no responde todavía por qué se ocultó ni fija cuándo retomarán esa explicación.',
  'Pide distinguir la omisión de Belén de la orden ejecutada. Tu acusación total no puede convertir el vínculo entre ambas en una prueba contra el documento.'
 ]);
 relations('olna',3,[
  'Conserva su copia del ensayo y acepta revisar otro texto con Jhenn. Eso no borra los daños de las decisiones anteriores.',
  'Mantiene su copia aunque hayas pedido reservar tu informe ante el consejo. Tu solicitud no convierte en secreto lo que otras personas también observaron.',
  'Protege su copia cuando intentás destruir la tuya. Registra tu acusación contra Elvira y la objeción de Jhenn: defender a una aliada no permite fabricar otra portadora.'
 ]);
 relations('daro',1,[
  'La recomendación que respaldaste mantiene el paso con verificación. Daro trabaja con relevos y no promete vigilancia heroica ilimitada.',
  'Consigue refugio para algunas familias durante el cierre que respaldaste. Su ayuda no elimina la demora ni alcanza a todos.',
  'Declara que la orden fue de Jhenn después de tu recomendación. No deja desaparecer ninguna de las dos intervenciones en una frase impersonal.'
 ]);

 // Notas materiales: el soporte de bronce nunca fue retirado de la torre.
 Object.assign(obj('campana'),{
  bio:'Pipo cuenta que la campana pequeña dejó de sonar y el Gran Reloj se desacelera. Su versión señala un problema que urge investigar; no demuestra todavía qué lo causó.',
  after:'Teo encerró la voz de la campana en el frasco azul y dejó el bronce en la torre. La etiqueta y las visitas permiten reconstruir ese acto, distinto del foco de Pipo. Devolver el sonido no obliga a Nilo a quedarse como una parte más del mecanismo.'
 });
 Object.assign(obj('gran-reloj'),{after:'La voz regresa al bronce mediante la tarea escogida. Incluso tras el intento de atadura, Nilo escapa, abre el pestillo y el reloj vuelve a sonar. Lo que el recorrido puede dañar es la confianza, sin inventar una isla sin mañanas para simplificar ese costo.'});
 Object.assign(obj('lapiz-verde'),{bio:'El lápiz verde que Nilo pidió en su nota. Pipo lo lleva hacia el jardín, donde su dueño tendrá que poder decidir qué quiere dibujar y explicar.',after:'El recorrido conserva si Nilo pudo explicar el mapa y a quién atribuiste el dibujo. La firma no se recupera simplemente porque el reloj funcione: reconocer la autoría y respetar su respuesta siguen siendo actos distintos.'});
 obj('saco-cartas').after='Las tres cartas prueban que la hermana de Rosa intentó buscarla. La orden de Melaza demuestra su retención anterior; la situación actual de la hermana sigue abierta. Rosa leyó los textos durante la investigación. El recorrido conserva si después respetaste su custodia de los originales o retuviste una carta y condicionaste su consulta, y si más adelante devolviste ese papel.';
 obj('credencial-refugio').aliases=['credencial del refugio','credenciales comunitarias','identificador comunitario'];
 byId('leon').aliases=['León','Leon'];
 relations('nico',3,[
  'Las habitaciones se abren con la información completa. Nico llega al vestíbulo; la compañía ofrecida a Rosa no depende de inventar un reencuentro.',
  'Los niños salen de las habitaciones al vestíbulo. Retuviste una carta que Rosa ya leyó y condicionaste el acceso al original. Abrir las puertas no te concede decidir por ella cómo continuará esa búsqueda.',
  'Permanece esperando con otros niños. La lista que pueda salir es una vía para pedir rescate, no una declaración de que ya ocurrió.'
 ]);
 relations('horacio',3,[
  'Explica el riesgo a la tripulación, pide disculpas a Damián y cambia el propósito del viaje. La cuerda queda disponible para ayudar en el faro.',
  'Lleva al grupo, pero la explicación a la tripulación quedó pospuesta por tu decisión. Guarda la cuerda y pide hablar al llegar.',
  'Acepta la promesa de silencio y prepara la salida. Damián deja una objeción; el viaje no se presenta como una ayuda informada que nunca se pidió.'
 ]);
 amend('damian',{after:'Damián lleva su registro hasta el faro por decisión propia, incluso si respaldaste el pacto de silencio. Aporta copias y pide que se lea lo ocurrido antes de acusar. Su colaboración permite continuar la investigación sin declarar recuperada una confianza que el grupo todavía deba trabajar.'});
 // Testigos con presencia y voz propia. Su ilustración corresponde a esta
 // identidad; no se reutiliza el retrato de un aliado para llenar una ficha.
 const witness=(id,name,world,aliases,row,chapter,bio,background,detail,after)=>({
  id,name,world,aliases,portrait:{src:'assets/expressions-witnesses.png',row,rows:4},
  bio,background,detail,after,backgroundChapter:chapter,detailChapter:chapter,
  milestones:[{chapter,text:detail}]
 });
 CODEX.characters.push(
  witness('portero','El Portero de las Hojas','sombra',['Portero','portero','Portero de las Hojas'],0,1,
   'Vigila el acceso de Nunca Siempre y registra a quienes cruzan. Antes de abrir la barrera pide que la búsqueda de Nilo no se convierta en una captura sin pruebas.',
   'Su registro distingue lo que vio de lo que deduce Pipo. Puede informar de una salida y una campanada posterior sin conocer todavía todo lo ocurrido en el faro.',
   'Autoriza una conversación acompañada y conserva el orden del registro. Que el camino se abra no convierte tu intención de usar un cordel en una orden legítima.',
   'Su testimonio ayudó a separar la partida de Nilo del robo de la voz. No afirmó haber visto a la sombra tomarla. Pipo debió responder a esa diferencia; el portero no cambió su versión para iniciar el debate.'),
  witness('espejo','Espejo','casa',['Espejo','Espejo, el Cocinero de las Palabras Dulces'],1,2,
   'El cocinero formado por reflejos lleva el libro de intercambios de la casa. Puede mostrar qué cobró el horno y qué aceptación quedó registrada.',
   'Presenta el asiento de la sopa de bienvenida y utiliza un sello que llama «felicidad» a los recuerdos retirados. El nombre agradable y el contenido de la columna no son la misma información.',
   'Su libro registra una palabra tomada de Bruno y no registra su aceptación. Melaza responde por la oferta de la casa; Espejo explica lo que dejó asentado en la cocina.',
   'El expediente conserva su registro sin tratarlo como una prueba de que todo cobro fue consentido. La devolución necesita los nombres de los frascos y los contratos; quemar etiquetas no habría completado esa tarea.'),
  witness('archivero','El Archivero de Harina','casa',['Archivero de Harina','El Archivero de Harina','Archivero'],2,3,
   'Trabaja en el archivo bajo la escalera. Sus manos cubiertas de harina ordenan etiquetas y buscan los frascos por el nombre de cada huésped.',
   'Recibe el pedido de buscar la palabra de Bruno. El aviso reciente del estante exige autorización de Melaza, por lo que necesitás comparar esa restricción con las instrucciones originales.',
   'Puede localizar fuentes y ofrecer una apertura parcial; no tiene autoridad para decidir el futuro de los huéspedes. El plano y las cartas deben poder discutirse ante Rosa, que conserva la llave.',
   'Conserva la comparación del horno junto a los hermanos y al investigador. Ese registro distingue una alteración de los contratos ordinarios; no declara devuelto un recuerdo solo porque alguien haya encontrado su etiqueta.'),
  witness('luz','Luz','neon',['Luz'],3,3,
   'Una niña del refugio muestra una solicitud para volver a la escuela del puente. Quiere recuperar su apellido en el registro sin publicar dónde vive.',
   'En la escuela están su amiga y el club de música. Estudiar dentro del refugio no reemplaza por sí solo los vínculos que ella pide conservar fuera.',
   'Puede guardar una copia de la solicitud y del cartel anterior. No tiene que quedarse a escuchar un debate sobre su futuro para conservar el derecho a rechazar una orden.',
   'Su solicitud permite distinguir privacidad e identidad. Haber necesitado refugio no autoriza a Nora, a la empresa ni a quien investiga a decidir indefinidamente por ella. El estado de los canales y del registro sigue el recorrido elegido.')
 );
 for(const entry of CODEX.objects)entry.detailChapter=1;
 byId('luz').encounterChapter=3;
 byId('espejo').encounterChapter=2;
 byId('archivero').encounterChapter=3;
 obj('saco-cartas').detailChapter=3;
 obj('credencial-refugio').detailChapter=2;
 obj('corazon-belen').detailChapter=0;
 // Normaliza la redacción heredada de resúmenes y anotaciones posteriores sin
 // cambiar documentos del caso ni anticipar información en la narración.
 for(const entry of [...CODEX.worlds,...CODEX.characters])for(const key of ['summary','lore','after'])if(typeof entry[key]==='string'){
  entry[key]=entry[key].replaceAll('robo de la campana','robo de la voz de la campana').replaceAll('recuperar su campana','recuperar la voz de su campana');
 }
 for(const entry of CODEX.characters)for(const m of entry.milestones||[])m.text=m.text.replaceAll('robo de la campana','robo de la voz de la campana');
})();
