# Auditoría del códice frente a la reescritura

29 de octubre de 2026. Pase editorial de las fichas, no certificación de todos los recorridos manuales. Archivo de integración: `dist/revision/codice.js`, después de las reescrituras y antes de `app.js`.

## Qué se contrastó

Se leyeron las 33 fichas previas de personajes y sus 159 registros de relación, los 88 hitos previos, los 12 objetos y los 18 conceptos. Se compararon con los nodos, documentos, decisiones y acciones posteriores de los seis mundos, el prólogo y los cinco regresos al Umbral. Para las consecuencias se usó el texto que se ejecuta después del debate, no la intención anterior a resolverlo.

El primer pase cambió 86 textos de relación y 21 campos de perfil y corrigió o añadió diez textos de hitos. Después se aclaró la colaboración de Damián y se añadieron las cuatro fichas de testigos que faltaban. El resultado conserva 37 personajes, 95 hitos y 159 relaciones. Las tres ampliaciones de las primeras guías se mantienen. Se preservan IDs anteriores, descubrimientos guardados y opciones de decisión.

## Problemas concretos corregidos

- El códice atribuía a Lía, Vera o Ada elecciones que ahora toma el investigador. Los registros distinguen la propuesta del jugador de la respuesta y la acción de cada habitante. Jhenn emite la orden del puente, pero se conserva la recomendación del investigador que la sostuvo.
- Las relaciones de la primera sección de Sombra afirmaban haber devuelto el lápiz y conversado con Nilo antes de llegar al jardín. Ahora registran la preparación y la advertencia del portero; no inventan la respuesta futura de la sombra.
- La información temprana de Pipo revelaba una guía sellada no presentada todavía. Ese hito describe ahora la acusación y el registro. La recepción de la guía tiene una ampliación al final del mundo, después de su presentación en la tercera sección.
- El primer contraste de Sombra usa una copia de la nota del hermano de Teo, cuyo original permanece cerca de él. La ficha de Pipo no atribuye esa frase a la postal de Mara.
- El bronce de la campana permanece en la torre; Teo captura su voz en un frasco. Las notas finales y los objetos dejan de afirmar el traslado de la pieza. La ficha inicial tampoco da por resuelto ese mecanismo antes de investigarlo.
- Los niños liberados de habitaciones en Casa llegan al vestíbulo; no se los da ya por fuera del edificio. Los registros finales respetan puertas abiertas, contratos todavía retenidos y restituciones pendientes sin volver a encerrar a quienes salieron.
- El Maestro usa el elogio del investigador, no una frase elegida por Vera. Tilo puede guardar su testimonio personal mientras otras pruebas mantienen el expediente abierto; ya no se afirma que esconder esa hoja conserve intacta toda la falsificación.
- La copia de Eco queda atribuida a la intervención respaldada por el jugador. El códice no necesita adjudicar una extracción a Ada para registrar su costo.
- La guía de Nora se presenta en Neón 3, no en Neón 1. Su ficha inicial se limita al refugio y la protección de direcciones; la relación de infancia mediante el abrigo se amplía después de la tercera sección.
- Se quitan alias excesivamente genéricos: «emperador» no desbloquea por sí solo a León y una credencial de investigador no revela el objeto comunitario del refugio.

## Apertura progresiva

La apertura previa de trasfondo y detalle dependía solo de llegar a las secciones 1 y 2 de cualquier personaje del mundo. Eso podía revelar a Nico antes de su encuentro, las cartas de León antes de leerlas o el origen de Melaza antes de que lo explicara.

El parche declara `backgroundChapter` y `detailChapter` para los 37 personajes. Son enteros de cero a cuatro respecto de las secciones completadas de su mundo. Cero habilita un dato ya presentado al conocer la ficha; no crea por sí solo ese encuentro. Los objetos usan `detailChapter` con la misma semántica. Se mantienen los valores predeterminados del motor para entradas sin esa metadata.

Los hitos del Umbral además declaran `minInterlude`, de uno a cinco: la primera cifra corresponde al regreso de Sombra. Exige la lectura completa de ese interludio (`metaDone`), no solo haber acabado el mundo. `detailMinInterlude` cumple el mismo papel para el punto doble de Marea. El motor principal debe respetar estos campos; añadir metadata sola no corrige la interfaz. La integración y su prueba corresponden al agente principal.

La recepción de guías añadida durante el pase cruzado quedó contrastada con el agente de causalidad: Pipo en Sombra 3; Rosa en Casa 2; León en Traje 2. Sus hitos de ficha esperan a concluir la sección 4 para no anticipar la función compartida que después se investiga en Origen.

## Verificación y límites

`node --check` pasa. Una carga en VM comprueba IDs únicos, relaciones referidas a opciones existentes, umbrales enteros y existencia de todos los retratos referenciados. Eso prueba estructura y recursos; no equivale a una lectura natural de cada combinación ni a una prueba en el teléfono.

La revisión conserva la separación entre delito ordinario, alteración observada y foco. Los conceptos de mecanismo completo siguen cerrados hasta terminar Origen. Los perfiles nombrados por carta pueden conocerse sin un encuentro físico: su nota inicial registra esa existencia y sus ampliaciones esperan escenas posteriores.

Durante el pase se detectaron cuatro testigos sin ficha: Portero, Espejo, Archivero de Harina y Luz. El responsable principal añadió su atlas propio de cinco expresiones y cuatro filas (`expressions-witnesses.png`). Las fichas declaran las filas respectivas 0, 1, 2 y 3 y se comprobó que el archivo existe. Los umbrales de encuentro son Sombra 1, Casa 2, Casa 3 y Neón 3; no se usó la cara de Nico ni de otro aliado como sustitución. La inspección visual y el empaquetado final corresponden al responsable principal.

No se añade un pasado familiar que esos testigos nunca contaron ni una ruta que no tuvieron. Sus notas describen función, participación y límites de las fuentes. Julia y Luma, mencionadas de manera secundaria, siguen en las notas del relato: este informe no afirma que cada nombre citado tenga una ficha individual ni que todos los recorridos posibles se hayan jugado manualmente.

## Segundo cruce: argumentos y confesiones

Se hizo otra lectura independiente de las doce secciones de Neón, Tronos y Origen. Para cada una se compararon la conversación anterior al duelo, su apertura, cada afirmación y su réplica, las respuestas disponibles, las fuentes seleccionables y las cronologías. Se detectaron seis problemas y el responsable principal los corrigió en `ultimos-mundos.js`:

1. En Origen 2, Áster ya reconocía quitar la condición y después alegaba un accidente de copia. Ahora reconoce el acto y pide precisar cuándo podía detener la ejecución. La cronología explica responsabilidad sin hacerle negar su confesión.
2. En Origen 3, conocía la distribución y luego repetía que solo podía mandar o ser destruido. Ahora pregunta si distribuir permisos conserva enlaces; el manual responde a esa objeción concreta.
3. En Origen 4, ya se había comprometido a reparar sin exigir reconciliación. La ronda ya no le hace reclamar ese regreso: expresa la duda diferente de si una reparación puede acreditarse aunque nadie lo perdone.
4. En Tronos 3, la apertura todavía proponía romper una pluma cuya insuficiencia Jhenn acababa de reconocer. Ahora pide revisar los ensayos completos y separar la contención de la posibilidad de seguir trabajando.
5. En Tronos 4, el texto presentaba a Daro como pendiente de responder cuando ya había firmado su rechazo. La ronda conserva su respuesta y revisa la presión que justificaba añadir la oferta al expediente.
6. En Tronos 2, un documento atribuía a Jhenn la propuesta de evitar la consulta que había hecho Elvira. La fuente actual atribuye esa propuesta a la regente y conserva por separado el cambio de la copia.

La corrección de estas seis formulaciones se comprobó cargando los scripts actuales y leyendo los textos resultantes. Las horas de Neón conservan transferencia 18:14, permiso corregido 18:17 y conexión de Eco 18:19. Esto no acredita por sí solo todos los recorridos manuales posibles.

Los cambios posteriores de decisiones también exigieron actualizar las relaciones de Belén y Marea: el consuelo aplaza la explicación de una omisión, no la lectura de un borrador que ya se comparó. Jhenn rechaza la acusación fabricada por el investigador; no se le adjudica el intento de destruir la copia del jugador. Olna conserva su copia independiente.

En Casa 3, la alternativa de control retiene el original de una carta que Rosa ya leyó; no puede ocultarle un contenido conocido. Se ajustaron las notas de Rosa, Nico y el saco de cartas para describir custodia, consulta y posterior devolución. El registro histórico de esa elección no niega una restitución posterior si el recorrido la ejecuta.
