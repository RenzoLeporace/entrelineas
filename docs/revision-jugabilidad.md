# Revisión de jugabilidad y motor

Fecha: 28 de octubre de 2026. Proyecto: **EntreLíneas: El Archivo de lo Imposible**. La revisión incluyó los seis guiones, las fuentes del caso, la historia superior, las consecuencias y los sistemas de juego. Se corrigieron problemas y se incorporaron mejoras aunque la implementación anterior no produjera un error de ejecución.

## Problemas graves corregidos

- **Pruebas que cambiaban de identidad al leerlas en otro orden.** El inventario se construía por orden de descubrimiento, pero los diagnósticos esperaban índices fijos. Ahora cada documento conserva capítulo e índice canónicos. Leer primero el tercer documento no invalida una acusación correcta. La importación reconstruye los documentos desde la fuente original.
- **El cierre principal cambiaba después de volver a jugar un mundo anterior.** Cada epílogo se sella con su texto, clave y resultados locales. El archivo superior guarda las cinco versiones que formaron ese recorrido. Una nueva partida de un mundo conserva el cierre principal anterior. Para obtener otro cierre superior se vuelve a jugar Origen sobre las versiones completadas vigentes.
- **Se perdían las enmiendas anteriores.** Las intervenciones se conservan por sección. Sus costos no desaparecen al pasar al siguiente capítulo ni al reintentar un duelo.
- **Importación demasiado permisiva.** Se validan fases, índices, respuestas, perfiles, secuencias, tiempos y estados. Los textos importados se muestran escapados; no pueden introducir HTML ejecutable en cuaderno, historial, álbum o epílogo. Una partida incompatible no reemplaza silenciosamente el progreso actual. Los datos locales inválidos se conservan en una copia de recuperación.
- **Desenlace calculado solo por trato.** Ahora existe una síntesis de tres inferencias por caso. Los finales de máxima comprensión requieren pruebas suficientes, comprensión completa, trato coherente y una última decisión compatible. El cierre superior exige además comprensión y resultados favorables en los cinco mundos. Corregir errores de combate no impide alcanzar el mejor final.

## Mejoras de experiencia

- Se preservó el combate pedido: ánimo del jugador, resistencia argumental, estado rival distinto en cada fase, cartas, daño por errores, explicación y reintento sin borrar decisiones o lectura. Se alternan refutación, presentación de fuentes y reconstrucción temporal.
- Las **24 enmiendas** se vinculan a objetos y documentos concretos de cada sección. Ya no se repite cuatro veces una misma máxima por mundo.
- Las decisiones y respuestas tienen orden de presentación estable pero diferente según el caso. Su posición en pantalla no revela la opción favorable.
- El diagnóstico admite pares alternativos de pruebas cuando el guion los considera suficientes. La ayuda gradual comienza por el método de contraste y solo revela fuentes o explicación completa cuando se solicita.
- Es posible releer juntas las dos fuentes seleccionadas para fundamentar una hipótesis. Se distingue acertar una identidad de demostrarla.
- `routeScenes(slot)` incorpora los pasajes escritos para la trayectoria elegida antes de continuar el capítulo. Los contadores, la navegación y la validación de guardados usan la misma secuencia efectiva. Las ramas no son solamente una bonificación de vida o un cambio de epílogo.
- Se añadieron **25 logros base** y un álbum de finales. Persisten al reiniciar un mundo. Los finales desconocidos y el logro de cierre más revelador no muestran sus detalles antes de descubrirlos. No se otorga un premio moral por maltratar a personajes.
- El perfil conserva nombre, apariencia y género, con trato neutral, femenino o masculino. La apariencia elegida también aparece en formato mayor en Origen. El corazón verde sigue siendo exclusivo de Belén.

## Pantallas y accesibilidad

Los atlas se dibujan en un canvas mediante recorte proporcional del cuadrante correspondiente. No se estira la ilustración para llenar una pantalla de otra forma. Cada sección puede declarar `sceneFocus` para conservar su punto de interés. El canvas desactiva interpolación, limita la densidad a dos y no mantiene una caché propia de todos los atlas.

Una carga atrasada no pinta una escena nueva: cada callback comprueba que su canvas siga conectado. Solo se conserva el manejador de redimensionado de la escena vigente.

La barra de herramientas permanece accesible durante la lectura. Al avanzar a un párrafo, turno o conclusión se vuelve al comienzo del contenido; cuando cambia el escenario se muestra también el nuevo lugar. Seleccionar pruebas o reintentar dentro de la misma vista conserva la posición. Los controles pequeños de la barra se ampliaron, se añadieron nombres accesibles a la navegación por iconos y se respeta también la preferencia de movimiento reducido del sistema.

## Guardados y expansión

Los guardados contienen `contentIds`; una reorganización de paquetes puede remapear los índices sin atribuir un mundo al progreso de otro. La última versión completada de cada mundo se conserva por ID mientras se recorre una nueva versión. No se accede a un interludio inexistente al terminar un DLC. El archivo final se reconoce por su ID y sus requisitos, no por asumir que todo índice posterior al quinto es Origen.

## Verificación reproducible

Ejecutar desde la raíz:

```text
node --check dist/app.js
node --check dist/lore.js
node tests/gameplay.test.mjs
```

Resultado del último pase: **14.601 comprobaciones satisfactorias**. Se utiliza el motor de producción en Node con un DOM simulado, no una segunda implementación de las reglas. El pase incluye:

- Recorrido de los seis mundos y las 24 secciones con investigación leída fuera de orden, enmiendas, hipótesis, tres fases y conclusiones.
- Las **81 combinaciones de decisiones × 27 combinaciones de respuestas de síntesis × 6 mundos**: 13.122 estados de cierre compuestos. Se verifica que las siete familias sean alcanzables en cada mundo, para un total de **42 familias de final**.
- Derrota, reintento, fuentes conservadas, ayudas, progresión tras interludios y persistencia de consecuencias.
- Rutas tempranas adversas con decisiones posteriores favorables y la situación inversa, además de una acusación sin fundamento aunque se gane el duelo.
- Cierre superior que no pierde su versión al completar luego una ruta adversa de Casa; un nuevo recorrido de Origen sí considera ese resultado distinto.
- Perfil, normalización, importaciones estructuralmente inválidas, textos hostiles, identidad canónica de fuentes, reordenamiento de paquetes y un DLC simulado completo.
- Diferencia efectiva entre las tres trayectorias sostenidas en cada capítulo posterior al consejo inicial.

Las 81 combinaciones de decisiones **no se presentan como 81 novelas completamente independientes**. Comparten el misterio central y combinan trayectorias sostenidas, reacciones posteriores, acciones locales y epílogos condicionados. La campaña tiene seis casos marco y siete familias de cierre por caso.

La revisión literaria corresponde al informe de guion. Estas pruebas no sustituyen una lectura humana de todas las combinaciones ni una prueba visual o de rendimiento en dispositivos. El responsable principal realiza la comprobación nativa de Windows y del Samsung conectado antes del empaquetado final.

## Duración

El contenido creció para sostener las relaciones, las pistas y las rutas. La interfaz ya no anuncia la estimación inicial de 120–170 minutos. Indica aproximadamente **4–5 horas**, con secciones de alrededor de 8–12 minutos según lectura e investigación. El informe de contenido de la entrega calcula el texto realmente recorrido, separándolo de las variantes que una sola partida no lee. No se introduce una espera artificial para aparentar una duración mínima.

## Pase final de expresiones y álbum visual

El menú abre ahora con «El Archivo de lo Imposible» y una invitación dentro del universo narrativo. Se retiró el encabezado comercial anterior.

Los 33 personajes del códice tienen un retrato asignado, con cinco expresiones por identidad. La visita conserva sus tres apariencias seleccionables. Se integraron saltos, sobresaltos, asentimientos, inclinaciones, vacilaciones, descenso de ánimo, temblor y entrada de escena; una respiración discreta mantiene presencia entre intervenciones. Los gestos responden al fragmento y al personaje visible. La lectura no cambia de posición con ellos. Se priorizan frases donde el actor es sujeto, se neutralizan acciones negadas y el guion puede especificar `emotion` y `gesture` por nodo. Una mención incidental al antagonista no cambia por sí sola el retrato a esa figura. Los aliases explícitos conservan la identidad: Teo/Coleccionista y Elvira/Regente comparten el retrato correspondiente.

La opción de movimiento reducido y la preferencia del sistema detienen tanto los gestos como la respiración, conservando las caras expresivas. Las celdas del atlas mantienen su proporción dentro de los marcos de escena y del álbum. Se probaron las coordenadas de las hojas de cinco columnas y tres, seis u ocho filas.

El códice funciona como un álbum visual amplio: seis mundos con ilustraciones de sus escenarios, 33 personajes con retratos, doce objetos ilustrados y dieciocho conceptos de lectura. Las imágenes y los nombres desconocidos permanecen ocultos bajo fichas negras. El descubrimiento procede del texto canónico realmente mostrado: fragmentos, documentos abiertos, preguntas visibles, estados del duelo, respuestas y cierres. No se inspeccionan capítulos futuros, documentos cerrados ni finales de otras rutas para completar la colección. Todos los personajes, conceptos y objetos resultaron descubribles durante el recorrido completo ejecutado por las pruebas.

Las fichas crecen con la lectura. Una persona muestra su presentación al encontrarla, su trasfondo tras la primera sección completada de su mundo y sus detalles tras la segunda. Los 88 hitos tienen sus propios umbrales; los de Origen para Belén y Marea no se adelantan por completar mundos anteriores. Las notas finales se abren tras un cierre descubierto. Los objetos muestran imagen y presentación al encontrarlos, amplían sus notas tras la primera sección y reservan la resolución para el final.

Los máximos de conocimiento y la colección persisten al volver a jugar. La sección «Recorrido actual» consulta las decisiones completadas de la versión activa; los 159 registros de relaciones describen elecciones concretas, sin convertir toda decisión en una variación genérica de afecto. La relación vigente queda separada del conocimiento conservado de lecturas anteriores.

Las partidas antiguas se recuperan a partir de su progreso y las fuentes canónicas. Los nombres introducidos en un historial importado no desbloquean fichas. Los identificadores, duplicados y umbrales inválidos del códice se rechazan antes de reemplazar una partida. La navegación del álbum mantiene los bloqueos incluso si se intenta abrir directamente una ficha desconocida.

El foco inicial de los modales pasó al título accesible (`aria-labelledby`, `tabindex=-1`, `preventScroll`). En Android, abrir el perfil ya no enfoca automáticamente el campo de nombre ni despliega el teclado sobre la ficha. La cabecera móvil distribuye sus herramientas en dos filas para conservar objetivos táctiles y evitar desbordamientos al añadir el acceso al códice.

El último pase ejecutó **14.613 comprobaciones satisfactorias** mediante el motor de producción y los datos finales del guion y del códice. Incluye las regresiones de Casa con todos los niños liberados pese al daño anterior, Tronos con garantías efectivamente firmadas y Origen con supervisión renovable que no se presenta como eliminación de autoridad unilateral. Se conservaron las 42 familias de final alcanzables. La comprobación visual y de rendimiento nativa corresponde al pase del responsable principal sobre Windows y el Samsung conectado; este informe no la sustituye ni declara una partida humana completa de todas las rutas.

## Presentación completa y modo liviano opcional

La medición previa del Samsung J6 (`docs/qa/android-gfx-reading.txt`) motivó revisar el trabajo de animación continuo. La preferencia final del usuario prioriza la calidad visual: la presentación completa queda activada por defecto en todos los dispositivos, incluido Android con poca memoria. No se utiliza el sistema operativo ni la memoria declarada para reducir efectos automáticamente.

«Modo liviano» es una casilla opcional en Ajustes, desactivada por defecto. Al elegirla, la respiración y las estrellas dejan de animarse continuamente y se retiran los filtros de sombra del retrato y el desenfoque del fondo modal. Se conservan expresiones, gestos puntuales y aparición del texto. La decisión se guarda como un booleano opcional; las partidas anteriores que no incluyen el campo mantienen la presentación completa. Una importación conserva una selección válida y rechaza valores de otros tipos.

Al ocultar el documento, las animaciones CSS se pausan hasta volver a mostrarlo, con independencia de esa casilla. Las seis comprobaciones específicas cubren compatibilidad de guardados, validación del booleano, preservación de la opción importada, presentación completa por defecto en Android, activación explícita desde el checkbox y conservación del ritmo de texto y del ajuste de movimiento reducido. Resultado final: **14.613 comprobaciones satisfactorias**. La medición posterior en el teléfono corresponde al responsable principal; el informe no promete una frecuencia de cuadros que todavía no se haya medido.