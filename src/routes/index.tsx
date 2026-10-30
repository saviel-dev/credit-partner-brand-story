// Landing page "Magazine Editorial Premium" de Credit Partner Pro
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Lock, ShieldCheck, Award, TrendingUp } from "lucide-react";
import { CtaButton, Reveal } from "@/components/landing/shared";

// Imágenes de Unsplash para las demás secciones
const DOCS_IMG =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1100&q=80";
const WOMAN_IMG =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80";
const HERO_FEATURES = [
  {
    Icon: ShieldCheck,
    title: "Quick Verification",
    description: "A simple review to confirm your credit profile in minutes.",
    stat: "< 24 hrs",
    statLabel: "Avg. review time",
    accent: "from-primary/80 to-primary",
  },
  {
    Icon: TrendingUp,
    title: "Monthly Opportunities",
    description: "Explore income options matched to your financial profile.",
    stat: "680+",
    statLabel: "Credit score required",
    accent: "from-emerald-400 to-emerald-600",
  },
  {
    Icon: Award,
    title: "Up to $2,500",
    description: "Access cash advances based on your eligibility and verification.",
    stat: "$2,500",
    statLabel: "Maximum advance",
    accent: "from-sky-400 to-blue-600",
  },
];

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
      <HeroFeatureCards />
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
        <img
          src="/images/credit-partner-logo.png"
          alt="Credit Partner Pro"
          className="w-[140px] object-contain md:w-[180px]"
        />
        <CtaButton
          size="sm"
          className="!rounded-full !border !border-white/80 !bg-white !px-6 !py-3 !text-sm !font-bold !text-[#087f65] !shadow-md !shadow-[#075475]/15 hover:!bg-white hover:!shadow-lg [&>svg]:h-4 [&>svg]:w-4"
        >
          Get Verified
        </CtaButton>
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
    <section className="relative overflow-hidden pt-16">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[#59c5a4] lg:block" />

      <div className="relative mx-auto grid max-w-7xl lg:min-h-[500px] lg:grid-cols-2">
        <motion.div
          variants={heroText}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-center px-5 pb-7 pt-8 md:px-8 lg:py-8 lg:pr-12"
        >
          <motion.p variants={heroItem} className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
            Credit Partner Pro
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="mt-3 max-w-xl font-hero text-[2.45rem] leading-[0.98] font-bold tracking-[-0.025em] text-foreground uppercase sm:text-5xl xl:text-[4.5rem]"
          >
            Great Credit,{" "}
            <span className="text-primary">New Opportunities.</span>
          </motion.h1>
          <motion.p variants={heroItem} className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Put your excellent credit profile to work. Explore monthly income opportunities and advances up to $2,500.
          </motion.p>

          <motion.div variants={heroItem} className="mt-5">
            <CtaButton glow shape="square">Start Quick Credit Verification</CtaButton>
          </motion.div>

          <motion.dl variants={heroItem} className="mt-6 grid max-w-md grid-cols-3 gap-3">
            {HERO_STATS.map((s, index) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="relative w-fit overflow-hidden font-heading text-xl font-extrabold text-foreground md:text-2xl">
                  <motion.span
                    aria-hidden="true"
                    initial={{ x: "-105%" }}
                    animate={{ x: "110%" }}
                    transition={{
                      duration: 0.55,
                      delay: 0.2 + index * 0.2,
                      ease: [0.65, 0, 0.35, 1],
                    }}
                    className="absolute inset-0 z-10 bg-primary"
                  />
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.65 + index * 0.2 }}
                    className="inline-block"
                  >
                    {s.value}
                  </motion.span>
                </dd>
                <dd className="mt-1 text-xs text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <div className="relative flex min-h-[290px] items-end justify-center bg-[#59c5a4] px-3 pt-6 sm:min-h-[350px] lg:min-h-0 lg:bg-transparent lg:px-0 lg:pt-8">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-[3rem] border-[12px] border-white/10 sm:h-72 sm:w-72 lg:h-[22rem] lg:w-[22rem]" />
          <motion.img
            src="/images/chica.png"
            alt="Smiling professional woman presenting credit opportunities"
            width={1024}
            height={768}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-h-[380px] w-full max-w-[560px] object-contain object-bottom lg:max-h-[440px]"
          />

          <motion.div {...popIn(0.8)} className="absolute left-3 top-[54%] sm:left-6">
            <div className="flex animate-float items-center gap-2 rounded-xl bg-white px-3 py-2.5 shadow-lift">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[11px] text-muted-foreground">Credit score</p>
                <p className="font-heading text-sm font-extrabold text-foreground">680+ verified</p>
              </div>
            </div>
          </motion.div>

          <motion.div {...popIn(1)} className="absolute right-3 top-[14%] sm:right-6">
            <div className="flex animate-float-reverse items-center gap-2 rounded-xl bg-white px-3 py-2.5 shadow-lift">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Lock className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[11px] text-muted-foreground">Privacy first</p>
                <p className="font-heading text-sm font-extrabold text-foreground">Your consent matters</p>
              </div>
            </div>
          </motion.div>

          <motion.div {...popIn(1.2)} className="absolute left-3 top-[8%] sm:left-6">
            <div className="flex animate-float items-center gap-2 rounded-xl bg-white px-3 py-2.5 shadow-lift">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Award className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[11px] text-muted-foreground">Personalized</p>
                <p className="font-heading text-sm font-extrabold text-foreground">Profile matching</p>
              </div>
            </div>
          </motion.div>

          <motion.div {...popIn(0.6)} className="absolute bottom-10 right-4 sm:right-8 lg:bottom-14 lg:right-3">
            <div className="flex animate-float-reverse items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-lift sm:px-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <TrendingUp className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">Monthly opportunities</p>
                <p className="font-heading text-base font-extrabold text-foreground">Up to $2,500</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


function HeroFeatureCards() {
  return (
    <section className="relative z-10 mx-auto -mt-1 grid max-w-7xl gap-4 px-5 pb-12 sm:grid-cols-3 md:px-8 lg:-mt-8 lg:pb-16">
      {HERO_FEATURES.map(({ Icon, title, description, stat, statLabel, accent }, index) => (
        <Reveal
          key={title}
          delay={index * 0.1}
          className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background p-6 shadow-lift transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          {/* Gradient top accent bar */}
          <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${accent}`} />
          {/* Icon — top left */}
          <div className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br p-2.5 ${accent}`}>
            <Icon className="h-5 w-5 text-white" strokeWidth={2} />
          </div>
          {/* Title */}
          <h2 className="mt-4 font-heading text-[1.15rem] font-extrabold leading-snug tracking-tight text-foreground">
            {title}
          </h2>
          {/* Description */}
          <p className="mt-2 font-sans text-[13px] leading-relaxed text-muted-foreground">{description}</p>
          {/* Divider */}
          <div className="my-4 h-px bg-border" />
          {/* Stat row */}
          <div className="flex items-baseline gap-1.5">
            <span className={`bg-gradient-to-r bg-clip-text font-heading text-2xl font-extrabold tracking-tight text-transparent ${accent}`}>
              {stat}
            </span>
            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground/60">
              {statLabel}
            </span>
          </div>
        </Reveal>
      ))}
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
            <p className="mt-2 font-heading text-4xl font-bold">up to $2,500</p>
          </div>
        </Reveal>
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">The Asset</p>
            <h2 className="mt-4 text-3xl leading-tight font-bold text-foreground md:text-5xl">
              Your Credit History Is an Underutilized Asset
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground first-letter:float-left first-letter:mr-2 first-letter:font-heading first-letter:text-6xl first-letter:leading-none first-letter:text-foreground">
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
              <span className="pointer-events-none absolute -right-2 -top-6 font-heading text-[9rem] leading-none font-bold text-ghost-number">
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
          <img src="/images/credit-partner-logo.png" alt="Credit Partner Pro" className="w-[200px] object-contain" />
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
