# Diagnostico del envio de Formstack

## Que ocurre

El formulario visible recopila los datos y, al pulsar `Submit Application`, los copia al formulario oficial de Formstack que se carga dentro de un iframe oculto. La pagina principal espera una confirmacion: Formstack debe redirigir ese iframe a la pagina de agradecimiento; esa pagina envia un mensaje al formulario principal y entonces se completa el flujo.

## Causa identificada

Al consultar la respuesta actual del embed de Formstack (`/forms/js.php/cpp_credit_report`), su configuracion devolvio `redirectUrl: null`. Por eso Formstack no redirige el iframe a `https://credittoworkcom.vercel.app/thank-you` y la pagina principal no recibe la confirmacion. El indicador de carga vence a los 45 segundos y muestra el mensaje de que Formstack no confirmo el envio.

Que la pagina `/thank-you` exista no basta: Formstack debe tener configurada esa direccion como URL de confirmacion y devolverla en la respuesta del embed. El codigo ya acepta la URL sin `?source=formstack` y envia el mensaje de exito cuando la pagina se abre dentro del iframe.

## Que se sabe y que falta verificar

- El registro de consola compartido solo mostro un aviso de hidratacion asociado a atributos agregados por una extension del navegador; no mostro un error de envio de Formstack.
- El mensaje de timeout significa que no llego la confirmacion. Por si solo no demuestra si Formstack recibio o no los datos; no se hizo un envio real para comprobarlo.
- La configuracion observada con `redirectUrl: null` debe corregirse en Formstack. Luego hay que volver a consultar el embed y verificar que devuelva la URL de confirmacion.
- El salto al inicio era un problema visual separado. El iframe se mantiene fijo en un area de 1 px y el submit se activa con `requestSubmit()` para evitar ese desplazamiento.

## Archivos relacionados

- `src/components/landing/formstack-embed.tsx`: copia los campos al embed, envia el formulario en segundo plano y espera el mensaje de confirmacion.
- `src/routes/thank-you.tsx`: envia el mensaje de exito cuando se abre dentro de un iframe.