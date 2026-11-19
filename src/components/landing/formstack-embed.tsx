import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  User,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  Upload,
  FileText,
  X,
  Loader2,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// ─── Step 1 Schema: Only Full Name, Email, Phone ──────────────────────────────
const step1Schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Please enter your full name (at least 3 characters)")
    .refine(
      (val) => val.split(" ").filter(Boolean).length >= 2,
      "Please provide both your first and last name",
    ),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Please enter a valid email address (e.g. name@example.com)"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine((val) => {
      const digits = val.replace(/\D/g, "");
      return digits.length >= 10;
    }, "Please enter a valid 10-digit phone number"),
});

// ─── Step 2 Schema: File Upload + eSignature & Consents ───────────────────────
const step2Schema = z.object({
  termsConsent: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms, policies, and disclosures to proceed",
  }),
  commConsent: z.boolean().refine((val) => val === true, {
    message: "You must consent to communications to proceed",
  }),
});

type Step1Values = z.infer<typeof step1Schema>;
type Step2Values = z.infer<typeof step2Schema>;

// ─── Phone Mask Helper ────────────────────────────────────────────────────────
function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

// ─── Field Wrapper Component ──────────────────────────────────────────────────
interface FieldProps {
  label: string;
  required?: boolean | undefined;
  error?: string | undefined;
  children: React.ReactNode;
}

function Field({ label, required = true, error, children }: FieldProps) {
  return (
    <div className="space-y-1 text-left">
      <Label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </Label>
      {children}
      {error && (
        <p className="flex items-center gap-1 pt-0.5 text-[11px] font-medium text-destructive animate-in fade-in-50">
          <span className="h-1 w-1 shrink-0 rounded-full bg-destructive" />
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Step Indicator (Compact Origin UI Style) ─────────────────────────────────
function StepIndicator({ currentStep }: { currentStep: 1 | 2 }) {
  return (
    <div className="mb-3.5 flex items-center justify-between border-b border-border/60 pb-2.5">
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold transition-all",
            currentStep === 1
              ? "bg-primary text-primary-foreground shadow-xs"
              : "bg-primary/20 text-primary font-extrabold",
          )}
        >
          {currentStep > 1 ? "✓" : "1"}
        </span>
        <span
          className={cn(
            "text-xs font-semibold",
            currentStep === 1 ? "text-foreground" : "text-muted-foreground",
          )}
        >
          Personal Info
        </span>

        <span className="text-muted-foreground/30 text-xs">/</span>

        <span
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold transition-all",
            currentStep === 2
              ? "bg-primary text-primary-foreground shadow-xs"
              : "bg-muted text-muted-foreground",
          )}
        >
          2
        </span>
        <span
          className={cn(
            "text-xs font-semibold",
            currentStep === 2 ? "text-foreground" : "text-muted-foreground",
          )}
        >
          Document &amp; Consent
        </span>
      </div>

      <span className="text-[10px] font-medium text-muted-foreground">Step {currentStep} of 2</span>
    </div>
  );
}

// ─── Success Screen (Compact Origin UI Style) ─────────────────────────────────
function SuccessScreen({ name, onReset }: { name: string; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center py-4 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 18 }}
        className="relative mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-inner"
      >
        <CheckCircle2 className="h-7 w-7 text-primary" strokeWidth={2.2} />
      </motion.div>

      <span className="mb-1.5 inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
        Verification Submitted
      </span>

      <h3 className="font-heading text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
        Thank you, {name}!
      </h3>

      <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-muted-foreground">
        Your verification request and eSignature consents have been securely recorded. Our partner
        team will reach out within 24 hours.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-4 cursor-pointer text-[11px] font-medium text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
      >
        Submit another verification
      </button>
    </motion.div>
  );
}

// ─── Constants & Formstack Field IDs ──────────────────────────────────────────
const FORMSTACK_SUCCESS_MESSAGE = "cpp-formstack-submission-success";

// ─── Main Formstack Component ─────────────────────────────────────────────────
export function FormstackEmbed() {
  const [step, setStep] = useState<1 | 2 | "done">(1);
  const [step1Data, setStep1Data] = useState<Step1Values | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formstackIframeRef = useRef<HTMLIFrameElement>(null);
  const submissionTargetRef = useRef<HTMLIFrameElement>(null);
  const submissionTimeoutRef = useRef<number | null>(null);

  // Initialize hidden Formstack script bridge in the background
  useEffect(() => {
    const iframe = formstackIframeRef.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentWindow?.document || iframe.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <script type="text/javascript" src="https://kic.formstack.com/forms/js.php/cpp_credit_report"></script>
    <noscript><a href="https://kic.formstack.com/forms/cpp_credit_report" title="Online Form">Online Form - CPP - credit report - Upload Credit Report - kevin</a></noscript>
  </body>
</html>`);
        doc.close();
      }
    } catch {
      // Graceful fallback for cross-origin or sandbox restrictions
    }
  }, []);

  useEffect(() => {
    const handleSubmissionMessage = (event: MessageEvent<unknown>) => {
      if (event.source !== submissionTargetRef.current?.contentWindow) {
        return;
      }
      if (
        event.origin !== window.location.origin &&
        event.origin !== "https://credittoworkcom.vercel.app"
      ) {
        return;
      }

      const message = event.data;
      if (
        typeof message !== "object" ||
        message === null ||
        !("type" in message) ||
        message.type !== FORMSTACK_SUCCESS_MESSAGE
      ) {
        return;
      }

      if (submissionTimeoutRef.current !== null) {
        window.clearTimeout(submissionTimeoutRef.current);
      }
      window.location.assign("/thank-you");
    };

    window.addEventListener("message", handleSubmissionMessage);
    return () => {
      window.removeEventListener("message", handleSubmissionMessage);
      if (submissionTimeoutRef.current !== null) {
        window.clearTimeout(submissionTimeoutRef.current);
      }
    };
  }, []);

  // Step 1 Form
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    setValue: setValue1,
    formState: { errors: errors1 },
  } = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      fullName: step1Data?.fullName ?? "",
      email: step1Data?.email ?? "",
      phone: step1Data?.phone ?? "",
    },
  });

  // Step 2 Form
  const {
    control: control2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    formState: { errors: errors2 },
  } = useForm<Step2Values>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      termsConsent: false,
      commConsent: false,
    },
  });

  // Handle Step 1 Submit
  const onStep1Submit = (data: Step1Values) => {
    setStep1Data(data);
    setStep(2);
  };

  // Handle File Change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      setFileError("File size exceeds 15MB limit");
      setSelectedFile(null);
      return;
    }

    setFileError(null);
    setSelectedFile(file);
  };

  // Populate and submit the official Formstack embed once.
  const onStep2Submit = () => {
    if (!selectedFile) {
      setFileError("Please upload your credit report or ID document to continue");
      return;
    }
    setFileError(null);
    setSubmissionError(null);
    setIsSubmitting(true);

    try {
      const doc =
        formstackIframeRef.current?.contentWindow?.document ||
        formstackIframeRef.current?.contentDocument;
      if (!doc || !step1Data) {
        throw new Error("The secure form could not be loaded. Please refresh and try again.");
      }
      const form = doc.querySelector<HTMLFormElement>("form");
      if (!form) {
        throw new Error("The secure form is still loading. Please wait a moment and try again.");
      }

      const setFieldValue = (selector: string, value: string) => {
        const field = doc.querySelector<HTMLInputElement>(selector);
        if (!field) {
          throw new Error("A required field could not be found in the secure form.");
        }
        const setter = Object.getOwnPropertyDescriptor(
          doc.defaultView?.HTMLInputElement.prototype ?? HTMLInputElement.prototype,
          "value",
        )?.set;
        setter?.call(field, value);
        field.dispatchEvent(new Event("input", { bubbles: true }));
        field.dispatchEvent(new Event("change", { bubbles: true }));
      };

      setFieldValue('input[name*="200358399"], input[placeholder*="John Doe"]', step1Data.fullName);
      setFieldValue('input[type="email"], input[name*="200358400"]', step1Data.email);
      setFieldValue('input[type="tel"], input[name*="200358401"]', step1Data.phone);

      const checkboxGroups = [
        doc.querySelectorAll<HTMLInputElement>('input[type="checkbox"][name*="200358413"]'),
        doc.querySelectorAll<HTMLInputElement>('input[type="checkbox"][name*="200358415"]'),
      ];
      if (checkboxGroups.some((group) => group.length === 0)) {
        throw new Error("The consent fields could not be loaded in the secure form.");
      }
      checkboxGroups
        .flatMap((group) => Array.from(group))
        .forEach((checkbox) => {
          checkbox.checked = true;
          checkbox.dispatchEvent(new Event("input", { bubbles: true }));
          checkbox.dispatchEvent(new Event("change", { bubbles: true }));
        });

      const fileInput = doc.querySelector<HTMLInputElement>('input[type="file"]');
      if (!fileInput) {
        throw new Error("The document upload field could not be loaded in the secure form.");
      }
      const transfer = new DataTransfer();
      transfer.items.add(selectedFile);
      fileInput.files = transfer.files;
      fileInput.dispatchEvent(new Event("input", { bubbles: true }));
      fileInput.dispatchEvent(new Event("change", { bubbles: true }));

      const submitButton = doc.querySelector<HTMLButtonElement | HTMLInputElement>(
        'button[type="submit"], input[type="submit"], .fsSubmitButton',
      );
      if (!submitButton) {
        throw new Error("The secure form submit button could not be found.");
      }
      if (!submissionTargetRef.current) {
        throw new Error("The secure submission window could not be initialized.");
      }
      form.target = "formstack-submission-target";
      submitButton.click();

      if (submissionTimeoutRef.current !== null) {
        window.clearTimeout(submissionTimeoutRef.current);
      }
      submissionTimeoutRef.current = window.setTimeout(() => {
        setIsSubmitting(false);
        setSubmissionError(
          "Formstack has not confirmed the submission. Please try again or contact support.",
        );
      }, 45000);
    } catch (error) {
      setIsSubmitting(false);
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "The form could not be submitted. Please try again.",
      );
    }
  };

  const handleResetAll = () => {
    setStep1Data(null);
    setSelectedFile(null);
    setFileError(null);
    reset2();
    setStep(1);
  };

  const firstName = step1Data?.fullName.split(" ")[0] ?? "there";

  return (
    <div className="w-full">
      {step !== "done" && <StepIndicator currentStep={step} />}

      <AnimatePresence mode="wait">
        {/* ─── STEP 1: Personal Details (Compact 3 Fields) ─────────────────── */}
        {step === 1 && (
          <motion.form
            key="step1"
            onSubmit={handleSubmit1(onStep1Submit)}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.22 }}
            className="space-y-3.5"
            noValidate
          >
            <p className="text-left text-xs text-muted-foreground">
              Please provide your basic details. Soft verification with zero credit score impact.
            </p>

            {/* 3 Fields: Full Name, Email, Phone */}
            <div className="space-y-3">
              {/* Field 1: Full Name */}
              <Field label="Full Name / Nombre Completo" required error={errors1.fullName?.message}>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground/70">
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <Input
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. John Doe"
                    className={cn(
                      "h-9 pl-9 text-xs sm:text-sm font-medium transition-all duration-200",
                      "bg-background/80 hover:bg-background focus:bg-background",
                      "border-input/90 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/20",
                      errors1.fullName &&
                        "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
                    )}
                    {...register1("fullName")}
                  />
                </div>
              </Field>

              {/* Responsive 2-column grid for Email & Phone */}
              <div className="grid gap-3 sm:grid-cols-2">
                {/* Field 2: Email */}
                <Field label="Email / Correo" required error={errors1.email?.message}>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground/70">
                      <Mail className="h-3.5 w-3.5" />
                    </div>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="john@example.com"
                      className={cn(
                        "h-9 pl-9 text-xs sm:text-sm font-medium transition-all duration-200",
                        "bg-background/80 hover:bg-background focus:bg-background",
                        "border-input/90 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/20",
                        errors1.email &&
                          "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
                      )}
                      {...register1("email")}
                    />
                  </div>
                </Field>

                {/* Field 3: Phone */}
                <Field label="Phone / Teléfono" required error={errors1.phone?.message}>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground/70">
                      <Phone className="h-3.5 w-3.5" />
                    </div>
                    <Input
                      type="tel"
                      autoComplete="tel"
                      placeholder="(555) 000-0000"
                      className={cn(
                        "h-9 pl-9 text-xs sm:text-sm font-medium transition-all duration-200",
                        "bg-background/80 hover:bg-background focus:bg-background",
                        "border-input/90 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/20",
                        errors1.phone &&
                          "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
                      )}
                      {...register1("phone", {
                        onChange: (e) => {
                          const formatted = formatPhoneNumber(e.target.value);
                          setValue1("phone", formatted, { shouldValidate: true });
                        },
                      })}
                    />
                  </div>
                </Field>
              </div>
            </div>

            {/* Privacy Guarantee Note */}
            <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/[0.03] px-3 py-1.5 text-left">
              <Lock className="h-3.5 w-3.5 shrink-0 text-primary" />
              <p className="text-[11px] text-muted-foreground">
                <strong className="font-semibold text-foreground">Strict Privacy:</strong> 256-bit
                encrypted. Never sold or shared. Zero credit impact.
              </p>
            </div>

            {/* Next Button */}
            <Button
              type="submit"
              className={cn(
                "group relative h-10 w-full cursor-pointer rounded-xl bg-primary text-xs sm:text-sm font-bold text-primary-foreground shadow-sm transition-all duration-300",
                "hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              )}
            >
              <span className="flex items-center justify-center gap-1.5">
                Continue to Verification
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
          </motion.form>
        )}

        {/* ─── STEP 2: Left (Upload) + Right (eSignature & Consent) ─────────── */}
        {step === 2 && (
          <motion.form
            key="step2"
            onSubmit={handleSubmit2(onStep2Submit)}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.22 }}
            className="space-y-4"
            noValidate
          >
            {submissionError && (
              <p
                role="alert"
                className="rounded-lg border border-destructive/30 bg-destructive/[0.04] px-3 py-2 text-xs text-destructive"
              >
                {submissionError}
              </p>
            )}
            {/* Two Column Grid: Left (Upload) | Right (eSignature Info) */}
            <div className="grid gap-3.5 sm:grid-cols-12">
              {/* ─── LEFT COLUMN: Upload Document ─────────────────────────── */}
              <div className="space-y-2 text-left sm:col-span-5">
                <div>
                  <h4 className="text-xs font-bold text-foreground">Upload Document</h4>
                  <p className="text-[10.5px] text-muted-foreground">
                    Credit report or government ID
                  </p>
                </div>

                {/* Upload Card / Dropzone */}
                <div>
                  <label
                    htmlFor="credit-file-upload"
                    className={cn(
                      "group relative flex min-h-[125px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-3 text-center transition-all duration-200",
                      fileError
                        ? "border-destructive/80 bg-destructive/[0.03]"
                        : selectedFile
                          ? "border-primary/80 bg-primary/[0.04]"
                          : "border-border/80 bg-muted/20 hover:border-primary/60 hover:bg-primary/[0.02]",
                    )}
                  >
                    <input
                      id="credit-file-upload"
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={handleFileChange}
                      className="sr-only"
                    />

                    {selectedFile ? (
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div className="max-w-[170px]">
                          <p className="truncate text-xs font-bold text-foreground">
                            {selectedFile.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary">
                          <CheckCircle2 className="h-3 w-3" /> Selected • Click to replace
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105">
                          <Upload className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-foreground">
                            Drop file or <span className="text-primary underline">browse</span>
                          </p>
                          <p className="mt-0.5 text-[10px] text-muted-foreground">
                            PDF, PNG or JPG (max 15MB)
                          </p>
                        </div>
                      </div>
                    )}
                  </label>

                  {/* Remove file button if selected */}
                  {selectedFile && (
                    <div className="mt-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          setFileError(null);
                        }}
                        className="inline-flex cursor-pointer items-center gap-1 text-[10.5px] text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <X className="h-3 w-3" /> Remove
                      </button>
                    </div>
                  )}

                  {fileError && (
                    <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-destructive">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-destructive" />
                      {fileError}
                    </p>
                  )}
                </div>

                {/* Submitter summary pill */}
                {step1Data && (
                  <div className="rounded-md border border-border/60 bg-muted/30 px-2.5 py-1 text-[10.5px] text-muted-foreground truncate">
                    <span className="font-semibold text-foreground">{step1Data.fullName}</span> •{" "}
                    {step1Data.phone}
                  </div>
                )}
              </div>

              {/* ─── RIGHT COLUMN: eSignature & Consent to Communications ─── */}
              <div className="space-y-2 text-left sm:col-span-7">
                <div>
                  <h4 className="text-xs font-bold text-foreground">eSignature &amp; Consent</h4>
                  <p className="text-[10.5px] text-muted-foreground">
                    Review and confirm authorizations below
                  </p>
                </div>

                {/* Paragraph 1 + Checkbox 1 */}
                <div className="space-y-1.5 rounded-lg border border-border/70 bg-background p-2.5 shadow-xs">
                  <p className="text-[10px] sm:text-[10.5px] leading-snug text-muted-foreground">
                    By submitting this form, you agree to our{" "}
                    <strong className="font-semibold text-foreground">Terms of Use</strong>,{" "}
                    <strong className="font-semibold text-foreground">FTC Disclosures</strong>,{" "}
                    <strong className="font-semibold text-foreground">Privacy Policy</strong>,{" "}
                    <strong className="font-semibold text-foreground">
                      Dispute Resolution Policy
                    </strong>
                    , and binding arbitration on an individual basis and a waiver of all class or
                    representative actions, including TCPA and communications-related claims.
                  </p>

                  <div className="pt-0.5">
                    <Controller
                      name="termsConsent"
                      control={control2}
                      render={({ field }) => (
                        <div className="flex items-start gap-2">
                          <Checkbox
                            id="termsConsent"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5 h-3.5 w-3.5"
                          />
                          <Label
                            htmlFor="termsConsent"
                            className="cursor-pointer text-[10.5px] font-medium leading-tight text-foreground"
                          >
                            I have read and agree to all terms, policies, and disclosures listed
                            above.
                          </Label>
                        </div>
                      )}
                    />
                    {errors2.termsConsent && (
                      <p className="mt-0.5 flex items-center gap-1 text-[10.5px] font-medium text-destructive">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-destructive" />
                        {errors2.termsConsent.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Paragraph 2 + Checkbox 2 */}
                <div className="space-y-1.5 rounded-lg border border-border/70 bg-background p-2.5 shadow-xs">
                  <p className="text-[10px] sm:text-[10.5px] leading-snug text-muted-foreground">
                    You authorize us and our affiliates, partners, successors, and related brands
                    (present or future) to contact you via any communication channel (phone, SMS,
                    email, WhatsApp, AI or automated systems, prerecorded messages, or similar
                    technologies), to monitor or record calls, and to use AI-assisted agents,
                    regarding this and future matters. Consent is required to engage or transact.
                    SMS opt-out is by replying STOP. This agreement survives any opt-out or
                    termination.
                  </p>

                  <div className="pt-0.5">
                    <Controller
                      name="commConsent"
                      control={control2}
                      render={({ field }) => (
                        <div className="flex items-start gap-2">
                          <Checkbox
                            id="commConsent"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5 h-3.5 w-3.5"
                          />
                          <Label
                            htmlFor="commConsent"
                            className="cursor-pointer text-[10.5px] font-medium leading-tight text-foreground"
                          >
                            I consent to all communication methods and terms listed above.
                          </Label>
                        </div>
                      )}
                    />
                    {errors2.commConsent && (
                      <p className="mt-0.5 flex items-center gap-1 text-[10.5px] font-medium text-destructive">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-destructive" />
                        {errors2.commConsent.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions: Back & Submit */}
            <div className="flex gap-2.5 pt-1">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                disabled={isSubmitting}
                className="h-9 cursor-pointer gap-1.5 border-border/80 px-3.5 text-xs font-semibold"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "group relative h-9 flex-1 cursor-pointer rounded-xl bg-primary text-xs font-bold text-primary-foreground shadow-sm transition-all duration-300",
                  "hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                )}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-1.5">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Submitting Application…
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1.5">
                    Submit Application
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                )}
              </Button>
            </div>
          </motion.form>
        )}

        {/* ─── SUCCESS SCREEN ──────────────────────────────────────────────── */}
        {step === "done" && <SuccessScreen key="done" name={firstName} onReset={handleResetAll} />}
      </AnimatePresence>

      {/* ─── Hidden Formstack Bridge (Script & Multipart Submission) ───── */}
      <iframe
        ref={formstackIframeRef}
        title="Formstack Background Script"
        aria-hidden="true"
        tabIndex={-1}
        className="pointer-events-none absolute -left-[9999px] -top-[9999px] h-0 w-0 opacity-0"
      />
      <iframe
        ref={submissionTargetRef}
        name="formstack-submission-target"
        title="Formstack submission result"
        aria-hidden="true"
        tabIndex={-1}
        className="pointer-events-none absolute -left-[9999px] -top-[9999px] h-0 w-0 opacity-0"
      />
    </div>
  );
}
