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

// 2. Hero dinámico con elementos flotantes (60% texto / 40% imagen)
// Variantes para la entrada escalonada del texto
const heroText = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const heroItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};
// Aparición retrasada de cada elemento flotante
const popIn = (delay: number) => ({
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  return (
    <section ref={ref} className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-5">
        {/* Columna izquierda: contenido */}
        <motion.div variants={heroText} initial="hidden" animate="show" className="lg:col-span-3">
          <motion.p variants={heroItem} className="text-xs font-semibold uppercase tracking-[0.3em] text-hero-muted">
            Issue No. 01 • Credit Partnerships
          </motion.p>
          <motion.span
            variants={heroItem}
            className="mt-5 inline-flex items-center gap-2 rounded-[20px] border border-primary bg-background px-4 py-2 text-sm font-medium text-primary"
          >
            <Star className="h-3.5 w-3.5 fill-primary" /> Exclusive Program for 680+ Credit Profiles
          </motion.span>
          <motion.h1
            variants={heroItem}
            className="mt-6 text-[2.1rem] leading-[1.1] font-bold text-foreground sm:text-5xl lg:text-[3.5rem]"
          >
            Unlock New Business Opportunities with Your <em className="text-primary">Excellent</em> Credit Profile
          </motion.h1>
          <motion.p variants={heroItem} className="mt-6 max-w-xl text-base leading-relaxed text-hero-body md:text-lg">
            <strong className="text-foreground">Where Your Credit Becomes a Real Asset.</strong> Leverage your strong
            financial history to access monthly income opportunities and available advances up to $2,500.
          </motion.p>
          <motion.div variants={heroItem} className="mt-10 flex flex-wrap items-center gap-4">
            {/* Decoración: doble flecha + línea fina */}
            <div className="hidden items-center gap-2 text-primary sm:flex">
              <span className="font-serif text-2xl leading-none">«</span>
              <span className="h-px w-14 bg-primary/50" />
            </div>
            <CtaButton glow>Start Quick Credit Verification</CtaButton>
          </motion.div>
        </motion.div>

        {/* Columna derecha: imagen + elementos flotantes */}
        <div className="relative mx-auto w-full max-w-[19rem] pt-8 sm:max-w-sm lg:col-span-2 lg:max-w-none">
          {/* Halo circular de fondo con rotación lenta */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 sm:h-[400px] sm:w-[400px]">
            <div className="h-full w-full animate-spin-slow rounded-full border border-dashed border-navy/20 bg-navy/5" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Marco verde desplazado */}
            <div className="absolute -bottom-3 -right-3 h-full w-full rounded-lg border border-primary sm:-bottom-4 sm:-right-4" />
            <motion.div style={{ y }} className="relative overflow-hidden rounded-lg shadow-lift">
              <img src={heroImg} alt="Business professional in suit and glasses" width={896} height={1120} className="aspect-[4/5] w-full object-cover" />
            </motion.div>

            {/* Flotante 1: socios verificados */}
            <motion.div {...popIn(0.5)} className="absolute -left-4 -top-5 sm:-left-8">
              <div className="flex animate-float items-center gap-3 rounded-xl bg-background px-3 py-2.5 shadow-lift sm:px-4 sm:py-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-10 sm:w-10">
                  <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold text-foreground sm:text-sm">Verified Partners</p>
                  <p className="text-[11px] text-hero-muted sm:text-xs">100% Secure</p>
                </div>
              </div>
            </motion.div>

            {/* Flotante 2: anticipos disponibles */}
            <motion.div {...popIn(0.7)} className="absolute -right-4 bottom-8 sm:-right-10">
              <div className="animate-float-reverse rounded-xl bg-navy px-4 py-3 text-navy-foreground shadow-lift sm:px-5 sm:py-4">
                <p className="font-serif text-2xl font-bold sm:text-3xl">$2,500</p>
                <p className="text-[11px] opacity-80 sm:text-xs">Available Advances</p>
              </div>
            </motion.div>

            {/* Decorativo 3: círculo con gráfico ascendente */}
            <motion.div {...popIn(0.9)} className="absolute -right-3 top-10 sm:-right-5">
              <div className="flex h-11 w-11 animate-float items-center justify-center rounded-full bg-primary text-primary-foreground shadow-cta sm:h-[60px] sm:w-[60px]">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            </motion.div>
          </motion.div>

          <p className="relative mt-8 text-center font-serif text-sm italic text-hero-muted">
            Your credit, finally working for you.
          </p>
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
