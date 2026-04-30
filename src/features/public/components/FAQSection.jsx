import React, { useState } from "react";
const faqs = [
  {
    question: "How do I update my billing information?",
    answer:
      'To update your billing information, log in and go to the billing or payment page. Look for an option to "Update payment method" or "Edit billing information" and follow the prompts. Be sure to save your changes before exiting.',
  },
  {
    question: "How do I delete my account?",
    answer:
      "To delete your account, go to account settings and select delete account option. Follow the steps to confirm.",
  },
  {
    question: "How do I join a group or community?",
    answer:
      "You can join a group by navigating to the community section and selecting a group of your choice.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact support via the contact form or email provided in the support section.",
  },
  {
    question: "Which is better short term or long term?",
    answer:
      "It depends on your goals. Short term is good for quick results, long term for stability.",
  },
  {
    question: "How do I change my email address?",
    answer:
      "Go to account settings and update your email under profile section.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-surface py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-on-surface">
            Frequently Asked Questions
          </h2>
          <p className="text-outline mt-2">
            Trusted in more than 100 countries and 5 million customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT SIDE - ACCORDION */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded-xl border border-outline-variant p-5 cursor-pointer transition hover:border-blue-200 hover:shadow-[0_12px_30px_rgba(37,99,235,0.08)] ${
                  activeIndex === index ? "bg-secondary-container" : "bg-surface-container-low"
                }`}
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-on-surface font-medium">{faq.question}</h3>

                  <span className="text-primary text-xl">
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </div>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeIndex === index ? "max-h-40 mt-3" : "max-h-0"
                  }`}
                >
                  <p className="text-on-surface-variant text-sm">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE - CONTACT FORM */}
          <div className="bg-white rounded-xl border border-outline-variant p-6 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
            <h3 className="text-lg font-semibold text-on-surface mb-2">
              In what way can we help?
            </h3>
            <p className="text-outline text-sm mb-4">
              Feel free to reach out to us with your inquiries.
            </p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="John Smith"
                className="w-full border border-input bg-slate-100 rounded-xl px-4 py-2 text-on-surface placeholder:text-slate-400 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />

              <input
                type="email"
                placeholder="pagedone@gmail.com"
                className="w-full border border-input bg-slate-100 rounded-xl px-4 py-2 text-on-surface placeholder:text-slate-400 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />

              <textarea
                placeholder="Enter here..."
                className="w-full border border-input bg-slate-100 rounded-xl px-4 py-2 h-28 text-on-surface placeholder:text-slate-400 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              ></textarea>

              <button className="bg-primary text-white px-6 py-2 rounded-xl w-full shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:bg-primary-hover active:bg-primary-active transition-colors">
                Submit Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
