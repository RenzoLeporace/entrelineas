# Revisión del motor para continuidad y debates

29 de octubre de 2026. Este pase corrige estructura y funcionamiento de la versión anterior. No certifica por sí solo la calidad de la prosa ni sustituye la revisión editorial de cada escena.

## Problemas reproducidos y correcciones

La versión anterior presentaba primero una fuente o una cronología y después volvía al cuestionario del mismo turno. Las acciones no se distinguían como pasos diferentes: el jugador podía interpretar que su primera respuesta no se había registrado. Ahora cada ronda declara un tipo y tiene una sola intervención decisiva:

- `argument`: elegir una respuesta al argumento del interlocutor.
- `evidence`: presentar un documento. La presentación produce directamente la respuesta del personaje y cierra esa ronda si la fuente la sostiene.
- `sequence`: ordenar tres hechos relevantes para esa afirmación. Comprobar la secuencia produce directamente la respuesta; no abre otro cuestionario con el mismo estado.

Una respuesta resuelta retira las opciones activas. El avance exige una respuesta fundada, y un segundo clic no salta la siguiente ronda ni repite daño. Los errores permiten revisar y volver a intentar; las fuentes, las decisiones y el contexto narrativo se conservan. Las réplicas aparecen en el historial junto a la intervención concreta del investigador. Cuando la explicación contiene narración, su etiqueta es narrativa: no se atribuye a un personaje una descripción en tercera persona de sus propios gestos.

El encuentro ahora muestra el nombre, retrato y ánimo del investigador en los seis mundos, junto al retrato de la persona con la que habla. Los personajes locales ya no sustituyen al jugador en la barra de ánimo. `debate.reason` y `debate.opening` explican por qué se conversa y qué afirmación se intenta sostener. El cierre utiliza `finding`, `infection` y las consecuencias de la decisión: acreditar un hecho no convierte automáticamente a alguien en infectado ni lo absuelve de otras responsabilidades.

Las decisiones de trato y acusación dejaron de recibir títulos morales predeterminados («con fundamento», «arriesgada») o un recuadro rojo por su índice. Se registra lo que elegiste y se muestran sus consecuencias narrativas. Las contradicciones factuales siguen teniendo devolución educativa basada en fuentes.

## Lectura en el orden de la escena

Los hablantes se declaran en los nodos; `player` se resuelve al nombre del perfil. El nombre se interpola como texto y se escapa antes de insertarlo en HTML. Las ramas se insertan después del ID `routeInsertAfter`, elegido por el guion, y no por defecto después del primer párrafo. Las escenas reescritas no reciben los ecos antiguos fuera de contexto.

El lugar y el fondo siguen `location` y `sceneSet` de los nodos que ya se leyeron. No cambian por porcentaje de texto antes de que el personaje llegue. El epílogo se identifica como epílogo y no mantiene una etiqueta que afirme que toda su narración transcurre aún en el lugar del duelo. Los interludios usan su hablante explícito o Narrador, en lugar de atribuir toda prosa a Belén.

La fase antes del debate se convirtió en una anotación contrastada. Elegir una formulación no reescribe mágicamente el espacio ni prueba por anticipado un foco de La Errata. Las acciones materiales que requieren la confrontación se muestran después de ella, mediante `debateAfterByChoice`; se admiten funciones del estado para conservar consecuencias cruzadas.

## Guardados y relectura

El formato de guardado sigue siendo compatible. Un archivo anterior se conserva y, al cargarlo en la aplicación, se guarda además una copia previa a la revisión. El aviso de nueva narración permite conservar el punto de lectura o releer el prólogo. La relectura usa un cursor temporal independiente y no reinicia mundos ni cambia el contador del prólogo ya guardado. El visitante se reconoce en el códice al crear su perfil; su propia ficha ya no espera que otra escena mencione un alias.

Los conocimientos del códice no se reconstruyen de los textos nuevos suponiendo que un contador antiguo significa que esos textos ya se leyeron. Se conservan los descubrimientos previamente guardados y los umbrales completados. Los datos importados no autorizan inyectar HTML ni nombres en un historial para revelar fichas futuras.

## Verificación

La suite carga los mismos scripts declarados en el HTML y falla si falta alguno; no prueba una lista antigua que omita las reescrituras. Ejecuta los seis mundos, sus 24 secciones, fuentes en distintos órdenes, errores, pausas y reintentos, importaciones, 42 familias de cierre alcanzables y los nuevos tipos de ronda.

Se agregaron regresiones dirigidas para respuesta doble, avance prematuro, fuente presentada sin cuestionario posterior, cronología resuelta sin segunda pregunta, fotos e identidad del investigador, ubicación anterior/posterior al cruce, inserción de ramas por ID y relectura sin modificar la partida. El último resultado está en `docs/auditoria-v2/motor-resultados.json`.

`docs/auditoria-v2/finales-rutas.json` conserva un estado alcanzable por cada familia de final con las cuatro decisiones, respuestas de síntesis y epílogo correspondiente, para que los revisores lean ejemplos concretos. Es una ayuda de revisión: la exploración combinatoria detecta estados rotos, pero no demuestra que todas las frases tengan una transición natural. La prueba visual de los ejecutables corresponde al responsable de integración.
