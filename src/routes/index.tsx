// Landing page "Magazine Editorial Premium" de Credit Partner Pro
import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Lock, ShieldCheck, Award } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { CtaButton, Reveal } from "@/components/landing/shared";

// Imágenes de Unsplash
const HERO_IMG =
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80";
const DOCS_IMG =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1100&q=80";
const WOMAN_IMG =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Credit Partner Pro — Put Your Excellent Credit to Work" },
      {
        name: "description",
        content:
          "Exclusive program for 680+ credit profiles. Access monthly income opportunities and advances up to $2,500.",
      },
      { property: "og:title", content: "Credit Partner Pro — Put Your Excellent Credit to Work" },
      {
        property: "og:description",
        content: "Exclusive program for 680+ credit profiles. Start your Quick Credit Verification.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: HERO_IMG },
      { name: "twitter:image", content: HERO_IMG },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navbar />
      <Hero />
      <AssetSection />
      <ProcessSection />
      <TrustSection />
      <FinalCta />
      <Footer />
    </div>
  );
}

// 1. Navbar fija con efecto glassmorphism al hacer scroll
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b bg-background/75 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <img src={logo.url} alt="Credit Partner Pro" className="h-9 w-auto md:h-11" />
        <CtaButton size="sm">Get Verified</CtaButton>
      </div>
    </header>
  );
}

// 2. Hero estilo portada de revista con parallax en la imagen
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  return (
    <section ref={ref} className="relative pb-20 pt-28 md:pb-28 md:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Issue No. 01 • Credit Partnerships
            </p>
            <div className="mt-6 h-px w-24 bg-foreground/20" />
            <span className="mt-6 inline-block rounded-full border border-primary bg-background px-4 py-1.5 text-sm font-medium text-primary">
              Exclusive Program for 680+ Credit Profiles
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-4xl leading-[1.08] font-bold text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
              Unlock New Business Opportunities with Your <em className="text-primary">Excellent</em> Credit Profile
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Where Your Credit Becomes a Real Asset.</strong> Leverage your strong
              financial history to access monthly income opportunities and available advances up to $2,500.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center gap-4">
            {/* Elemento decorativo: línea fina con doble flecha */}
            <div className="hidden items-center gap-2 text-primary sm:flex">
              <span className="h-px w-16 bg-primary/50" />
              <span className="font-serif text-2xl">«</span>
            </div>
            <CtaButton>Start Quick Credit Verification</CtaButton>
          </Reveal>
        </div>
        <div className="relative lg:col-span-5">
          <Reveal delay={0.2} className="relative mx-auto max-w-md">
            {/* Marco desplazado estilo revista */}
            <div className="absolute -right-4 -top-4 h-full w-full border border-primary/60" />
            <motion.div style={{ y }} className="relative overflow-hidden bg-muted shadow-lift">
              <img src={HERO_IMG} alt="Business professional in suit" className="aspect-[4/5] w-full object-cover" />
            </motion.div>
            <p className="mt-6 text-right font-serif text-sm italic text-muted-foreground">
              "Your credit, finally working for you."
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// 3. Sección editorial: el crédito como activo
function AssetSection() {
  return (
    <section className="border-t bg-muted py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-12">
        <Reveal className="relative lg:col-span-6">
          <img src={DOCS_IMG} alt="Person reviewing financial documents" className="aspect-[5/4] w-full object-cover" loading="lazy" />
          {/* Tarjeta flotante superpuesta */}
          <div className="absolute -bottom-8 right-4 max-w-[15rem] bg-navy p-6 text-navy-foreground shadow-lift transition-transform duration-300 hover:-translate-y-1 md:-right-8">
            <p className="text-xs uppercase tracking-[0.2em] opacity-75">Access advances</p>
            <p className="mt-2 font-serif text-4xl font-bold">up to $2,500</p>
          </div>
        </Reveal>
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">The Asset</p>
            <h2 className="mt-4 text-3xl leading-tight font-bold text-foreground md:text-5xl">
              Your Credit History Is an Underutilized Asset
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-6xl first-letter:leading-none first-letter:text-foreground">
              You spent years building and maintaining an excellent credit history. But right now, what is that credit
              actually doing for you? Traditional financial systems only reward you when you borrow. It is time to
              change the equation.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// 4. Proceso en 3 pasos con número grande de fondo
const STEPS = [
  { n: "01", t: "Initial Qualification", d: "Confirm your profile meets the 680+ credit threshold in a short introductory call." },
  { n: "02", t: "Quick Credit Verification (QCV)", d: "A fast, secure review of your credit standing to validate eligibility." },
  { n: "03", t: "Strategic Matching", d: "We match your profile with the partnership opportunity that fits you best." },
];

function ProcessSection() {
  return (
    <section className="border-t py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">The Process</p>
          <h2 className="mt-4 text-3xl leading-tight font-bold text-foreground md:text-5xl">
            How the Credit Partner Matching Program Works
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-px bg-border md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12} className="group relative overflow-hidden bg-background p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift md:p-10">
              <span className="pointer-events-none absolute -right-2 -top-6 font-serif text-[9rem] leading-none font-bold text-ghost-number">
                {s.n}
              </span>
              <div className="relative">
                <span className="text-sm font-semibold text-primary">Step {s.n}</span>
                <h3 className="mt-3 text-2xl font-bold text-foreground">{s.t}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// 5. Confianza y seguridad con iconos de entrada escalonada
const TRUST = [
  { Icon: Lock, t: "Encrypted Data", d: "Your information is protected with bank-level encryption." },
  { Icon: ShieldCheck, t: "Privacy First", d: "We never share your data without your explicit consent." },
  { Icon: Award, t: "Compliance Standards", d: "Our process follows strict regulatory guidelines." },
];

function TrustSection() {
  return (
    <section className="border-t bg-muted py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
        <Reveal>
          <h2 className="text-3xl font-bold text-foreground md:text-5xl">Strict Compliance & Security</h2>
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {TRUST.map(({ Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 0.15} className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-background text-primary transition-transform duration-300 hover:scale-110">
                <Icon className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 text-xl font-bold text-foreground">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// 6. CTA final de alto impacto
function FinalCta() {
  return (
    <section className="bg-navy py-20 text-navy-foreground md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] opacity-70">Your Next Chapter</p>
          <h2 className="mt-4 text-4xl leading-tight font-bold md:text-6xl">Ready to Put Your Credit to Work?</h2>
          <div className="mt-10">
            <CtaButton>Start Quick Credit Verification</CtaButton>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="flex justify-center">
          <div className="rounded-[50%] border border-navy-foreground/30 p-3">
            <img src={WOMAN_IMG} alt="Smiling professional woman" className="aspect-[3/4] w-64 rounded-[50%] object-cover md:w-80" loading="lazy" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// 7. Footer con logo, aviso legal FTC y enlaces
function Footer() {
  return (
    <footer className="border-t bg-background py-12">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <img src={logo.url} alt="Credit Partner Pro" className="h-10 w-auto" />
          <nav className="flex gap-6 text-sm text-foreground">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms</a>
          </nav>
        </div>
        <p className="mt-8 max-w-4xl text-xs leading-relaxed text-muted-foreground">
          Disclaimer: Credit Partner Pro is not a lender and does not guarantee approval, income, or specific results.
          Advance amounts and opportunities depend on individual eligibility and verification. Results vary. This
          communication complies with FTC guidelines on truthful advertising.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">© {new Date().getFullYear()} Credit Partner Pro. All rights reserved.</p>
      </div>
    </footer>
  );
}
