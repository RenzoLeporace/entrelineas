# EntreLíneas: El Archivo de lo Imposible

© 2026 **Leporace Renzo**. Todos los derechos reservados.

## Jugar en la web

Edición web: https://renzoleporace.github.io/entrelineas/

La edición de pruebas web utiliza un acceso visual con usuario y contraseña entregados por el autor. Se valida únicamente en el navegador: **no es autenticación segura y los archivos publicados en GitHub Pages son públicos**. La licencia propietaria sigue vigente; publicar este repositorio no lo convierte en código abierto.

El progreso web se guarda en este navegador. Exportá la partida desde Ajustes antes de cambiar de dispositivo. Los ejecutables Android y Windows conservan el acceso directo, sin login.

`node scripts/prepare-web.mjs` genera `build/pages` desde `dist`, añade el acceso exclusivo de la web y copia las licencias. El flujo `.github/workflows/pages.yml` comprueba el juego y publica ese directorio al actualizar `main`. Los paquetes nativos siguen compilando desde `dist`.

Novela visual de investigación y deducción, con cinco mundos y un sexto mapa que resuelve la historia del archivo superior. Protagonista con nombre y apariencia elegibles; Belén es una aliada, no el personaje principal.

La aplicación funciona sin conexión. No requiere cuenta, pagos, publicidad ni servicios externos. Los escenarios, personajes y guiones están incluidos. Los diálogos usan tipos de letra del sistema para priorizar legibilidad.

## Jugar

- **Windows:** abrir `entrega/EntreLineas-v2.1-Windows-x64.exe`. Requiere Windows de 64 bits, .NET Framework 4.8 y Microsoft Edge WebView2 Runtime. No requiere instalar Node ni iniciar un servidor. WebView2 ya viene instalado en muchos equipos Windows actualizados. El ejecutable no tiene firma comercial de Authenticode.
- **Android:** instalar `entrega/EntreLineas-v2.1-Android.apk` en Android 8 o posterior. Está firmada localmente para instalación directa. No es una publicación de Google Play. Usa Android WebView; conviene mantenerlo actualizado.

La partida se guarda en cada dispositivo. Desde Ajustes se puede exportar e importar un archivo JSON. Windows y Android no comparten progreso automáticamente. Repetir un mundo reemplaza su partida activa; los desbloqueos y logros persistentes se conservan.

## Qué contiene

- Veinticuatro secciones narrativas base, con decisiones, documentos, pistas y combates por fases.
- Prólogo, interludios y un arco principal con sus propias pruebas y confrontación final.
- Barras de ánimo y argumento rival; estado cambiante, cartas, errores con explicación y reintento sin perder las decisiones del relato.
- Presentación de pruebas, reconstrucción de secuencias, anotación de fuentes alteradas y diagnóstico razonado de los focos.
- Varios desenlaces por mundo y cierre principal condicionado por el recorrido.
- Ajustes de tamaño de texto, velocidad de aparición, movimiento reducido y sonido ambiente opcional.
- Setenta y dos escenarios y momentos ilustrados en dieciocho atlas, más portada y hojas de personajes. Los cambios siguen el avance del relato.
- Cinco expresiones por personaje con retrato, gestos contextuales y movimiento reducido. Treinta y siete personajes ilustrados, con tres apariencias para el visitante.
- Códice visual con seis mundos, treinta y siete personajes, doce objetos ilustrados y dieciocho conceptos. Sus noventa y cinco hitos y ciento cincuenta y nueve registros de vínculos se revelan según el progreso y las decisiones. Conserva lo descubierto al rejugar y distingue la relación del recorrido actual.

Una primera partida se estima en **5–6½ horas** (294–387 minutos según el modelo actualizado de lectura e interacción); explorar el códice y otras versiones añade tiempo. Hay **42 familias de final**, siete por mapa, **18 trayectorias sostenidas**, tres por mapa, y **72 ramas locales de decisión**. Las cuatro decisiones de cada mapa admiten 81 secuencias combinadas que comparten escenas; no se anuncian como 81 novelas independientes. Incluye **25 logros** persistentes.

La revisión 2.0 reescribe las24secciones y el arco superior con llegadas explícitas, investigador presente y una intervención por ronda. Se auditó la progresión entre escena, pruebas, confrontación, consecuencias y códice. Los informes finales están en docs/auditoria-causalidad-final.md, docs/auditoria-cierre-editorial.md y docs/auditoria-codice-fluidez.md.

Las estadísticas finales están en `docs/contenido-estadisticas.json` y los informes de revisión en `docs/revision-guion.md` y `docs/revision-jugabilidad.md`. Las estimaciones dependen del ritmo de lectura y no obligan a esperar con temporizadores.

## Tecnología y estructura

HTML, CSS y JavaScript sin dependencias de ejecución. Los contenedores nativos usan WinForms/WebView2 en Windows y Activity/WebView en Android. Android no solicita permiso de Internet ni acceso general al almacenamiento; la exportación/importación usa el selector de documentos del sistema.

- `dist/stories.js`: registro de mundos y formato de capítulo.
- `dist/data/`: guiones, documentos, decisiones, fases y desenlaces de cada mundo.
- `dist/lore.js`: historia principal, reglas de investigación y vínculos entre mundos.
- `dist/app.js`: motor, guardado, UI, investigación y combates.
- `dist/style.css`: diseño adaptable y accesibilidad.
- `dist/assets/`: recursos incluidos para jugar sin red.
- `native/`: contenedores Windows/Android.
- `scripts/`: servidor, análisis de contenido y compilación reproducible.
- `tests/`: verificaciones de lógica, transiciones y rutas.

## Añadir historias o DLC

Se conserva un registro explícito de mundos. Cada expansión necesita un `id` nuevo y estable, sus requisitos `requires` y sus propios guiones/recursos. No reutilizar identificadores ni sobrescribir un mundo existente para introducir otro.

Un archivo de expansión cargado después de `lore.js` y antes de `app.js` puede llamar a `registerWorld(world)`. El objeto debe incluir metadatos, `chapters`, `endings`, `mystery`, `repair` y las preguntas de síntesis conforme al contrato de los mundos base. Cada capítulo declara narrativa, documentos, decisiones con consecuencias y ecos, rondas con pruebas de apoyo y secuencia temporal. Los requisitos se expresan con IDs, no con títulos.

Los escenarios usan tres atlas de cuatro cuadrantes por mundo: `assets/scenes/<id>.png`, `<id>-1.png` y `<id>-2.png`. Corresponden a llegada, desarrollo y momento clave de las cuatro secciones base. Un DLC con otra estructura debe declarar y probar su propio mapa de escenas; no debe simular compatibilidad reutilizando posiciones inexistentes. Antes de publicar una expansión, ejecutar las pruebas y comprobar persistencia de partidas anteriores y coherencia de todas las ramas nuevas.

## Compilar

Windows: obtener el SDK oficial de Microsoft WebView2 en `vendor/webview2` y ejecutar `powershell -File scripts/build-windows.ps1`. Se conserva su licencia en el paquete. El compilador utilizado es el de .NET Framework instalado en Windows.

Android: instalar JDK 17, Android SDK plataforma 34 y build-tools 34.0.0; ejecutar `powershell -File scripts/build-android.ps1`. Admite `-AndroidJdk <ruta>` y `ANDROID_HOME` para ubicar las herramientas. No requiere Gradle. El script conserva una clave local en `private-signing/`, excluida del control de versiones. **Guardar esa carpeta en un lugar privado:** se necesita para firmar futuras actualizaciones con la misma identidad. No publicar la clave ni su contraseña. La carpeta `entrega/` contiene los artefactos finales, no herramientas de compilación.

Para regenerar el informe de duración y contenido: `node scripts/report-content.mjs`.

Las pruebas nativas pueden usar `EntreLineas-v2.1-Windows-x64.exe --qa` (perfil separado) y `powershell -File scripts/build-android.ps1 -Qa` (paquete Android distinto con sufijo `.qa`). Así no se mezcla el recorrido de prueba con la partida del jugador.

## Autoría, arte y referencias

Dirección y concepto: Leporace Renzo. Código, guion y arte creados con asistencia de IA mediante Codex. La herramienta integrada `image_gen` produjo las imágenes; los prompts se conservan en `docs/arte-prompts.json`, `docs/expresiones-prompts.json` y `docs/codice-prompts.json`.

El proyecto toma temas de cuentos clásicos y la referencia de investigación narrativa solicitada por el autor, con personajes, diálogos, imágenes y música propios. No incorpora recursos de Danganronpa, One Thousand Lies, Steins;Gate o Metro Exodus. Ver `LICENSE` y `THIRD_PARTY_NOTICES` para el alcance de los avisos y las dependencias. El aviso de autoría no constituye un registro oficial de derechos.
