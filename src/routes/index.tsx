// Landing page "Magazine Editorial Premium" de Credit Partner Pro
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Award,
  ArrowUp,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  FileText,
  Info,
  Lock,
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import heroPresenter from "@/assets/hero-presenter.png";
import creditMatchingIllustration from "@/assets/credit-matching-illustration.svg";
import ctaProfessional from "@/assets/cta-professional.jpg";
import footerLogo from "@/assets/logo blanco.png";
import { FormstackEmbed } from "@/components/landing/formstack-embed";
import { CALENDLY_URL, CtaButton, Reveal } from "@/components/landing/shared";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CPP_COPY } from "@/config/cpp-copy";
import { CPP_LINKS } from "@/config/cpp-links";

// Imágenes de Unsplash para las demás secciones
const DOCS_IMG =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1100&q=80";
const HERO_FEATURES = [
  {
    Icon: ShieldCheck,
    ...CPP_COPY.benefits.highlights[0],
    description: `${CPP_COPY.benefits.highlights[0].description} ${CPP_COPY.hero.riskDisclosure}`,
    stat: "Monthly",
    statLabel: "Income opportunity",
    accent: "from-primary/80 to-primary",
  },
  {
    Icon: TrendingUp,
    ...CPP_COPY.benefits.highlights[1],
    description: `${CPP_COPY.benefits.highlights[1].description} ${CPP_COPY.hero.riskDisclosure}`,
    stat: "$2,500",
    statLabel: "Available advances",
    accent: "from-primary/80 to-primary",
  },
  {
    Icon: Award,
    ...CPP_COPY.benefits.highlights[2],
    stat: "Formal",
    statLabel: "Legal agreements",
    accent: "from-navy/80 to-navy",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Credit Partner Pro — Credit Partner Matching Program" },
      {
        name: "description",
        content: CPP_COPY.hero.subheadline,
      },
      { property: "og:title", content: "Credit Partner Pro — Credit Partner Matching Program" },
      {
        property: "og:description",
        content: CPP_COPY.hero.subheadline,
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
      <SignupFormSection />
      <ServiceAgreementSection />
      <TrustSection />
      <FinalCta />
      <Footer />
      <BackToTopButton />
      <div
        aria-hidden="true"
        className="page-entry-blur pointer-events-none fixed inset-0 z-[100]"
      />
    </div>
  );
}

function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 400);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Volver arriba"
          title="Volver arriba"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-5 right-5 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-cta transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
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
        scrolled ? "border-b border-border bg-white shadow-sm" : "bg-white"
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
        <p className="hidden text-center font-heading text-sm font-semibold text-navy lg:block">
          {CPP_COPY.navbar.tagline}
        </p>
        <CtaButton
          size="sm"
          glow={scrolled}
          className={`!rounded-full !border !px-6 !py-2.5 !text-sm !font-bold transition-all duration-300 [&>svg]:h-4 [&>svg]:w-4 ${
            scrolled
              ? "!border-primary !bg-primary !text-white shadow-cta hover:!bg-primary/90 [&>svg]:!text-white"
              : "!border-primary !bg-primary !text-white shadow-md hover:!bg-primary/90 [&>svg]:!text-white"
          }`}
        >
          {CPP_COPY.hero.cta}
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
  { value: "3 steps", label: "Sign-up process" },
  { value: "$2,500", label: "Available advances" },
  { value: "Monthly", label: "Income opportunity" },
];

function Hero() {
  return (
    <section className="relative overflow-hidden pt-16">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-primary lg:block" />

      <div className="relative mx-auto grid max-w-7xl lg:min-h-[500px] lg:grid-cols-2">
        <motion.div
          variants={heroText}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-center px-5 pb-7 pt-8 md:px-8 lg:py-8 lg:pr-12"
        >
          <motion.h1
            variants={heroItem}
            className="max-w-[606px] font-hero text-xl leading-[1.02] font-bold tracking-[-0.025em] text-foreground uppercase sm:text-4xl lg:text-[2rem] xl:text-[2.65rem]"
          >
            <span className="block whitespace-nowrap">
              Put Your <span className="text-navy">Excellent</span>
            </span>
            <span className="block whitespace-nowrap">
              <span className="text-navy">Credit History</span> to Work
            </span>
            <span className="block whitespace-nowrap">with Established</span>
            <span className="block whitespace-nowrap">Entrepreneurs</span>
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="mt-4 max-w-lg font-heading text-sm font-bold leading-relaxed text-foreground md:text-base"
          >
            {CPP_COPY.hero.preHeadline}
          </motion.p>
          <motion.p
            variants={heroItem}
            className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground md:text-base"
          >
            {CPP_COPY.hero.subheadline} {CPP_COPY.hero.riskDisclosure}
          </motion.p>

          <motion.div variants={heroItem} className="mt-5">
            <CtaButton glow shape="square">
              {CPP_COPY.hero.cta}
            </CtaButton>
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

        <div className="relative flex min-h-[290px] items-end justify-center bg-primary px-3 pt-6 sm:min-h-[350px] lg:min-h-0 lg:bg-transparent lg:px-0 lg:pt-8">
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
                <p className="text-[11px] text-muted-foreground">Credit profile</p>
                <p className="font-heading text-sm font-extrabold text-foreground">
                  Excellent or Great
                </p>
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
                <p className="font-heading text-sm font-extrabold text-foreground">
                  Profile matching
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...popIn(0.6)}
            className="absolute bottom-14 right-4 sm:right-8 lg:bottom-18 lg:right-3"
          >
            <div className="flex animate-float-reverse items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-lift sm:px-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <TrendingUp className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">Monthly opportunities</p>
                <p className="font-heading text-base font-extrabold text-foreground">
                  Up to $2,500
                </p>
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
            <div
              className={`inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br p-2.5 ${accent}`}
            >
              <Icon className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <h2 className="font-heading text-[1.15rem] font-extrabold leading-snug tracking-tight text-foreground">
              {title}
            </h2>
          </div>
          {/* Description */}
          <p className="mt-2 font-sans text-[13px] leading-relaxed text-muted-foreground">
            {description}
          </p>
          {/* Divider */}
          <div className="my-4 h-px bg-border" />
          {/* Stat row */}
          <div className="flex items-baseline gap-1.5">
            <span
              className={`bg-gradient-to-r bg-clip-text font-heading text-2xl font-extrabold tracking-tight text-transparent ${accent}`}
            >
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
    <section
      id="the-asset"
      className="scroll-mt-20 relative overflow-hidden border-t bg-gradient-to-b from-muted/60 via-muted to-muted/30 py-12 md:scroll-mt-24 md:py-16"
    >
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
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary to-navy" />
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Access Advances
                </p>
              </div>
              <p className="mt-2.5 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Up to <span className="text-primary">$2,500</span>
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Access initial program advances once your profile is verified, contracted, and
                matched. {CPP_COPY.hero.riskDisclosure}
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
            Your Credit History Is an <span className="text-navy italic">Underutilized Asset</span>
          </motion.h2>

          <motion.p
            variants={assetItemVariants}
            className="mt-4 font-sans text-base leading-relaxed text-muted-foreground"
          >
            {CPP_COPY.hero.preHeadline}
          </motion.p>

          <motion.p
            variants={assetItemVariants}
            className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground/90 sm:text-base"
          >
            {CPP_COPY.benefits.highlights[0].description} {CPP_COPY.hero.riskDisclosure}
          </motion.p>

          {/* 2 Micro tarjetas de valor destacado */}
          <motion.div variants={assetItemVariants} className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/90 p-3.5 shadow-sm">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ShieldCheck className="h-4 w-4" strokeWidth={2} />
              </div>
              <div>
                <p className="font-heading text-sm font-bold text-foreground">Approved Profiles</p>
                <p className="text-xs text-muted-foreground">{CPP_COPY.benefits.approved}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/90 p-3.5 shadow-sm">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <TrendingUp className="h-4 w-4" strokeWidth={2} />
              </div>
              <div>
                <p className="font-heading text-sm font-bold text-foreground">
                  Not Eligible at This Time
                </p>
                <p className="text-xs text-muted-foreground">{CPP_COPY.benefits.notEligible}</p>
              </div>
            </div>
          </motion.div>

          {/* Botón y micro prueba social */}
          <motion.div
            variants={assetItemVariants}
            className="mt-5 flex flex-wrap items-center gap-4"
          >
            <CtaButton size="sm" glow>
              {CPP_COPY.hero.cta}
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
    t: CPP_COPY.process.steps[0].title,
    d: CPP_COPY.process.steps[0].description,
    Icon: CheckCircle2,
    badge: CPP_COPY.process.steps[0].badge,
    accent: "from-primary/80 to-primary",
  },
  {
    n: "02",
    t: CPP_COPY.process.steps[1].title,
    d: CPP_COPY.process.steps[1].description,
    Icon: ShieldCheck,
    badge: CPP_COPY.process.steps[1].badge,
    accent: "from-primary/80 to-primary",
  },
  {
    n: "03",
    t: CPP_COPY.process.steps[2].title,
    d: CPP_COPY.process.steps[2].description,
    Icon: TrendingUp,
    badge: CPP_COPY.process.steps[2].badge,
    accent: "from-navy/80 to-navy",
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
    <section
      id="process"
      className="scroll-mt-20 relative overflow-hidden border-t bg-gradient-to-br from-silver-slate-start to-silver-slate-end py-12 md:scroll-mt-24 md:py-16"
    >
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
                <span>{CPP_COPY.process.eyebrow}</span>
              </div>

              <h2 className="mt-3 max-w-2xl font-hero text-3xl font-bold uppercase leading-[1.08] tracking-tight text-foreground sm:text-4xl">
                {CPP_COPY.process.h2}
              </h2>

              <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
                {CPP_COPY.process.intro}
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
                      <div
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.accent} shadow-sm`}
                      >
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

            <motion.div
              variants={processItemVariants}
              className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <CtaButton size="sm" glow>
                {CPP_COPY.hero.cta}
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
              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                Quick Credit Verification
              </p>
              <p className="mt-1 font-heading text-sm font-extrabold text-foreground">
                Eligibility comes first
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function SignupFormSection() {
  return (
    <section
      id="formulario"
      className="relative isolate overflow-hidden scroll-mt-20 border-t bg-gradient-to-b from-muted/50 via-white to-white py-10 md:scroll-mt-24 md:py-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-8 h-64 w-64 rounded-full border border-primary/10 bg-primary/[0.025]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-24 h-80 w-80 rounded-full border border-primary/10 bg-primary/[0.025]"
      />
      <Reveal
        viewport={{ once: true, amount: 0.05, margin: "-40px" }}
        className="relative z-10 mx-auto max-w-7xl px-5 md:px-8"
      >
        <div className="mx-auto max-w-2xl">
          <div className="mb-4 text-center">
            <h2 className="font-hero text-2xl font-bold uppercase leading-tight tracking-tight text-foreground sm:text-3xl">
              Quick Credit <span className="text-primary">Verification</span>
            </h2>
            <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-primary/50 to-primary" />
          </div>
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-white p-3.5 shadow-lift sm:p-5">
            <FormstackEmbed />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ServiceAgreementSection() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const [hasConfirmedCall, setHasConfirmedCall] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <section
      aria-labelledby="service-agreement-title"
      className="service-agreement-section border-t border-border/70 py-7 sm:py-9"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-white p-5 shadow-lift sm:p-6">
          <div className="flex items-center gap-2">
            <h2
              id="service-agreement-title"
              className="font-heading text-lg font-extrabold leading-tight tracking-tight text-foreground sm:text-xl"
            >
              e-Sign the Service Agreement
            </h2>
            <ChevronDown
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-primary/70"
              strokeWidth={2.5}
            />
          </div>
          <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
            e-Sign your Service Agreement in a single click. It&apos;s fast, secure, and
            there&apos;s no cost to you.
          </p>
          {showConfirmation ? (
            <div
              aria-live="polite"
              className="mt-4 flex animate-in flex-col items-center rounded-xl border border-border bg-white p-5 text-center fade-in slide-in-from-bottom-2 duration-300 motion-reduce:animate-none sm:p-8"
            >
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail aria-hidden="true" className="h-6 w-6" />
              </span>
              <h3 className="font-heading text-lg font-bold text-foreground">Check your email</h3>
              <p className="mt-2 max-w-lg font-sans text-sm leading-relaxed text-muted-foreground">
                We sent the agreement to your email for eSign. Please check the email we sent you
                and click the link to e-Sign the Service Agreement.
              </p>
              <label className="mt-5 flex cursor-pointer items-center gap-2 font-sans text-sm font-medium text-foreground transition-colors hover:text-primary">
                <input
                  type="checkbox"
                  checked={hasSigned}
                  onChange={(event) => setHasSigned(event.target.checked)}
                  className="h-4 w-4 cursor-pointer accent-primary transition-transform duration-150 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                />
                I have e-signed the agreement
              </label>
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-heading text-xs font-bold text-primary">
                <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5" />
                100% FREE — No payment required
              </span>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setShowConfirmation(true)}
                className="mx-auto mt-4 flex min-h-14 w-full max-w-sm cursor-pointer items-center justify-center rounded-xl bg-primary px-5 py-3 text-center font-heading text-base font-bold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transform-none motion-reduce:transition-none"
              >
                e-Sign the Service Agreement
              </button>
              <div className="mt-3 flex justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-heading text-xs font-bold text-primary">
                  <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5" />
                  100% FREE — No payment required
                </span>
              </div>
              <p className="mt-3 flex items-center justify-center gap-1.5 font-sans text-xs text-muted-foreground">
                <Lock aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
                Encrypted &amp; 100% Secure
              </p>
            </>
          )}
        </div>
        {hasSigned && (
          <div
            aria-labelledby="welcome-call-title"
            aria-live="polite"
            className="mx-auto mt-4 max-w-2xl animate-in rounded-2xl border border-border bg-white p-5 shadow-lift fade-in slide-in-from-bottom-3 duration-300 motion-reduce:animate-none sm:p-6"
            role="region"
          >
            <div className="flex items-center gap-2">
              <h2
                id="welcome-call-title"
                className="font-heading text-lg font-extrabold leading-tight tracking-tight text-foreground sm:text-xl"
              >
                Step 3: Book your Welcome Call
              </h2>
              <ChevronDown
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-primary/70"
                strokeWidth={2.5}
              />
            </div>
            <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
              You&apos;re almost there! Book your Welcome Call below — or if you&apos;ve already
              confirmed a date and time with us, simply check the box to let us know you&apos;re all
              set.
            </p>
            <div className="mt-7 rounded-xl border border-border p-4 sm:p-4">
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="group flex min-h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-center font-heading text-base font-bold text-white shadow-[0_8px_18px_rgba(16,185,129,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-lg active:translate-y-0 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <CalendarDays
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6"
                />
                Book your Welcome Call
              </button>
              <div className="my-5 flex items-center gap-3 font-heading text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <span aria-hidden="true" className="h-px flex-1 bg-border" />
                <span>OR</span>
                <span aria-hidden="true" className="h-px flex-1 bg-border" />
              </div>
              <label className="flex cursor-pointer items-center justify-center gap-3 font-sans text-sm text-foreground transition-colors hover:text-primary">
                <input
                  type="checkbox"
                  checked={hasConfirmedCall}
                  onChange={(event) => setHasConfirmedCall(event.target.checked)}
                  className="h-5 w-5 cursor-pointer rounded accent-primary transition-transform duration-150 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                />
                I&apos;ve already confirmed my Welcome Call with the team.
              </label>
            </div>
          </div>
        )}
        <WelcomeCallModal open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen} />
      </div>
    </section>
  );
}

const welcomeCallFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Enter your full name")
    .refine((value) => value.split(/\s+/).filter(Boolean).length >= 2, {
      message: "Enter first and last name",
    }),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .refine((value) => value.replace(/\D/g, "").length >= 10, {
      message: "Enter at least 10 digits",
    }),
  score: z
    .string()
    .refine(
      (value) => value.trim() === "" || (Number.isFinite(Number(value)) && Number(value) >= 0),
      "Use 0 or more",
    ),
  consent: z.boolean().refine((value) => value, {
    message: "Required to continue",
  }),
});

type WelcomeCallValues = z.infer<typeof welcomeCallFormSchema>;

interface WidgetSubmitEvent {
  preventDefault: () => void;
  target: HTMLFormElement;
}

interface WebsysAppsWidget {
  currentStep: number;
  mountElement: HTMLElement;
  widgetConfig?: {
    config?: {
      consentCheckboxes?: Array<{ id?: string; required?: boolean }>;
    };
  } | null;
  applyProductionStyling?: (this: WebsysAppsWidget) => void;
  handleStep1Submit: (event: WidgetSubmitEvent) => Promise<void>;
}

declare global {
  interface Window {
    widgetInstance?: WebsysAppsWidget;
  }
}

function WelcomeCallModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const reduceMotion = useReducedMotion();
  const [widgetMount, setWidgetMount] = useState<HTMLDivElement | null>(null);
  const [loadState, setLoadState] = useState<"idle" | "loading" | "loaded" | "error">("idle");
  const [consentId, setConsentId] = useState("legacy_disclosure_agreement");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const submitCheckRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<WelcomeCallValues>({
    resolver: zodResolver(welcomeCallFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      score: "",
      consent: false,
    },
  });

  useEffect(() => {
    if (!open || !widgetMount) {
      return;
    }

    let active = true;
    let failed = false;
    let readyHandled = false;
    const script = document.createElement("script");
    const observer = new MutationObserver(checkWidgetReady);

    widgetMount.replaceChildren();
    setLoadState("loading");
    setStep(1);
    setSubmitError(null);
    setIsSubmitting(false);
    script.src = "https://meeting.websysapps.com/widget-2step.js";
    script.async = true;
    script.setAttribute("data-widget-id", "6");
    script.setAttribute("data-api-base-url", "https://meeting.websysapps.com");
    script.addEventListener(
      "load",
      () => {
        checkWidgetReady();
      },
      { once: true },
    );
    script.addEventListener(
      "error",
      () => {
        failWidgetLoad();
      },
      { once: true },
    );
    const timeoutId = window.setTimeout(failWidgetLoad, 20_000);
    observer.observe(widgetMount, { childList: true, subtree: true });
    document.head.appendChild(script);
    checkWidgetReady();

    function checkWidgetReady() {
      if (!active || failed || readyHandled) {
        return;
      }

      const widget = window.widgetInstance;
      if (widget?.mountElement !== widgetMount || !widget.widgetConfig?.config) {
        return;
      }

      const applyProductionStyling = widget.applyProductionStyling;
      if (applyProductionStyling) {
        widget.applyProductionStyling = () => {
          applyProductionStyling.call(widget);
          widget.mountElement
            .querySelectorAll<HTMLButtonElement>(".appointment-widget button")
            .forEach((button) => {
              [
                "background",
                "color",
                "border",
                "border-radius",
                "padding",
                "font-size",
                "font-weight",
                "font-family",
                "cursor",
                "width",
                "box-sizing",
              ].forEach((property) => button.style.removeProperty(property));
            });
        };
      }

      readyHandled = true;
      observer.disconnect();
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
      window.setTimeout(() => {
        if (!active) {
          return;
        }

        widgetMount.replaceChildren();
        const consentCheckboxes = widget.widgetConfig?.config?.consentCheckboxes ?? [];
        setConsentId(
          consentCheckboxes.find((checkbox) => checkbox.required)?.id ??
            consentCheckboxes[0]?.id ??
            "legacy_disclosure_agreement",
        );
        setLoadState("loaded");
      }, 0);
    }

    function failWidgetLoad() {
      if (!active || readyHandled) {
        return;
      }

      failed = true;
      observer.disconnect();
      setLoadState("error");
    }

    return () => {
      active = false;
      observer.disconnect();
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
      if (submitCheckRef.current !== null) {
        window.clearTimeout(submitCheckRef.current);
        submitCheckRef.current = null;
      }
      script.remove();
      widgetMount.replaceChildren();
      if (window.widgetInstance?.mountElement === widgetMount) {
        window.widgetInstance = undefined;
      }
    };
  }, [open, retryCount, widgetMount]);

  useEffect(() => {
    if (open) {
      reset();
      setStep(1);
      setSubmitError(null);
      setConsentId("legacy_disclosure_agreement");
    }
  }, [open, reset]);

  useEffect(() => {
    if (step !== 2 || !widgetMount) {
      return;
    }

    const widget = window.widgetInstance;
    if (!widget || widget.mountElement !== widgetMount) {
      return;
    }

    const observer = new MutationObserver(() => {
      const successHeading = widgetMount
        .querySelector(".appointment-widget h2")
        ?.textContent?.trim();
      if (successHeading === "Appointment Booked!") {
        setStep(3);
        return;
      }

      if (widget.currentStep === 1) {
        widgetMount.replaceChildren();
        setStep(1);
        setSubmitError(null);
      }
    });
    observer.observe(widgetMount, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [step, widgetMount]);

  const handleScheduleCall = (values: WelcomeCallValues) => {
    const widget = window.widgetInstance;
    const form = formRef.current;

    if (loadState !== "loaded" || !widget || widget.mountElement !== widgetMount || !form) {
      setSubmitError("The scheduler is not ready yet. Please wait a moment and try again.");
      return;
    }

    for (const [name, value] of Object.entries({
      name: values.name,
      email: values.email,
      phone: values.phone,
      score: values.score,
    })) {
      const input = form.querySelector<HTMLInputElement>(`[name="${name}"]`);
      if (input) {
        input.value = value;
      }
    }

    widget.mountElement.querySelector(".error-message")?.remove();
    setSubmitError(null);
    setIsSubmitting(true);
    void widget
      .handleStep1Submit({ preventDefault: () => {}, target: form })
      .catch((error: unknown) => {
        if (submitCheckRef.current !== null) {
          window.clearTimeout(submitCheckRef.current);
          submitCheckRef.current = null;
        }
        setSubmitError(
          error instanceof Error
            ? error.message
            : "We could not process your request. Please try again.",
        );
        setIsSubmitting(false);
      });

    const deadline = Date.now() + 60_000;
    const checkSubmission = () => {
      if (widget.currentStep === 2) {
        submitCheckRef.current = null;
        setStep(2);
        setIsSubmitting(false);
        return;
      }

      const errorMessage = widget.mountElement.querySelector(".error-message")?.textContent?.trim();
      if (errorMessage) {
        submitCheckRef.current = null;
        setSubmitError(errorMessage);
        setIsSubmitting(false);
        return;
      }

      if (Date.now() >= deadline) {
        submitCheckRef.current = null;
        setSubmitError("The request is taking longer than expected. Please try again.");
        setIsSubmitting(false);
        return;
      }

      submitCheckRef.current = window.setTimeout(checkSubmission, 100);
    };

    checkSubmission();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[96vh] w-[92vw] max-w-xl flex-col gap-0 overflow-hidden rounded-xl border-0 bg-white p-0 text-white shadow-2xl [&>button]:hidden sm:rounded-xl">
        <div className="relative flex min-h-[4.5rem] items-center justify-center bg-[#0f4d6b] px-12 py-3 text-center">
          <div>
            <DialogTitle className="font-heading text-base font-bold text-white">
              {step === 3 ? "Appointment Booked!" : "Schedule Welcome Call"}
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm text-white/90">
              {step === 1
                ? "Step 1 of 2 - Your Information"
                : step === 2
                  ? "Step 2 of 2 - Select Date & Time"
                  : "Your welcome call is confirmed"}
            </DialogDescription>
          </div>
          <DialogClose
            aria-label="Close booking form"
            className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </DialogClose>
        </div>
        <div
          className={`welcome-call-step-content grid grid-cols-1 bg-white px-4 py-2.5 ${
            step === 1 || step === 3
              ? "overflow-hidden"
              : "max-h-[calc(96vh-4.5rem)] overflow-y-auto"
          }`}
        >
          <AnimatePresence initial={false}>
            {step === 1 && (
              <motion.form
                ref={formRef}
                key="welcome-call-form"
                initial={{ opacity: 0, rotateY: -75, x: -36 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: 75, x: 36 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.45,
                  ease: "easeInOut",
                }}
                style={{
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
                noValidate
                onSubmit={handleSubmit(handleScheduleCall)}
                className="col-start-1 row-start-1 space-y-2 text-[#1a2038]"
              >
                {loadState === "loading" && (
                  <div
                    aria-live="polite"
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                    role="status"
                  >
                    <Loader2 aria-hidden="true" className="h-3.5 w-3.5 animate-spin" />
                    Connecting to the scheduler…
                  </div>
                )}
                {loadState === "error" && (
                  <div className="flex items-center justify-between gap-3" role="alert">
                    <p className="text-xs text-destructive">
                      The scheduler could not be loaded. Check your connection and try again.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setRetryCount((count) => count + 1)}
                      className="shrink-0"
                    >
                      Try again
                    </Button>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                  <div className="space-y-1 text-left">
                    <Label
                      htmlFor="name"
                      className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                      Full Name <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="name"
                      autoComplete="name"
                      placeholder="Your full name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "welcome-name-error" : undefined}
                      className="h-9 border-[#d1d5db] text-sm"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p
                        id="welcome-name-error"
                        className="text-[10px] leading-tight text-destructive"
                      >
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1 text-left">
                    <Label
                      htmlFor="email"
                      className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                      Email Address <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@example.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "welcome-email-error" : undefined}
                      className="h-9 border-[#d1d5db] text-sm"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p
                        id="welcome-email-error"
                        className="text-[10px] leading-tight text-destructive"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1 text-left">
                    <Label
                      htmlFor="phone"
                      className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                      Phone Number <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="(555) 123-4567"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "welcome-phone-error" : undefined}
                      className="h-9 border-[#d1d5db] text-sm"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p
                        id="welcome-phone-error"
                        className="text-[10px] leading-tight text-destructive"
                      >
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1 text-left">
                    <Label
                      htmlFor="score"
                      className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                      Approximate Credit Score
                    </Label>
                    <Input
                      id="score"
                      type="number"
                      min="0"
                      step="1"
                      inputMode="numeric"
                      placeholder="Optional"
                      aria-invalid={Boolean(errors.score)}
                      aria-describedby={errors.score ? "welcome-score-error" : undefined}
                      className="h-9 border-[#d1d5db] text-sm"
                      {...register("score")}
                    />
                    {errors.score && (
                      <p
                        id="welcome-score-error"
                        className="text-[10px] leading-tight text-destructive"
                      >
                        {errors.score.message}
                      </p>
                    )}
                  </div>
                </div>

                <section
                  aria-labelledby="welcome-consent-heading"
                  className="space-y-1 border-t border-border/70 pt-2"
                >
                  <h3
                    id="welcome-consent-heading"
                    className="text-[10px] font-bold uppercase tracking-wide text-[#1a2038]"
                  >
                    eSignature &amp; Consent to Communications
                  </h3>
                  <p className="text-[10px] leading-[1.25] text-muted-foreground">
                    By submitting this form, you agree to our Terms of Use, Privacy Policy, Refund
                    Policy (No Refunds), FTC Disclosures, Legal Terms, and Dispute Resolution
                    Policy, including final and binding arbitration on an individual basis and a
                    waiver of all class or representative actions, including TCPA and
                    communications-related claims.
                  </p>
                  <p className="text-[10px] leading-[1.25] text-muted-foreground">
                    You authorize us and our affiliates, partners, successors, and related brands
                    (present or future) to contact you via any communication channel (phone, SMS,
                    email, WhatsApp, AI or automated systems, prerecorded messages, or similar
                    technologies), to monitor or record calls, and to use AI-assisted agents,
                    regarding this and future matters. Consent is required to engage or transact.
                    SMS opt-out is by replying STOP. This agreement survives any opt-out or
                    termination.
                  </p>
                </section>

                <div className="space-y-1">
                  <label
                    htmlFor={`consent-${consentId}`}
                    className="flex cursor-pointer items-start gap-2 text-[10px] leading-[1.25] text-[#1a2038]"
                  >
                    <input
                      id={`consent-${consentId}`}
                      name={`consent-${consentId}`}
                      type="checkbox"
                      required
                      onChange={(event) =>
                        setValue("consent", event.target.checked, { shouldValidate: true })
                      }
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 cursor-pointer accent-[#1a2f6b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    />
                    <span>
                      I agree to Binding Arbitration and consent to AI-assisted, automated, and
                      recorded communications as described above.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-[10px] leading-tight text-destructive" role="alert">
                      {errors.consent.message}
                    </p>
                  )}
                </div>

                {submitError && (
                  <p className="text-xs text-destructive" role="alert">
                    {submitError}
                  </p>
                )}

                <Button
                  id={loadState === "loaded" ? "schedule-btn" : undefined}
                  type="submit"
                  disabled={loadState !== "loaded" || isSubmitting}
                  className="h-10 w-full rounded-lg bg-[#1a2f6b] text-sm font-semibold text-white shadow-[0_2px_8px_rgba(26,47,107,0.2)] hover:bg-[#142653]"
                >
                  {isSubmitting ? "Processing…" : "Schedule welcome call"}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
          <motion.div
            ref={setWidgetMount}
            id="widget-mount-6"
            initial={false}
            animate={
              step === 1 ? { opacity: 0, rotateY: 75, x: 36 } : { opacity: 1, rotateY: 0, x: 0 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.45,
              ease: "easeInOut",
            }}
            style={{
              width: "100%",
              minHeight: "400px",
              transformOrigin: "right center",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
            className={`welcome-call-widget col-start-1 row-start-1 ${
              step === 1 ? "hidden" : ""
            } ${step === 3 ? "welcome-call-confirmation" : ""}`}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

// 5. Confianza y seguridad: tarjetas institucionales elevadas con tipografías coherentes
// 5. Confianza y seguridad: estética avanzada con objetos animados y certificación en vivo
const TRUST = [
  {
    Icon: Lock,
    tag: "Data Security Standards",
    t: "Information Security",
    d: CPP_COPY.benefits.highlights[2].description,
    badge: "Review safeguards",
    techTag: "Program terms",
    accent: "from-primary/80 to-primary",
  },
  {
    Icon: ShieldCheck,
    tag: "Privacy Practices",
    t: "Privacy & Consent",
    d: CPP_COPY.footer.platformDisclaimer,
    badge: "See privacy terms",
    techTag: "Privacy policy",
    accent: "from-primary/80 to-primary",
  },
  {
    Icon: Award,
    tag: "Program Disclosures",
    t: "Terms & Eligibility",
    d: `${CPP_COPY.benefits.approved} ${CPP_COPY.benefits.notEligible}`,
    badge: "Terms apply",
    techTag: "Disclosures",
    accent: "from-primary/70 to-primary/20",
  },
];

function TrustSection() {
  return (
    <section className="relative overflow-hidden border-t bg-gradient-to-b from-muted/70 via-muted/50 to-white py-16 md:py-24">
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full border border-primary/10 bg-primary/[0.025]" />
      <div className="pointer-events-none absolute -right-24 bottom-20 h-96 w-96 rounded-full border border-primary/10 bg-primary/[0.025]" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-white/90 px-4 py-3 shadow-sm">
              <FileText className="h-5 w-5 shrink-0 text-primary" />
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Program Eligibility
                </p>
                <p className="font-heading text-sm font-bold text-foreground">Review eligibility</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-xl border border-border/70 bg-white/90 px-4 py-3 text-center shadow-sm">
              <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
              <p className="font-heading text-sm font-bold uppercase tracking-wide text-foreground">
                Security & Privacy
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-white/90 px-4 py-3 shadow-sm">
              <Lock className="h-5 w-5 shrink-0 text-primary" />
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Protected Data
                </p>
                <p className="font-heading text-sm font-bold text-foreground">Read privacy terms</p>
              </div>
            </div>
          </div>

          <Reveal className="text-center">
            <h2 className="font-hero text-3xl font-bold uppercase leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Program Terms &amp; <span className="text-primary">Privacy</span>
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-justify font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
              {CPP_COPY.footer.riskEarnings}
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TRUST.map(({ Icon, tag, t, d, badge, techTag, accent }, i) => (
            <Reveal
              key={t}
              delay={i * 0.12}
              className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/60 px-3 py-1.5">
                  <Icon className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.8} />
                  <span className="font-heading text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {tag}
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-lg font-extrabold leading-snug tracking-tight text-foreground">
                  {t}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-foreground/80">{d}</p>
              </div>
              <div className="relative mt-auto flex items-center justify-between gap-3 border-t border-border/60 pt-4">
                <span className="text-xs text-muted-foreground">{badge}</span>
                <span className="rounded-full border border-border/70 bg-muted/40 px-3 py-1 font-heading text-[10px] font-semibold text-muted-foreground">
                  {techTag}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={0.25}
          className="mt-8 rounded-2xl border border-border/70 bg-muted/60 p-5 shadow-sm sm:p-6"
        >
          <h3 className="mb-4 text-center font-heading text-xs font-extrabold uppercase tracking-widest text-primary">
            Review program disclosures before participating
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-white/90 px-4 py-3 text-sm font-semibold text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
              <span>Excellent or Great Credit</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-white/90 px-4 py-3 text-sm font-semibold text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
              <span>Established positive credit history</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-white/90 px-4 py-3 text-sm font-semibold text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
              <span>No active delinquencies</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-white/90 px-4 py-3 text-sm font-semibold text-muted-foreground">
              <Info className="h-4 w-4 shrink-0 text-primary" />
              <span>{CPP_COPY.hero.riskDisclosure}</span>
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
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full bg-primary/[0.04] blur-3xl" />

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
            Put Your <span className="text-navy">Excellent Credit History</span> to Work with
            Established Entrepreneurs
          </h2>

          <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
            {CPP_COPY.hero.subheadline} {CPP_COPY.hero.riskDisclosure}
          </p>

          {/* Micro-beneficios con tipografía font-heading / font-sans */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
              <span className="font-sans text-sm text-foreground/90">
                <strong className="font-heading font-bold text-foreground">
                  {CPP_COPY.benefits.highlights[0].title}
                </strong>{" "}
                {CPP_COPY.benefits.highlights[0].description}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
              <span className="font-sans text-sm text-foreground/90">
                <strong className="font-heading font-bold text-foreground">
                  {CPP_COPY.benefits.highlights[1].title}
                </strong>{" "}
                {CPP_COPY.benefits.highlights[1].description}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
              <span className="font-sans text-sm text-foreground/90">
                <strong className="font-heading font-bold text-foreground">
                  {CPP_COPY.benefits.highlights[2].title}
                </strong>{" "}
                {CPP_COPY.benefits.highlights[2].description}
              </span>
            </div>
          </div>

          <p className="mt-4 max-w-xl font-sans text-xs leading-relaxed text-muted-foreground">
            {CPP_COPY.hero.riskDisclosure}
          </p>

          {/* Botón CTA principal */}
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <CtaButton glow size="lg">
              {CPP_COPY.hero.cta}
            </CtaButton>
          </div>

          {/* Micro-aviso de confianza */}
          <div className="mt-4 flex items-center gap-2 font-sans text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
            <span>{CPP_COPY.hero.microcopy}</span>
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
                    Excellent or Great
                  </p>
                </div>
              </div>
            </div>

            {/* Tarjeta flotante inferior derecha */}
            <div className="animate-float-reverse absolute -bottom-5 -right-3 sm:-right-5 max-w-[210px] rounded-2xl border border-border/80 bg-white/95 p-3.5 shadow-lift backdrop-blur-md">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
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
    <footer className="border-t border-border/80 bg-navy pt-16 text-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 pb-14 md:grid-cols-12 lg:gap-16">
          {/* Columna 1: Logo y propósito */}
          <div className="md:col-span-5 lg:col-span-4">
            <a href="/" className="inline-block transition-transform hover:opacity-95">
              <img
                src={footerLogo}
                alt="Credit PartnerPro - Where Your Credit Becomes a Real Asset"
                className="w-[190px] object-contain"
              />
            </a>
            <p className="mt-5 max-w-sm font-sans text-sm leading-relaxed text-white/75">
              Credit Partner Pro operates as a business matchmaking service connecting credit
              partners with independent entrepreneurs.
            </p>
          </div>

          {/* Columna 2: Useful Links (2 subcolumnas) */}
          <div className="md:col-span-7 lg:col-span-4">
            <h4 className="font-heading text-sm font-extrabold uppercase tracking-wider text-white">
              USEFUL LINKS
            </h4>
            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 font-sans text-sm font-medium text-white/75">
              <div className="flex flex-col space-y-3">
                <a href="/" className="transition-colors hover:text-white">
                  Home
                </a>
                <a href="#process" className="transition-colors hover:text-white">
                  How It Works
                </a>
                <a href="#the-asset" className="transition-colors hover:text-white">
                  What You Get
                </a>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Book Your Welcome Call
                </a>
                <a href="#disclosures" className="transition-colors hover:text-white">
                  Program Risk Disclosure
                </a>
              </div>
              <div className="flex flex-col space-y-3">
                <a
                  href="mailto:Support@CreditPartnerPro.com"
                  className="transition-colors hover:text-white"
                >
                  Support
                </a>
                <a href={CPP_LINKS.ftcDisclosures} className="transition-colors hover:text-white">
                  FTC Disclosures
                </a>
                <a href={CPP_LINKS.privacyPolicy} className="transition-colors hover:text-white">
                  Privacy Policy
                </a>
                <a
                  href={CPP_LINKS.disputeResolution}
                  className="transition-colors hover:text-white"
                >
                  Dispute Resolution
                </a>
                <a href={CPP_LINKS.termsOfUse} className="transition-colors hover:text-white">
                  Terms of Use
                </a>
              </div>
            </div>
          </div>

          {/* Columna 3: Contact Us */}
          <div className="md:col-span-12 lg:col-span-4">
            <h4 className="font-heading text-sm font-extrabold uppercase tracking-wider text-white">
              CONTACT US
            </h4>
            <ul className="mt-5 space-y-3.5 font-sans text-sm font-medium text-white/75">
              <li>
                <a
                  href="tel:+17203102748"
                  className="flex items-center gap-3 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-white" />
                  <span>(720) 310-2748</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:Support@CreditPartnerPro.com"
                  className="flex items-center gap-3 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-white" />
                  <span>Support@CreditPartnerPro.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                <span>
                  5500 Greenwood Plaza Blvd, Suite 130
                  <br />
                  Greenwood Village, CO 80111
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div
          id="disclosures"
          className="scroll-mt-20 mb-6 border-l-4 border-disclosure-border bg-disclosure px-5 py-3 text-sm text-foreground md:scroll-mt-24"
        >
          <div className="space-y-2 leading-snug">
            <p>
              <strong>IMPORTANT RISK &amp; EARNINGS DISCLOSURE:</strong>{" "}
              {CPP_COPY.footer.riskEarnings}
            </p>
            <p>
              <strong>PLATFORM DISCLAIMER:</strong> {CPP_COPY.footer.platformDisclaimer}
            </p>
          </div>
        </div>

        {/* Declaración de cumplimiento y due diligence */}
        <div className="border-t border-white/20 py-6 text-center font-sans text-xs text-white/75">
          <a href="#disclosures" className="transition-colors hover:text-white">
            Program Risk Disclosure
          </a>
          <span className="mx-2 text-border">|</span>
          <a href={CPP_LINKS.companyInformation} className="transition-colors hover:text-white">
            Request company information
          </a>
        </div>
      </div>

      {/* Barra inferior de copyright */}
      <div className="border-t border-white/20 bg-navy/90 py-4 text-center font-sans text-xs text-white/75">
        <p>Copyright © {new Date().getFullYear()} CreditPartnerPro.com. All rights reserved.</p>
      </div>
    </footer>
  );
}
