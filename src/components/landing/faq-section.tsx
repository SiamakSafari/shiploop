"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqs } from "@/data/landing-data";
import { cn } from "@/lib/utils";

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div
      className="glass-premium rounded-xl overflow-hidden animate-card-enter"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
      >
        <span className="font-medium text-foreground pr-4">{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="px-6 pb-4 text-muted-foreground">
          {answer}
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-muted/30">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-grid opacity-30" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <HelpCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              FAQ
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about ShipLoop.
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
              index={index}
            />
          ))}
        </div>

        {/* Additional help */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a href="mailto:hello@shiploop.app" className="text-primary font-medium hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
