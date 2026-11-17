import { useEffect, useRef, useState } from "react";

const FORMSTACK_FORM_DOCUMENT = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      html, body { margin: 0; padding: 0; width: 100%; background: transparent; }
      body { display: flex; justify-content: center; }
    </style>
  </head>
  <body>
    <script type="text/javascript" src="https://kic.formstack.com/forms/js.php/cpp_credit_report"></script>
    <noscript>
      <a href="https://kic.formstack.com/forms/cpp_credit_report" title="Online Form">Online Form - CPP - credit report - Upload Credit Report - kevin</a>
    </noscript>
  </body>
</html>`;

const FORM_SCALE = 0.8;
const FORM_TITLE_BACKGROUND = "oklch(0.5467 0.1159 162.49)";

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

    const setCompactStyle = (
      element: HTMLElement,
      property: string,
      value: string,
    ) => {
      if (
        element.style.getPropertyValue(property) !== value ||
        element.style.getPropertyPriority(property) !== "important"
      ) {
        element.style.setProperty(property, value, "important");
      }
    };

    const compactFormLayout = () => {
      const form = iframe.contentDocument?.querySelector("form");
      if (!form) {
        return;
      }

      form.querySelectorAll<HTMLElement>(".fsSectionHeader").forEach((element) => {
        setCompactStyle(element, "margin-bottom", "4px");
        setCompactStyle(element, "padding", "6px");
        setCompactStyle(element, "font-size", "16px");
        setCompactStyle(element, "line-height", "1.2");
        setCompactStyle(element, "background-color", FORM_TITLE_BACKGROUND);
        setCompactStyle(element, "display", "flex");
        setCompactStyle(element, "align-items", "center");
        setCompactStyle(element, "justify-content", "center");
        setCompactStyle(element, "text-align", "center");
      });
      form.querySelectorAll<HTMLElement>(".fsSectionText").forEach((element) => {
        setCompactStyle(element, "margin", "0");
        setCompactStyle(element, "padding", "0");
        setCompactStyle(element, "font-size", "16px");
        setCompactStyle(element, "line-height", "1.2");
        setCompactStyle(element, "display", "block");
        setCompactStyle(element, "width", "100%");
        setCompactStyle(element, "text-align", "center");
      });
      form.querySelectorAll<HTMLElement>(".fsFieldCell").forEach((element) => {
        setCompactStyle(element, "margin-bottom", "2px");
      });
      form
        .querySelectorAll<HTMLElement>(".fsRequiredLabel, .fsLabel")
        .forEach((element) => {
          setCompactStyle(element, "margin-bottom", "4px");
          setCompactStyle(element, "font-size", "14px");
          setCompactStyle(element, "line-height", "1.3");
        });
      form
        .querySelectorAll<HTMLElement>('[class*="StyledDragAndDropContainer"]')
        .forEach((element) => {
          setCompactStyle(element, "padding", "8px");
          setCompactStyle(element, "margin-bottom", "6px");
        });
      form
        .querySelectorAll<HTMLElement>('[class*="StyledContentWrapper"]')
        .forEach((element) => {
          setCompactStyle(element, "margin", "6px 0");
        });
      form
        .querySelectorAll<HTMLElement>(
          '.fsSubmitButton, button[type="submit"], input[type="submit"]',
        )
        .forEach((element) => {
          setCompactStyle(element, "background-color", FORM_TITLE_BACKGROUND);
          setCompactStyle(element, "border-color", FORM_TITLE_BACKGROUND);
        });
    };

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
        mutationObserver = new MutationObserver(() => {
          compactFormLayout();
          measureHeight();
        });
        mutationObserver.observe(document.documentElement, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true,
        });
      }

      compactFormLayout();
      document.defaultView?.addEventListener("resize", measureHeight);
      measureHeight();
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
    <div
      className="relative w-full overflow-hidden"
      style={{ height: Math.ceil(height * FORM_SCALE) }}
    >
      <iframe
        ref={iframeRef}
        title="CPP credit report upload form"
        srcDoc={FORMSTACK_FORM_DOCUMENT}
        sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        className="absolute left-0 top-0 block border-0"
        style={{
          width: `${100 / FORM_SCALE}%`,
          height,
          transform: `scale(${FORM_SCALE})`,
          transformOrigin: "top left",
        }}
        loading="lazy"
      />
    </div>
  );
}
