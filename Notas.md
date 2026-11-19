# Diagnostico del envio de Formstack

## Que ocurre

El formulario visible recopila los datos y, al pulsar `Submit Application`, los copia al formulario oficial de Formstack que se carga dentro de un iframe oculto. La pagina principal espera una confirmacion: Formstack debe redirigir ese iframe a la pagina de agradecimiento; esa pagina envia un mensaje al formulario principal y entonces se completa el flujo.

## Causas identificadas en el flujo personalizado

El embed oficial funciona por separado, pero el flujo personalizado copiaba los datos al formulario React de Formstack y los enviaba de inmediato. Se encontraron dos problemas:

- La casilla obligatoria de terminos (campo `200358413`) se marcaba asignando `.checked` y despachando eventos. Formstack no actualizaba su estado React; su validacion rechazaba el formulario. La integracion ahora activa la casilla con `.click()`.
- Al asignar el archivo y disparar `change`, Formstack inicia una carga asincrona (`/live-form/fileUpload/getUploadUrls`). El codigo intentaba enviar el formulario antes de que terminara. Ahora espera el estado accesible `Upload complete` y muestra un error si la carga falla o no finaliza.

La pagina `/thank-you` envia el mensaje de exito cuando se abre dentro del iframe; el listener acepta tanto el iframe del embed como el iframe de destino.

## Que se sabe y que falta verificar

- El registro de consola compartido solo mostro un aviso de hidratacion asociado a atributos agregados por una extension del navegador; no mostro un error de envio de Formstack.
- El mensaje de timeout significa que no llego la confirmacion. Por si solo no demuestra si Formstack recibio o no los datos; revisar las entradas de Formstack antes de volver a enviar.
- Se probaron la validacion de la casilla y el orden de carga/envio con datos ficticios y los POST bloqueados en el navegador. No se envio ningun registro real.
- El salto al inicio era un problema visual separado. El iframe se mantiene fijo en un area de 1 px y el submit se activa con `requestSubmit()` para evitar ese desplazamiento.

## Archivos relacionados

- `src/components/landing/formstack-embed.tsx`: copia los campos al embed, envia el formulario en segundo plano y espera el mensaje de confirmacion.
- `src/routes/thank-you.tsx`: envia el mensaje de exito cuando se abre dentro de un iframe.