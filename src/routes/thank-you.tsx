import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/landing/shared";
import { CPP_LINKS } from "@/config/cpp-links";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [{ title: "Thank You — Credit Partner Pro" }],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-white px-5 py-16">
      <Reveal
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.05, margin: "-40px" }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-white to-white" />
        <div className="absolute -left-24 top-8 h-64 w-64 rounded-full border border-primary/10 bg-primary/[0.025]" />
        <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full border border-primary/10 bg-primary/[0.025]" />
      </Reveal>
      <Reveal
        viewport={{ once: true, amount: 0.05, margin: "-40px" }}
        className="relative z-10 w-full max-w-xl"
      >
        <section className="rounded-3xl border border-border bg-white p-8 text-center shadow-lift sm:p-12">
          <a href="/" className="inline-block">
            <img
              src="/images/credit-partner-logo.png"
              alt="Credit Partner Pro"
              className="mx-auto w-[180px] object-contain"
            />
          </a>
          <h1 className="mt-8 font-hero text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Thank You
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Thanks for doing this. The next step is a welcome call.
          </p>
          <a
            href={CPP_LINKS.welcomeCall}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-cta transition-all hover:-translate-y-0.5 hover:shadow-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Schedule your welcome call
            <ArrowRight className="h-4 w-4" />
          </a>
        </section>
      </Reveal>
    </main>
  );
}
