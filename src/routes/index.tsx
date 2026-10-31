// Landing page "Magazine Editorial Premium" de Credit Partner Pro
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Lock, ShieldCheck, Award, TrendingUp, Sparkles, CheckCircle2, Shield, Phone, Mail, Building2 } from "lucide-react";
import heroPresenter from "@/assets/hero-presenter.png";
import creditMatchingIllustration from "@/assets/credit-matching-illustration.svg";
import ctaProfessional from "@/assets/cta-professional.jpg";
import { CALENDLY_URL, CtaButton, Reveal } from "@/components/landing/shared";

// Imágenes de Unsplash para las demás secciones
const DOCS_IMG =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1100&q=80";
const HERO_FEATURES = [
  {
    Icon: ShieldCheck,
    title: "Quick Credit Verification",
    description: "Submit the required information so your credit tier and eligibility can be reviewed.",
    stat: "Step 02",
    statLabel: "Verification process",
    accent: "from-primary/80 to-primary",
  },
  {
    Icon: TrendingUp,
    title: "Monthly Opportunities",
    description: "Explore potential monthly income opportunities through the Credit Partner Matching Program.",
    stat: "680+",
    statLabel: "Minimum credit score",
    accent: "from-emerald-400 to-emerald-600",
  },
  {
    Icon: Award,
    title: "Up to $2,500",
    description: "Eligible participants may access advances up to $2,500, subject to approval and program terms.",
    stat: "$2,500",
    statLabel: "Maximum, if approved",
    accent: "from-sky-400 to-blue-600",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Credit Partner Pro — Credit Partner Matching Program" },
      {
        name: "description",
        content:
          "Explore the Credit Partner Matching Program for established professionals. Eligibility, opportunities, and advances up to $2,500 are subject to review and program terms.",
      },
      { property: "og:title", content: "Credit Partner Pro — Credit Partner Matching Program" },
      {
        property: "og:description",
        content: "Learn about eligibility, potential monthly income opportunities, and advances up to $2,500, subject to approval and program terms.",
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
      <div aria-hidden="true" className="page-entry-blur pointer-events-none fixed inset-0 z-[100]" />
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
        scrolled ? "border-b bg-background/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <a href="/" className="inline-block transition-transform hover:opacity-95">
          <img
            src="/images/credit-partner-logo.png"
            alt="Credit Partner Pro"
            className="w-[140px] object-contain md:w-[180px]"
          />
        </a>
        <CtaButton
          size="sm"
          glow={scrolled}
          className={`!rounded-full !border !px-6 !py-2.5 !text-sm !font-bold transition-all duration-300 [&>svg]:h-4 [&>svg]:w-4 ${
            scrolled
              ? "!border-primary !bg-primary !text-white shadow-cta hover:!bg-primary/90 [&>svg]:!text-white"
              : "!border-white/90 !bg-white !text-primary shadow-md hover:!bg-white/95 [&>svg]:!text-primary"
          }`}
        >
          Book Intro Call
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
const advanceCardReveal = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.15, staggerChildren: 0.12 },
  },
};
const advanceCardItem = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Cifras destacadas bajo el subtítulo
const HERO_STATS = [
  { value: "680+", label: "Minimum Credit Score" },
  { value: "3 steps", label: "Review Process" },
  { value: "$2,500", label: "Maximum, If Approved" },
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
          <motion.h1
            variants={heroItem}
            className="max-w-[606px] font-hero text-[2.35rem] leading-[1.02] font-bold tracking-[-0.025em] text-foreground uppercase sm:text-5xl lg:text-[3.25rem] xl:text-[3.25rem]"
          >
            <span className="lg:block lg:whitespace-nowrap">Unlock New Business</span>{" "}
            <span className="lg:block lg:whitespace-nowrap">Opportunities with Your</span>{" "}
            <span className="text-primary lg:block lg:whitespace-nowrap">Excellent Credit Profile</span>
          </motion.h1>
          <motion.p variants={heroItem} className="mt-4 max-w-lg font-heading text-sm font-bold leading-relaxed text-foreground md:text-base">
            The exclusive Credit Partner Matching Program for established professionals.
          </motion.p>
          <motion.p variants={heroItem} className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Leverage your strong financial history to explore potential monthly income opportunities and available advances up to $2,500, subject to eligibility and approval.
          </motion.p>

          <motion.div variants={heroItem} className="mt-5">
            <CtaButton glow shape="square">Schedule an Intro Call</CtaButton>
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
            src={heroPresenter}
            alt="Smiling professional man presenting credit opportunities"
            width={1024}
            height={768}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-h-[380px] w-full max-w-[560px] object-contain object-bottom lg:max-h-[440px]"
          />

          <motion.div {...popIn(0.8)} className="absolute left-3 top-[46%] sm:left-6">
            <div className="flex animate-float items-center gap-2 rounded-xl bg-white px-3 py-2.5 shadow-lift">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[11px] text-muted-foreground">Credit score</p>
                <p className="font-heading text-sm font-extrabold text-foreground">680+ profile</p>
              </div>
            </div>
          </motion.div>
          <motion.div {...popIn(1.2)} className="absolute left-6 top-[8%] sm:left-9">
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

          <motion.div {...popIn(0.6)} className="absolute bottom-14 right-4 sm:right-8 lg:bottom-18 lg:right-3">
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


const heroCardsVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const heroCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function HeroFeatureCards() {
  return (
    <motion.section
      variants={heroCardsVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 mx-auto mt-5 grid max-w-7xl gap-4 px-5 pb-12 sm:grid-cols-3 md:px-8 lg:mt-0 lg:pb-16"
    >
      {HERO_FEATURES.map(({ Icon, title, description, stat, statLabel, accent }) => (
        <motion.div
          key={title}
          variants={heroCardVariants}
          className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background p-6 shadow-lift transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          {/* Gradient top accent bar */}
          <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${accent}`} />
          <div className="flex items-center gap-3">
            <div className={`inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br p-2.5 ${accent}`}>
              <Icon className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <h2 className="font-heading text-[1.15rem] font-extrabold leading-snug tracking-tight text-foreground">
              {title}
            </h2>
          </div>
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
        </motion.div>
      ))}
    </motion.section>
  );
}
// 3. Sección editorial: el crédito como activo (animación de entrada al scroll)
const assetContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const assetItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function AssetSection() {
  return (
    <section id="the-asset" className="relative overflow-hidden border-t bg-gradient-to-b from-muted/60 via-muted to-muted/30 py-12 md:py-16">
      {/* Decoración de fondo ambiental sutil */}
      <div className="pointer-events-none absolute -left-48 top-1/3 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-48 bottom-10 h-96 w-96 rounded-full bg-navy/5 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-12 lg:gap-12">
        {/* Columna izquierda: Imagen enmarcada con tarjeta flotante (solo entrada al hacer scroll) */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-6"
        >
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            {/* Halo sutil detrás de la imagen */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-primary/20 via-transparent to-navy/15 blur-2xl opacity-60" />

            {/* Contenedor de imagen moderno */}
            <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-background shadow-2xl">
              <img
                src={DOCS_IMG}
                alt="Person reviewing financial documents and credit assets"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
            </div>

            {/* Tarjeta flotante con animación de entrada sincronizada */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-6 right-2 max-w-[17rem] overflow-hidden rounded-2xl border border-border/70 bg-white p-5 text-foreground shadow-2xl transition-transform duration-300 hover:-translate-y-1 sm:-bottom-8 sm:-right-6 sm:p-6"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-primary to-emerald-400" />
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                </span>
                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Access Advances
                </p>
              </div>
              <p className="mt-2.5 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Up to <span className="text-primary">$2,500</span>
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Advances up to $2,500 may be available to eligible profiles, subject to approval and program terms.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Columna derecha: Animación de entrada escalonada al punto de scroll */}
        <motion.div
          variants={assetContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="lg:col-span-6 lg:pl-4"
        >
          <motion.div variants={assetItemVariants}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>The Asset</span>
            </div>
          </motion.div>

          <motion.h2
            variants={assetItemVariants}
            className="mt-3 font-hero text-3xl font-bold leading-[1.08] tracking-tight text-foreground uppercase sm:text-4xl"
          >
            Your Credit History Is an <span className="text-primary italic">Underutilized Asset</span>
          </motion.h2>

          <motion.p
            variants={assetItemVariants}
            className="mt-4 font-sans text-base leading-relaxed text-muted-foreground"
          >
            You spent years building and maintaining an excellent credit history. But right now, what is that credit
            doing for you? The Credit Partner Matching Program connects established professionals with business
            operators seeking strategic partnerships.
          </motion.p>

          <motion.p
            variants={assetItemVariants}
            className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground/90 sm:text-base"
          >
            Eligible profiles may be considered for partnership opportunities and available advances. Participation,
            eligibility, and outcomes vary; approval does not guarantee income or a specific financial result.
          </motion.p>

          {/* 2 Micro tarjetas de valor destacado */}
          <motion.div variants={assetItemVariants} className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/90 p-3.5 shadow-sm">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ShieldCheck className="h-4 w-4" strokeWidth={2} />
              </div>
              <div>
                <p className="font-heading text-sm font-bold text-foreground">Eligibility Review</p>
                <p className="text-xs text-muted-foreground">Your profile is reviewed against program requirements.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/90 p-3.5 shadow-sm">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <TrendingUp className="h-4 w-4" strokeWidth={2} />
              </div>
              <div>
                <p className="font-heading text-sm font-bold text-foreground">Potential Opportunities</p>
                <p className="text-xs text-muted-foreground">Availability and outcomes depend on approval and terms.</p>
              </div>
            </div>
          </motion.div>

          {/* Botón y micro prueba social */}
          <motion.div variants={assetItemVariants} className="mt-5 flex flex-wrap items-center gap-4">
            <CtaButton size="sm" glow>
              Schedule an Intro Call
            </CtaButton>
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Review eligibility and program terms before participating
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// 4. Proceso en 3 pasos con número grande de fondo
// 4. Proceso en 3 pasos: diseño renovado con tipografía moderna y tarjetas estructuradas
const STEPS = [
  {
    n: "01",
    t: "Initial Qualification",
    d: "Confirm whether you maintain an established credit profile that meets the program requirements.",
    Icon: CheckCircle2,
    badge: "Introductory call",
    accent: "from-primary/80 to-primary",
  },
  {
    n: "02",
    t: "Quick Credit Verification",
    d: "Submit the required documentation to validate your credit tier and eligibility.",
    Icon: ShieldCheck,
    badge: "Documentation review",
    accent: "from-emerald-400 to-emerald-600",
  },
  {
    n: "03",
    t: "Strategic Matching",
    d: "If approved, your profile may be paired with established business operators to explore potential monthly income opportunities and available advances up to $2,500.",
    Icon: TrendingUp,
    badge: "Subject to approval",
    accent: "from-sky-400 to-blue-600",
  },
];

const processSectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.14,
    },
  },
};

const processItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function ProcessSection() {
  return (
    <section id="process" className="relative overflow-hidden border-t bg-[#F5FAF8] py-12 md:py-16">
      <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-primary/[0.06] blur-3xl" />

      <motion.div
        variants={processSectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05, margin: "-40px" }}
        className="relative mx-auto max-w-7xl px-5 md:px-8"
      >
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
          <div>
            <motion.div variants={processItemVariants}>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                <span>The Process</span>
              </div>

              <h2 className="mt-3 max-w-2xl font-hero text-3xl font-bold uppercase leading-[1.08] tracking-tight text-foreground sm:text-4xl">
                How the Credit Partner <span className="text-primary">Matching Program Works</span>
              </h2>

              <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
                A three-step process to review your credit profile, validate eligibility, and explore potential partnership matches. Opportunities and advances are subject to approval and program terms.
              </p>
            </motion.div>

            <div className="mt-6 space-y-3">
              {STEPS.map((s) => {
                const Icon = s.Icon;
                return (
                  <motion.div
                    key={s.n}
                    variants={processItemVariants}
                    className="group flex gap-4 rounded-2xl border border-border/70 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-5"
                  >
                    <div className="flex shrink-0 flex-col items-center gap-2">
                      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.accent} shadow-sm`}>
                        <Icon className="h-5 w-5 text-white" strokeWidth={2} />
                      </div>
                      <span className="font-heading text-[10px] font-bold tracking-[0.16em] text-muted-foreground">
                        {s.n}
                      </span>
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="font-heading text-base font-extrabold leading-snug tracking-tight text-foreground sm:text-lg">
                        {s.t}
                      </h3>
                      <p className="mt-1 font-sans text-[13px] leading-relaxed text-muted-foreground">
                        {s.d}
                      </p>
                      <span className="mt-2 inline-block font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                        {s.badge}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={processItemVariants} className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
              <CtaButton size="sm" glow>
                Schedule an Intro Call
              </CtaButton>
              <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                Review eligibility and program terms
              </span>
            </motion.div>
          </div>

          <motion.div
            variants={processItemVariants}
            className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />
            <img
              src={creditMatchingIllustration}
              alt="Illustration of a credit profile being reviewed and matched with a potential business partner"
              className="relative w-full rounded-[1.75rem] shadow-xl"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 rounded-xl border border-white/80 bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:bottom-6 sm:left-6">
              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Credit profile review</p>
              <p className="mt-1 font-heading text-sm font-extrabold text-foreground">Eligibility comes first</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
// 5. Confianza y seguridad: tarjetas institucionales elevadas con tipografías coherentes
// 5. Confianza y seguridad: estética avanzada con objetos animados y certificación en vivo
const TRUST = [
  {
    Icon: Lock,
    tag: "Data Security Standards",
    t: "Information Security",
    d: "The program states that it follows data security standards. Review the applicable terms to understand how submitted information is handled.",
    badge: "Review safeguards",
    techTag: "Program terms",
    accent: "from-primary/80 to-primary",
  },
  {
    Icon: ShieldCheck,
    tag: "Privacy Practices",
    t: "Privacy & Consent",
    d: "Review the privacy terms to learn how your information may be used or shared during eligibility review.",
    badge: "See privacy terms",
    techTag: "Privacy policy",
    accent: "from-emerald-400 to-emerald-600",
  },
  {
    Icon: Award,
    tag: "Program Disclosures",
    t: "Terms & Eligibility",
    d: "Review eligibility requirements, available opportunities, and applicable financial and credit risks before participating.",
    badge: "Terms apply",
    techTag: "Disclosures",
    accent: "from-sky-400 to-blue-600",
  },
];

function TrustSection() {
  return (
    <section className="relative overflow-hidden border-t bg-gradient-to-b from-muted/50 via-muted to-muted/20 py-24 md:py-32">
      {/* Objetos animados de fondo: Anillos concéntricos giratorios tipo radar de seguridad */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/[0.07] animate-spin-slow" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary/[0.08] animate-spin-slow"
        style={{ animationDirection: "reverse", animationDuration: "90s" }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.03] blur-3xl animate-pulse" />

      {/* Halos de luz ambiental laterales */}
      <div className="pointer-events-none absolute -left-48 top-1/3 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-48 bottom-1/3 h-96 w-96 rounded-full bg-navy/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        {/* Encabezado con widgets flotantes animados en los laterales */}
        <div className="relative mx-auto max-w-3xl text-center">
          {/* Widget flotante animado izquierda */}
          <div className="hidden xl:flex animate-float absolute -top-4 -left-20 items-center gap-2.5 rounded-2xl border border-primary/20 bg-background/95 px-3.5 py-2 shadow-lift backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
            </span>
            <div className="text-left">
              <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/70">Program Details</p>
              <p className="font-heading text-xs font-extrabold text-foreground">Review eligibility</p>
            </div>
          </div>

          {/* Widget flotante animado derecha */}
          <div className="hidden xl:flex animate-float-reverse absolute -top-4 -right-20 items-center gap-2.5 rounded-2xl border border-primary/20 bg-background/95 px-3.5 py-2 shadow-lift backdrop-blur-md">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Shield className="h-3.5 w-3.5" />
            </div>
            <div className="text-left">
              <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/70">Privacy Details</p>
              <p className="font-heading text-xs font-extrabold text-foreground">Read privacy terms</p>
            </div>
          </div>

          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <Lock className="h-3.5 w-3.5" />
              <span>Security & Privacy</span>
            </div>

            <h2 className="mt-4 font-hero text-3xl font-bold uppercase leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Program Terms <span className="text-primary">& Privacy</span>
            </h2>

            <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
              The program is governed by contractual protections and data security standards. Review the applicable terms and privacy disclosures to understand how information is handled and what participation involves.
            </p>
          </Reveal>
        </div>

        {/* Tarjetas con objetos animados integrados */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TRUST.map(({ Icon, tag, t, d, badge, techTag, accent }, i) => (
            <Reveal
              key={t}
              delay={i * 0.12}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-background p-6 shadow-lift transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-8"
            >
              {/* Barra superior de acento degradado */}
              <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${accent}`} />

              {/* Objeto animado en filigrana en el fondo de cada tarjeta */}
              <Icon
                className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 text-foreground/[0.03] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:text-primary/[0.08]"
                strokeWidth={0.9}
              />

              <div className="relative">
                {/* Encabezado de la tarjeta y etiqueta informativa */}
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-gradient-to-br from-primary/15 to-primary/5 text-primary shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-border/80 bg-muted/80 px-3 py-1">
                    <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {badge}
                    </span>
                  </div>
                </div>

                {/* Título en tipografía font-heading extrabold */}
                <h3 className="mt-5 font-heading text-lg font-extrabold leading-snug tracking-tight text-foreground">
                  {t}
                </h3>

                {/* Descripción */}
                <p className="mt-2.5 font-sans text-sm leading-relaxed text-muted-foreground">
                  {d}
                </p>
              </div>

              {/* Pie de tarjeta con micro-etiquetas técnicas */}
              <div className="relative mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                <span className="font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                  {tag}
                </span>
                <span className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] font-medium text-muted-foreground/75">
                  {techTag}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Recordatorio para revisar condiciones antes de participar */}
        <Reveal delay={0.25} className="mt-12 overflow-hidden rounded-2xl border border-border/70 bg-background/80 p-5 shadow-sm backdrop-blur-md">
          <div className="mb-4 flex items-center justify-center gap-2 text-center">
            <span className="font-heading text-xs font-extrabold uppercase tracking-widest text-emerald-700">
              Review program disclosures before participating
            </span>
          </div>

          {/* 4 chips con efecto hover */}
          <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-muted-foreground sm:grid-cols-4">
            <div className="flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-muted/40 p-2.5 transition-all duration-300 hover:border-primary/40 hover:bg-background">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
              <span>Eligibility requirements apply</span>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-muted/40 p-2.5 transition-all duration-300 hover:border-primary/40 hover:bg-background">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
              <span>Opportunities are not guaranteed</span>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-muted/40 p-2.5 transition-all duration-300 hover:border-primary/40 hover:bg-background">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
              <span>Review privacy terms</span>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-muted/40 p-2.5 transition-all duration-300 hover:border-primary/40 hover:bg-background">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
              <span>Advances subject to approval</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
// 6. CTA final con UI mejorada, tema blanco y tipografía institucional del sitio
function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-border/60 bg-white py-20 md:py-28 lg:py-32">
      {/* Halos de luz ambiental sutiles para tema blanco */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-primary/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full bg-emerald-500/[0.04] blur-3xl" />
      
      {/* Anillos concéntricos decorativos sutiles */}
      <div className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full border border-primary/[0.06] -z-0 hidden md:block" />
      <div className="pointer-events-none absolute right-24 top-1/2 -translate-y-1/2 h-[380px] w-[380px] rounded-full border border-dashed border-primary/[0.07] -z-0 hidden md:block" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
        {/* Columna Izquierda: Mensaje, tipografía editorial y llamada a la acción */}
        <Reveal className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Your Next Chapter</span>
          </div>

          <h2 className="mt-4 font-hero text-3xl font-bold uppercase leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Ready to Put Your <span className="text-primary">Credit to Work?</span>
          </h2>

          <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
            Connect with vetted business opportunities through our specialized matching program. Take the first step to see if your strong credit profile qualifies for strategic partnerships and advances up to $2,500.
          </p>

          {/* Micro-beneficios con tipografía font-heading / font-sans */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
              <span className="font-sans text-sm text-foreground/90">
                <strong className="font-heading font-bold text-foreground">Fast pre-qualification</strong> with zero upfront program fees
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
              <span className="font-sans text-sm text-foreground/90">
                <strong className="font-heading font-bold text-foreground">Up to $2,500 advance</strong> available for eligible qualified profiles
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
              <span className="font-sans text-sm text-foreground/90">
                <strong className="font-heading font-bold text-foreground">Strict confidentiality</strong> and bank-level data safeguards
              </span>
            </div>
          </div>

          {/* Botón CTA principal */}
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <CtaButton glow size="lg">
              Start Quick Credit Verification
            </CtaButton>
          </div>

          {/* Micro-aviso de confianza */}
          <div className="mt-4 flex items-center gap-2 font-sans text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
            <span>Subject to review and approval. Verification takes less than 3 minutes.</span>
          </div>
        </Reveal>

        {/* Columna Derecha: Tarjeta de imagen profesional con elementos flotantes interactivos */}
        <Reveal delay={0.15} className="flex justify-center lg:col-span-5">
          <div className="relative mx-auto flex w-full max-w-[340px] items-center justify-center sm:max-w-[380px]">
            {/* Fondo de resplandor sutil detrás del marco */}
            <div className="pointer-events-none absolute -inset-3 -rotate-2 rounded-[2.5rem] bg-gradient-to-tr from-primary/15 via-primary/5 to-transparent -z-10" />

            {/* Contenedor de la fotografía en marco blanco premium */}
            <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-white p-2.5 shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
              <img
                src={ctaProfessional}
                alt="Smiling executive gentleman presenting credit partner opportunities"
                className="aspect-[4/5] w-full rounded-2xl object-cover object-center"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Tarjeta flotante superior izquierda */}
            <div className="animate-float absolute -top-4 -left-4 sm:-left-6 rounded-2xl border border-border/80 bg-white/95 p-3 shadow-lift backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-heading text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Credit Tier
                  </p>
                  <p className="font-heading text-sm font-extrabold text-foreground">
                    680+ Recommended
                  </p>
                </div>
              </div>
            </div>

            {/* Tarjeta flotante inferior derecha */}
            <div className="animate-float-reverse absolute -bottom-5 -right-3 sm:-right-5 max-w-[210px] rounded-2xl border border-border/80 bg-white/95 p-3.5 shadow-lift backdrop-blur-md">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                </span>
                <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Matching Program
                </p>
              </div>
              <p className="mt-1 font-heading text-base font-extrabold text-foreground">
                Advances Up to <span className="text-primary">$2,500</span>
              </p>
              <p className="font-sans text-[10px] text-muted-foreground">
                Subject to eligibility & approval
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
// 7. Footer exacto según el diseño solicitado
function Footer() {
  return (
    <footer className="border-t border-border/80 bg-white pt-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 pb-14 md:grid-cols-12 lg:gap-16">
          {/* Columna 1: Logo y propósito */}
          <div className="md:col-span-5 lg:col-span-4">
            <a href="/" className="inline-block transition-transform hover:opacity-95">
              <img
                src="/images/credit-partner-logo.png"
                alt="Credit PartnerPro - Where Your Credit Becomes a Real Asset"
                className="w-[190px] object-contain"
              />
            </a>
            <p className="mt-5 max-w-sm font-sans text-sm leading-relaxed text-muted-foreground">
              We connect established professionals with business operators to explore potential partnership opportunities. Eligibility and outcomes vary by participant.
            </p>
          </div>

          {/* Columna 2: Useful Links (2 subcolumnas) */}
          <div className="md:col-span-7 lg:col-span-4">
            <h4 className="font-heading text-sm font-extrabold uppercase tracking-wider text-[#055475]">
              USEFUL LINKS
            </h4>
            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 font-sans text-sm font-medium text-muted-foreground">
              <div className="flex flex-col space-y-3">
                <a href="/" className="transition-colors hover:text-primary">
                  Home
                </a>
                <a href="#process" className="transition-colors hover:text-primary">
                  How It Works
                </a>
                <a href="#the-asset" className="transition-colors hover:text-primary">
                  What You Get
                </a>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  Schedule an Intro Call
                </a>
                <a href="#disclosures" className="transition-colors hover:text-primary">
                  Program Risk Disclosure
                </a>
              </div>
              <div className="flex flex-col space-y-3">
                <a href="mailto:Support@CreditPartnerPro.com" className="transition-colors hover:text-primary">
                  Support
                </a>
                <a href="#disclosures" className="transition-colors hover:text-primary">
                  FTC Disclosures
                </a>
                <a href="mailto:Support@CreditPartnerPro.com?subject=Request%20for%20Privacy%20Policy" className="transition-colors hover:text-primary">
                  Request Privacy Policy
                </a>
                <a href="mailto:Support@CreditPartnerPro.com?subject=Dispute%20Resolution%20Question" className="transition-colors hover:text-primary">
                  Ask About Dispute Resolution
                </a>
                <a href="mailto:Support@CreditPartnerPro.com?subject=Request%20for%20Program%20Terms" className="transition-colors hover:text-primary">
                  Request Program Terms
                </a>
              </div>
            </div>
          </div>

          {/* Columna 3: Contact Us */}
          <div className="md:col-span-12 lg:col-span-4">
            <h4 className="font-heading text-sm font-extrabold uppercase tracking-wider text-[#055475]">
              CONTACT US
            </h4>
            <ul className="mt-5 space-y-3.5 font-sans text-sm font-medium text-muted-foreground">
              <li>
                <a href="tel:+17203102748" className="flex items-center gap-3 transition-colors hover:text-primary">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <span>(720) 310-2748</span>
                </a>
              </li>
              <li>
                <a href="mailto:Support@CreditPartnerPro.com" className="flex items-center gap-3 transition-colors hover:text-primary">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <span>Support@CreditPartnerPro.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  5500 Greenwood Plaza Blvd, Suite 130<br />
                  Greenwood Village, CO 80111
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div
          id="disclosures"
          className="mb-6 border-l-4 border-rose-500 bg-rose-50 px-5 py-4 text-sm leading-relaxed text-rose-950"
        >
          <strong>FTC Legal Disclaimer:</strong> Participation involves financial and credit risk. Earnings and results
          vary significantly and may be zero. Past performance or credit excellence does not guarantee specific
          financial outcomes. Review all program terms before participating.
        </div>

        {/* Declaración de cumplimiento y due diligence */}
        <div className="border-t border-border/60 py-6 text-center font-sans text-xs text-muted-foreground">
          <a href="#disclosures" className="transition-colors hover:text-foreground">
            Program Risk Disclosure
          </a>
          <span className="mx-2 text-border">|</span>
          <a href="mailto:Support@CreditPartnerPro.com?subject=Request%20for%20Company%20Information" className="transition-colors hover:text-foreground">
            Request company information
          </a>
        </div>
      </div>

      {/* Barra inferior de copyright */}
      <div className="border-t border-border/50 bg-[#edf3f6] py-4 text-center font-sans text-xs text-muted-foreground">
        <p>Copyright © {new Date().getFullYear()} CreditPartnerPro.com. All rights reserved.</p>
      </div>
    </footer>
  );
}
