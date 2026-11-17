import { useEffect, useRef, useState } from "react";

const FORMSTACK_FORM_DOCUMENT = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      html, body { margin: 0; padding: 0; width: 100%; background: transparent; }
    </style>
  </head>
  <body>
    <script type="text/javascript" src="https://kic.formstack.com/forms/js.php/cpp_credit_report"></script>
    <noscript>
      <a href="https://kic.formstack.com/forms/cpp_credit_report" title="Online Form">Online Form - CPP - credit report - Upload Credit Report - kevin</a>
    </noscript>
  </body>
</html>`;

export function FormstackEmbed() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(900);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) {
      return;
    }

    let observedBody: HTMLElement | null = null;
    let resizeObserver: ResizeObserver | undefined;
    let mutationObserver: MutationObserver | undefined;

    const measureHeight = () => {
      const document = iframe.contentDocument;
      if (!document?.body) {
        return;
      }

      const scrollY = document.defaultView?.scrollY ?? 0;
      const form = document.querySelector("form");
      const contentBottom = form
        ? form.getBoundingClientRect().bottom + scrollY
        : Math.max(
            ...Array.from(document.body.children, (element) => {
              const rect = element.getBoundingClientRect();
              return rect.bottom + scrollY;
            }),
          );
      setHeight(Math.min(Math.max(Math.ceil(contentBottom + 16), 1), 10000));
    };

    const configureForm = () => {
      const form = iframe.contentDocument?.querySelector<HTMLFormElement>("form");
      if (form && form.target !== "_top") {
        form.target = "_top";
      }
      measureHeight();
    };

    const observeFormDocument = () => {
      const document = iframe.contentDocument;
      if (!document?.body) {
        return;
      }

      if (document.body !== observedBody) {
        resizeObserver?.disconnect();
        mutationObserver?.disconnect();
        observedBody = document.body;
        resizeObserver = new ResizeObserver(measureHeight);
        resizeObserver.observe(iframe);
        resizeObserver.observe(document.documentElement);
        resizeObserver.observe(document.body);
        mutationObserver = new MutationObserver(configureForm);
        mutationObserver.observe(document.documentElement, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true,
        });
      }

      document.defaultView?.addEventListener("resize", measureHeight);
      configureForm();
      window.setTimeout(measureHeight, 100);
      window.setTimeout(measureHeight, 500);
    };

    iframe.addEventListener("load", observeFormDocument);
    window.addEventListener("resize", measureHeight);
    observeFormDocument();

    return () => {
      iframe.removeEventListener("load", observeFormDocument);
      window.removeEventListener("resize", measureHeight);
      iframe.contentWindow?.removeEventListener("resize", measureHeight);
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      title="CPP credit report upload form"
      srcDoc={FORMSTACK_FORM_DOCUMENT}
      sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
      className="block w-full border-0"
      style={{ height }}
      loading="lazy"
    />
  );
}
