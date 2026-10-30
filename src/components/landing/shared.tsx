// Componentes compartidos de la landing: enlace CTA y animación de aparición
import { motion, type HTMLMotionProps } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

// Enlace de agenda en Calendly usado por todos los botones
export const CALENDLY_URL = "https://calendly.com/creditpartnerpr0/appointment";

// Contenedor con efecto fade-up al entrar en pantalla
export function Reveal({ children, delay = 0, ...rest }: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// Botón CTA con elevación y flecha animada al hover
export function CtaButton({ children, size = "lg" }: { children: ReactNode; size?: "sm" | "lg" }) {
  const sizing = size === "lg" ? "px-7 py-4 text-base" : "px-5 py-2.5 text-sm";
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2 rounded-full bg-primary font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift ${sizing}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
    </a>
  );
}
