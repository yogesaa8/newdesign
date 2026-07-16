import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, X, Zap } from "lucide-react";
import Footer from "../components/Footer";
import useSEO from "@/seo/useSEO";
import toast from "@/lib/toast";

const SEEKER_PLANS = [
  {
    name: "Free",
    monthly: 0,
    annual: 0,
    tagline: "Everything to start your job search",
    cta: "Get Started",
    href: "/seeker/signup",
    featured: false,
    features: [
      { label: "Browse all jobs", included: true },
      { label: "Apply to 5 jobs / month", included: true },
      { label: "Basic resume builder", included: true },
      { label: "Save up to 10 jobs", included: true },
      { label: "AI cover letter (3/month)", included: true },
      { label: "AI job match score", included: false },
      { label: "Unlimited applications", included: false },
      { label: "Interview prep access", included: false },
      { label: "1:1 Mentor session", included: false },
      { label: "Priority support", included: false },
    ],
  },
  {
    name: "Prime",
    monthly: 199,
    annual: 99,
    tagline: "For serious job seekers who want results faster",
    cta: "Start Prime",
    href: null,
    featured: true,
    badge: "Most Popular",
    features: [
      { label: "Browse all jobs", included: true },
      { label: "Unlimited applications", included: true },
      { label: "Advanced resume templates", included: true },
      { label: "Unlimited saved jobs", included: true },
      { label: "Unlimited AI cover letters", included: true },
      { label: "AI job match score", included: true },
      { label: "Interview prep access", included: true },
      { label: "1:1 Mentor session (2/month)", included: true },
      { label: "Application analytics", included: true },
      { label: "Priority support", included: false },
    ],
  },
  {
    name: "Prime+",
    monthly: 399,
    annual: 199,
    tagline: "Maximum edge for placement & campus drives",
    cta: "Start Prime+",
    href: null,
    featured: false,
    features: [
      { label: "Browse all jobs", included: true },
      { label: "Unlimited applications", included: true },
      { label: "Advanced resume templates", included: true },
      { label: "Unlimited saved jobs", included: true },
      { label: "Unlimited AI cover letters", included: true },
      { label: "AI job match score", included: true },
      { label: "Interview prep access", included: true },
      { label: "1:1 Mentor session (unlimited)", included: true },
      { label: "Application analytics", included: true },
      { label: "Priority support", included: true },
    ],
  },
];

const COMPANY_PLANS = [
  {
    name: "Starter",
    monthly: 0,
    annual: 0,
    tagline: "Try FJI risk-free",
    cta: "Get Started",
    href: "/company/signup",
    featured: false,
    features: [
      { label: "1 active job post", included: true },
      { label: "Basic applicant view", included: true },
      { label: "Manual shortlisting", included: true },
      { label: "AI applicant ranking", included: false },
      { label: "Analytics dashboard", included: false },
      { label: "Branded job page", included: false },
      { label: "Priority listing", included: false },
    ],
  },
  {
    name: "Growth",
    monthly: 999,
    annual: 499,
    tagline: "For growing teams hiring consistently",
    cta: "Start Growth",
    href: null,
    featured: true,
    badge: "Most Popular",
    features: [
      { label: "10 active job posts", included: true },
      { label: "Full applicant view", included: true },
      { label: "Manual shortlisting", included: true },
      { label: "AI applicant ranking", included: true },
      { label: "Analytics dashboard", included: true },
      { label: "Branded job page", included: true },
      { label: "Priority listing", included: false },
    ],
  },
  {
    name: "Scale",
    monthly: 2999,
    annual: 1499,
    tagline: "High-volume hiring with full automation",
    cta: "Start Scale",
    href: null,
    featured: false,
    features: [
      { label: "Unlimited job posts", included: true },
      { label: "Full applicant view", included: true },
      { label: "Bulk shortlisting tools", included: true },
      { label: "AI applicant ranking", included: true },
      { label: "Advanced analytics", included: true },
      { label: "Branded job page", included: true },
      { label: "Priority listing", included: true },
    ],
  },
  {
    name: "Enterprise",
    monthly: 9999,
    annual: 4999,
    tagline: "Custom SLAs, integrations & dedicated support",
    cta: "Contact Sales",
    href: "mailto:sales@firstjobind.in",
    featured: false,
    features: [
      { label: "Unlimited job posts", included: true },
      { label: "Full applicant view", included: true },
      { label: "Bulk shortlisting tools", included: true },
      { label: "AI applicant ranking", included: true },
      { label: "Custom analytics", included: true },
      { label: "Custom branded page", included: true },
      { label: "Dedicated account manager", included: true },
    ],
  },
];

const FAQS = [
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes. Cancel anytime from your account settings. You keep Prime access until the end of the billing period — no partial refunds, no questions.",
  },
  {
    q: "Is my payment information secure?",
    a: "Payments are processed via Razorpay, a PCI-DSS Level 1 compliant gateway. We never store your card details.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a 7-day money-back guarantee on your first Prime subscription. If you're not satisfied, contact support within 7 days of purchase.",
  },
  {
    q: "Can I switch plans mid-month?",
    a: "Yes. Upgrading takes effect immediately and is prorated. Downgrading takes effect at the next renewal date.",
  },
  {
    q: "Is there a student discount?",
    a: "Yes — students with a valid .edu or college email get 30% off Prime. Apply via the student verification form during checkout.",
  },
];

export default function Pricing() {
  const [audience, setAudience] = useState("seeker");
  const [annual, setAnnual] = useState(false);

  const seoElement = useSEO({
    title: "Pricing | FirstJobIndia",
    description: "Transparent pricing for job seekers and companies. Free to start, upgrade when you're ready.",
    path: "/pricing",
  });

  const plans = audience === "seeker" ? SEEKER_PLANS : COMPANY_PLANS;

  function handlePaidCta() {
    toast.info("Payments coming soon! We'll notify you when Prime launches.");
  }

  return (
    <>
      {seoElement}

      {/* Hero */}
      <section className="bg-n-900 py-20 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <span className="inline-block rounded-full bg-sk-surface px-3 py-1 text-xs font-semibold text-sk-primary">
            Simple pricing
          </span>
          <h1 className="mt-4 text-4xl font-extrabold text-white md:text-5xl">
            Plans that grow with you
          </h1>
          <p className="mt-4 text-lg text-n-400">
            Free to start. Upgrade when you need more power.
          </p>

          {/* Audience toggle */}
          <div className="mt-8 inline-flex rounded-xl bg-white/5 p-1">
            {["seeker", "company"].map((tab) => (
              <button
                key={tab}
                onClick={() => setAudience(tab)}
                className={`rounded-lg px-6 py-2 text-sm font-semibold transition ${
                  audience === tab
                    ? "bg-white text-n-900 shadow"
                    : "text-n-400 hover:text-white"
                }`}
              >
                {tab === "seeker" ? "For Seekers" : "For Companies"}
              </button>
            ))}
          </div>

          {/* Period toggle */}
          <div className="mt-4 flex items-center justify-center gap-3 text-sm text-n-400">
            <span className={!annual ? "font-semibold text-white" : ""}>Monthly</span>
            <button
              onClick={() => setAnnual((p) => !p)}
              className={`relative h-6 w-11 rounded-full transition ${annual ? "bg-sk-primary" : "bg-white/20"}`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  annual ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
            <span className={annual ? "font-semibold text-white" : ""}>
              Annual{" "}
              <span className="ml-1 rounded-full bg-success/20 px-2 py-0.5 text-xs font-bold text-success">
                Save ~50%
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Plan cards */}
      <section className="bg-n-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div
            className={`grid gap-6 ${
              plans.length === 4
                ? "sm:grid-cols-2 xl:grid-cols-4"
                : "sm:grid-cols-3"
            }`}
          >
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  plan.featured
                    ? audience === "seeker"
                      ? "scale-[1.02] border-2 border-sk-primary bg-white shadow-xl"
                      : "scale-[1.02] border-2 border-co-primary bg-white shadow-xl"
                    : "border-n-200 bg-white shadow-sm"
                }`}
              >
                {plan.badge && (
                  <span
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-bold text-white ${
                      audience === "seeker" ? "bg-sk-primary" : "bg-co-primary"
                    }`}
                  >
                    {plan.badge}
                  </span>
                )}

                <p className="text-lg font-bold text-n-900">{plan.name}</p>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-n-900">
                    {annual ? plan.annual : plan.monthly === 0 ? "Free" : `₹${plan.monthly}`}
                  </span>
                  {(annual ? plan.annual : plan.monthly) > 0 && (
                    <span className="mb-1 text-sm text-n-400">/mo</span>
                  )}
                </div>
                <p className="mt-1 text-xs text-n-500">{plan.tagline}</p>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f.label} className="flex items-center gap-2 text-sm">
                      {f.included ? (
                        <Check className="h-4 w-4 shrink-0 text-success" />
                      ) : (
                        <X className="h-4 w-4 shrink-0 text-n-300" />
                      )}
                      <span className={f.included ? "text-n-700" : "text-n-300"}>
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  {plan.href ? (
                    <Link
                      to={plan.href}
                      className={`block w-full rounded-xl py-3 text-center text-sm font-semibold transition ${
                        plan.featured
                          ? audience === "seeker"
                            ? "bg-sk-primary text-white hover:bg-sk-hover"
                            : "bg-co-primary text-white hover:bg-co-hover"
                          : "border border-n-200 text-n-700 hover:bg-n-50"
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  ) : (
                    <button
                      onClick={handlePaidCta}
                      className={`w-full rounded-xl py-3 text-sm font-semibold transition ${
                        plan.featured
                          ? audience === "seeker"
                            ? "bg-sk-primary text-white hover:bg-sk-hover"
                            : "bg-co-primary text-white hover:bg-co-hover"
                          : "border border-n-200 text-n-700 hover:bg-n-50"
                      }`}
                    >
                      {plan.cta}
                    </button>
                  )}
                  {plan.featured && (
                    <p className="mt-2 text-center text-xs text-n-400">
                      No credit card required
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-n-400">
            All prices in INR. Taxes as applicable.{" "}
            <Link to="/terms" className="text-sk-primary underline">
              Terms apply.
            </Link>
          </p>
        </div>
      </section>

      {/* Feature comparison callout */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="inline-flex items-center justify-center gap-2 rounded-xl bg-sk-surface px-4 py-2">
            <Zap className="h-4 w-4 text-sk-primary" />
            <span className="text-sm font-semibold text-sk-primary">
              Every paid plan includes a 7-day money-back guarantee
            </span>
          </div>
          <p className="mt-4 text-n-500 text-sm">
            Not happy? Email us within 7 days for a full refund — no forms, no waiting.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-n-50 py-20">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="mb-10 text-center text-3xl font-extrabold text-n-900">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-n-200 bg-white"
              >
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-n-900 list-none">
                  {item.q}
                  <span className="ml-4 shrink-0 text-n-400 transition group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <p className="border-t border-n-100 px-5 pb-4 pt-3 text-sm leading-relaxed text-n-500">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
