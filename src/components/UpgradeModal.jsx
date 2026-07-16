import { useEffect } from "react";
import { Button } from "./ui/Button";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "/month",
    features: ["4 AI cover letters/mo", "2 mock interviews/mo", "Basic job search"],
    highlighted: false,
  },
  {
    name: "Prime",
    price: "₹199",
    period: "/month",
    features: ["Unlimited AI cover letters", "Unlimited mock interviews", "AI match scores", "2 mentor sessions"],
    highlighted: true,
  },
  {
    name: "Prime+",
    price: "₹399",
    period: "/month",
    features: ["Everything in Prime", "4 mentor sessions", "Resume cloud sync", "Premium templates"],
    highlighted: false,
  },
];

export function UpgradeModal({ isOpen, featureName = "this feature", onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">⭐</div>
          <h2 className="text-xl font-bold text-n-900">Unlock {featureName}</h2>
          <p className="text-n-500 text-sm mt-1">
            This feature is included in Prime. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-3 text-center ${
                plan.highlighted
                  ? "border-2 border-sk-primary bg-sk-surface"
                  : "border border-n-200"
              }`}
            >
              <p className="font-bold text-n-900 text-xs">{plan.name}</p>
              <p className="text-sk-primary font-extrabold text-base mt-0.5">
                {plan.price}
                <span className="text-n-400 font-normal text-xs">{plan.period}</span>
              </p>
              <ul className="mt-2 space-y-0.5">
                {plan.features.slice(0, 2).map((f) => (
                  <li key={f} className="text-n-500 text-xs leading-tight">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Button variant="primary-seeker" size="lg" fullWidth>
          See Prime Plans →
        </Button>

        <p
          className="text-n-400 text-sm text-center mt-3 cursor-pointer hover:text-n-700 transition-colors"
          onClick={onClose}
        >
          Maybe later
        </p>
      </div>
    </div>
  );
}
