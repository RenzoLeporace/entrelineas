# Comprobación nativa de entrega

28 de octubre de 2026. EntreLíneas: El Archivo de lo Imposible.

Se compilaron el EXE Windows x64 y el APK Android 8 o posterior, sin conexión ni login. Ambos contienen guion, códice, licencias, escenarios y retratos. El APK verificó las firmas v2 y v3; sus rutas internas usan separadores Android correctos. Las sumas SHA-256 de la entrega están en entrega/SHA256SUMS.txt.

En Windows se abrió el ejecutable real mediante WebView2, se inspeccionaron el menú y el códice con sus entradas desconocidas bloqueadas. Se utilizó un perfil de pruebas separado; la entrega se abrió luego con el perfil normal.

En el Samsung SM-J600G conectado se instalaron las compilaciones y se recorrieron perfil, prólogo, escenas, avance y revelación de texto, cambios de fondo y galería del códice. Una actualización conservó el progreso del perfil de pruebas, incluido el descubrimiento de 7 personajes y 2 objetos. El APK final utiliza otro paquete, con partida inicial limpia. La aplicación separada de pruebas se retiró al terminar.

Durante una muestra de lectura con efectos completos, gfxinfo registró 4.274 cuadros, percentiles de 18 ms (50), 22 ms (90), 25 ms (95) y 38 ms (99). Clasificó 69,77 % como cuadros fuera del plazo de refresco. Esta medición de WebView no certifica una tasa estable para toda la campaña. El proceso principal usó unos 64,7 MB PSS, sin incluir todo el proceso de renderizado. Por preferencia del autor se conserva la presentación completa; Ajustes ofrece un modo liviano manual. Las animaciones se pausan en segundo plano.

El pase automatizado final del motor completó 14.613 comprobaciones, incluidos estados de las 42 familias de final y las rutas compuestas. Los informes de ambos subagentes describen las revisiones de guion y jugabilidad. No se afirma haber jugado manualmente todas las rutas ni haber medido la duración con jugadores externos. La estimación de primera campaña es 221–298 minutos, sin sumar el códice opcional ni todas las relecturas.

No se publicó ni subió el proyecto a un hosting. El trabajo de login web fue cancelado antes de incorporar archivos de servidor. EXE y APK funcionan sin cuenta.
