# Revisión final 2.1 — 5 de noviembre de 2026

Se revisaron los seis mundos, el prólogo, los interludios, la relación entre decisiones y epílogos, y el flujo de debates. El trabajo se centró en los problemas concretos detectados; no constituye una garantía de perfección literaria ni una partida manual de todas las combinaciones.

## Cambios integrados

- Sombra: procedencia de las copias de Mara, orden de descubrimiento de la etiqueta, presentación de Damián y salida de Nilo situada después de revisar los mapas cuando esa es la ruta efectivamente narrada.
- Casa: presentación y movimientos de personajes, distinción entre una dirección antigua y una certeza presente, y cierre sin atribuir a Bruno una pérdida de reconocimiento de su madre que no se había demostrado.
- Traje: la guía no anticipa una falsificación futura; la comparación del acta puede sostenerse con la guardia y el comerciante aunque el jugador reserve la hoja de Tilo. La reparación pública no se convierte en una excepción privada por recibir un final desfavorable.
- Neón: calibración fechada junto a los eventos investigados; la reconstrucción no se da por resuelta antes del debate; aislamiento del enlace del vestíbulo durante la prueba del cartel. Se separan el abrigo de la infancia de Ada y la ayuda durante el apagón. Los cierres distinguen transmisión inmediata, memoria conservada y permisos realmente retirados.
- Origen: se explica la transferencia de custodia que permite a Marea salir del taller. Los títulos y cierres distinguen cortar enlaces, distribuir permisos y mantener puertas provisionalmente cerradas. Un final mixto ya no niega la exclusión que acaba de autorizar el jugador.
- Códice: el trasfondo de Daro espera a su confesión; nombres comunes como Luz, Espejo y Archivero no descubren personajes de otros mundos ni antes de sus secciones.
- Motor: recuperar ánimo conserva la ronda pendiente; las acciones repetidas no saltan una sección ni reinician una respuesta. El contador refleja una intervención resuelta. Cerrar el prólogo con Escape/Atrás libera su estado de lectura. Android informa el resultado real de exportar una partida y carga el juego si restaurar la vista nativa falla.

## Comprobación

`node tests/gameplay.test.mjs`: **14.848 aserciones, PASS**, seis mundos y veinticuatro secciones. Incluye diez regresiones nuevas de descubrimiento y epílogos, además de las correcciones del flujo de debate. Resultado en `auditoria-final-motor.json`.

Se regeneraron las dieciocho lecturas compuestas y el informe de contenido. APK 2.1.0 (versionCode 3), firmado con la identidad existente, y EXE 2.1.0 compilados. Once archivos críticos comparados por SHA-256 en ambos paquetes: veintidós coincidencias. Registro en `paquetes-v2.1-verificados.json` y sumas en `entrega/SHA256SUMS-v2.1.txt`.

Tres subagentes inspeccionaron y editaron guion y motor. Sus turnos se interrumpieron por el límite de uso antes de producir informes finales individuales; el responsable principal revisó los cambios guardados, integró los cierres y ejecutó las comprobaciones anteriores. No se afirma que completaran otra auditoría independiente exhaustiva después de estos cambios.

ADB inició, pero no había ningún teléfono conectado. No se repitió una prueba física en el J6 ni una medición de rendimiento para esta versión. El paquete de pruebas 2.0 anterior no se anuncia como actualizado: las entregas nuevas son los dos archivos 2.1.

La actualización conserva la identidad de la aplicación y el formato de partidas. Los finales ya sellados conservan su texto como registro de ese recorrido; para leer el cierre revisado hay que repetir ese mundo. No hubo publicación web ni incorporación de login.
