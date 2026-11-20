# Plan de acción | Landing y proceso de registro

## Objetivo

Corregir los problemas visuales y de comunicación, conectar la landing con el proceso de registro existente de Jhonmar y obtener la validación de Devinson antes de solicitar la aprobación final del cliente.

## Alcance

- **Desarrollo nuevo:** una landing page con CTA de registro.
- **Integración:** reutilizar el proceso existente, sin reconstruirlo.
- **Correcciones:** formulario, Disclosure, mensajes, navegación y video, según las responsabilidades acordadas.

## Flujo requerido

Landing → Signup → QCV → Firma electrónica del acuerdo → Reserva de llamada de bienvenida

## Lista de tareas

Ordenada de menor a mayor esfuerzo estimado. Las dependencias determinan el orden final de ejecución.

### Fase 1 · Ajustes rápidos

- [✅] **T01 · Reducir el espaciado del Disclosure**
  - Eliminar los espacios excesivos entre párrafos.
  - Conservar el contenido original.
  - **Criterio de aceptación:** texto compacto y legible.

- [✅] **T02 · Optimizar la presentación del formulario**
  - Ajustar dimensiones y espacios para facilitar su uso.
  - Revisar la visualización en escritorio y móvil.
  - **Criterio de aceptación:** el tamaño del formulario no dificulta leerlo ni completarlo.

- [✅] **T03 · Actualizar el texto del CTA**
  - Utilizar “Signup” o el equivalente aprobado.
  - **Criterio de aceptación:** el botón comunica claramente la acción de iniciar el registro.

- [✅] **T04 · Preparar los mensajes corregidos**
  - Identificar la página y el correo que confirman una llamada aún no reservada.
  - Redactar mensajes acordes con el estado real del prospecto.
  - **Criterio de aceptación:** textos listos para revisión, sin confirmaciones anticipadas.

### Fase 2 · Coordinación y definición

> Iniciar la coordinación de esta fase en paralelo con los ajustes rápidos.

- [✅] **T05 · Realizar una reunión con Jhonmar y Devinson**
  - Revisar el proceso existente y las observaciones del cliente.
  - Definir responsables y registrar los acuerdos.
  - **Criterio de aceptación:** alcance y responsabilidades confirmados.

- [✅] **T06 · Validar el proceso de registro existente**
  - Obtener de Jhonmar el enlace o mecanismo de entrada.
  - Recorrer QCV, firma del acuerdo y reserva de la llamada.
  - **Dependencia:** T05.
  - **Criterio de aceptación:** punto de entrada y secuencia del flujo confirmados.

- [✅] **T07 · Confirmar la ubicación del video**
  - Obtener el video de preparación aprobado.
  - Definir en qué página de agradecimiento debe aparecer.
  - **Dependencia:** T05.
  - **Criterio de aceptación:** video disponible y ubicación acordada.

### Fase 3 · Integración y correcciones funcionales

- [✅] **T08 · Conectar la landing con el registro existente**
  - Configurar el destino del CTA.
  - Reutilizar el proceso de Jhonmar sin crear un flujo paralelo.
  - **Dependencias:** T03 y T06.
  - **Criterio de aceptación:** el CTA abre el punto de entrada correcto.

- [✅] **T09 · Corregir la continuidad después del QCV**
  - Ajustar la navegación si no respeta el flujo requerido.
  - **Dependencia:** T06.
  - **Criterio de aceptación:** después del QCV, el prospecto continúa a la firma y luego a la reserva.

- [✅] **T10 · Actualizar la página de agradecimiento y el correo**
  - Implementar los textos revisados.
  - Verificar los eventos que muestran la página y disparan el correo.
  - **Dependencias:** T04, T05 y T06.
  - **Criterio de aceptación:** cada mensaje corresponde al paso realmente completado.

- [✅] **T11 · Incorporar el video de preparación**
  - Insertar el video en la ubicación acordada.
  - Comprobar su reproducción en escritorio y móvil.
  - **Dependencia:** T07.
  - **Criterio de aceptación:** video visible y funcional.

### Fase 4 · Validación y aprobación

- [✅] **T12 · Ejecutar pruebas del recorrido completo**
  - Validar landing, CTA, QCV, firma, reserva, mensajes, correo y video.
  - Revisar escritorio y móvil.
  - Registrar y resolver los errores encontrados.
  - **Dependencia:** T01–T11 completadas.
  - **Criterio de aceptación:** recorrido sin bloqueos ni mensajes contradictorios.

- [✅] **T13 · Obtener la validación de Devinson**
  - Presentar el flujo completo para revisión.
  - Resolver las observaciones pendientes.
  - **Dependencia:** T12.
  - **Criterio de aceptación:** conformidad interna registrada.

- [ ] **T14 · Solicitar la aprobación final del cliente**
  - Presentar la versión validada.
  - Adjuntar un resumen de las correcciones realizadas.
  - **Dependencia:** T13.
  - **Criterio de aceptación:** aprobación recibida o nuevas observaciones registradas.

## Condiciones de cierre

- [ ] El desarrollo nuevo se limita a la landing.
- [ ] El CTA utiliza el proceso existente de Jhonmar.
- [ ] El flujo respeta el orden QCV → Firma → Reserva.
- [ ] Ningún mensaje confirma una llamada que todavía no se ha reservado.
- [ ] El video está disponible en la ubicación acordada.
- [ ] El formulario y el Disclosure tienen las correcciones visuales solicitadas.
- [ ] Devinson ha validado la implementación antes del envío al cliente.