// Landing page "Magazine Editorial Premium" de Credit Partner Pro
import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Lock, ShieldCheck, Award, Star, TrendingUp } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import heroImg from "@/assets/hero-businessman.jpg";
import { CtaButton, Reveal } from "@/components/landing/shared";

// Imágenes de Unsplash para las demás secciones
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

// 2. Hero compacto con fondo dividido (55% texto / 45% panel de color), cabe en el viewport
// Variantes para la entrada escalonada del texto (0.1s entre elementos)
const heroText = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const heroItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};
// Aparición retrasada de los elementos flotantes
const popIn = (delay: number) => ({
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
});

// Cifras destacadas bajo el subtítulo
const HERO_STATS = [
  { value: "680+", label: "Credit Score" },
  { value: "680+", label: "Verified Partners" },
  { value: "$2,500", label: "Max Advance" },
];

function Hero() {
  return (
    <section className="relative overflow-hidden lg:h-[88vh] lg:min-h-[600px]">
      {/* Panel de color de la mitad derecha (solo escritorio, llega hasta el borde) */}
      <div className="absolute inset-y-0 right-0 hidden w-[45%] bg-hero-panel lg:block" />

      <div className="relative mx-auto grid h-full max-w-7xl lg:grid-cols-[55fr_45fr]">
        {/* Columna izquierda: contenido */}
        <motion.div
          variants={heroText}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-center px-5 pb-12 pt-28 md:px-8 lg:pb-8 lg:pr-12 lg:pt-24"
        >
          <motion.p variants={heroItem} className="text-[11px] font-semibold uppercase tracking-[2px] text-hero-muted">
            Issue No. 01 • Credit Partnerships
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="mt-4 text-[2.1rem] leading-[1.1] font-black text-foreground sm:text-[2.6rem] xl:text-[3.25rem]"
          >
            Unlock New Business Opportunities with Your <em className="text-primary">Excellent</em> Credit Profile
          </motion.h1>
          <motion.p variants={heroItem} className="mt-5 max-w-lg text-[15px] leading-relaxed text-hero-body md:text-base">
            <strong className="text-foreground">Where Your Credit Becomes a Real Asset.</strong> Access monthly income
            opportunities and advances up to $2,500.
          </motion.p>

          {/* Fila de estadísticas con separadores */}
          <motion.dl variants={heroItem} className="mt-7 grid max-w-md grid-cols-3 divide-x divide-border">
            {HERO_STATS.map((s) => (
              <div key={s.label} className="px-3 first:pl-0">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-serif text-2xl font-bold text-foreground md:text-[1.9rem]">{s.value}</dd>
                <dd className="mt-1 text-[10px] uppercase tracking-wider text-hero-muted md:text-[11px]">{s.label}</dd>
              </div>
            ))}
          </motion.dl>

          <motion.div variants={heroItem} className="mt-8">
            <CtaButton glow shape="square">Start Quick Credit Verification</CtaButton>
          </motion.div>
        </motion.div>

        {/* Columna derecha: imagen recortada integrada al fondo de color */}
        <div className="relative flex min-h-[420px] items-end justify-center bg-hero-panel pt-10 lg:bg-transparent lg:pt-24">
          {/* Anillos decorativos sutiles */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-[3rem] border-2 border-primary-foreground/15 lg:h-96 lg:w-96" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-[2.5rem] border-2 border-primary-foreground/10 lg:h-72 lg:w-72" />

          <motion.img
            src={heroCutout}
            alt="Business professional in suit and glasses"
            width={896}
            height={1120}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[380px] w-auto origin-bottom object-contain lg:h-[78%]"
          />

          {/* Flotante 1: tarjeta "Verified 100%" que sobresale a la derecha */}
          <motion.div {...popIn(0.6)} className="absolute right-3 top-[20%] lg:-right-5">
            <div className="flex animate-float items-center gap-3 rounded-xl bg-background px-4 py-3 shadow-lift">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <TrendingUp className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-hero-muted">Verified</p>
                <p className="font-serif text-xl font-bold text-foreground">100%</p>
              </div>
            </div>
          </motion.div>

          {/* Flotante 2: insignia circular blanca con check */}
          <motion.div {...popIn(0.8)} className="absolute bottom-[25%] left-3 lg:-left-4">
            <div className="flex h-[50px] w-[50px] animate-float-reverse items-center justify-center rounded-full bg-background text-primary shadow-lift">
              <ShieldCheck className="h-6 w-6" />
            </div>
          </motion.div>
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
