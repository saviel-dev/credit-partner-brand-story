import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CPP_LINKS } from "@/config/cpp-links";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [{ title: "Thank You — Credit Partner Pro" }],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-16">
      <section className="w-full max-w-xl rounded-3xl border border-border bg-white p-8 text-center shadow-lift sm:p-12">
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
    </main>
  );
}
