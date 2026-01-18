"use client";

import { useState } from "react";
import { Mail, CheckCircle, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { earlyAccessBenefits, stats } from "@/data/landing-data";
import { toast } from "sonner";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("You're on the list! Check your email for confirmation.");
  };

  return (
    <section id="waitlist" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 pattern-dots opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-premium rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Left column - Form */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Early Access
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">
                Join the Waitlist
              </h2>

              <p className="text-muted-foreground mb-6">
                Be among the first to transform your indie hacker journey.
                Get early access and exclusive founding member benefits.
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Joining..." : "Join Waitlist"}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">You&apos;re on the list!</p>
                    <p className="text-sm text-muted-foreground">
                      Check your email for confirmation and next steps.
                    </p>
                  </div>
                </div>
              )}

              {/* Social proof */}
              <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                <span>
                  Join <strong className="text-foreground">{stats.indieHackers.toLocaleString()}+</strong> indie hackers on the waitlist
                </span>
              </div>
            </div>

            {/* Right column - Benefits */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Early Access Benefits
              </h3>

              <ul className="space-y-3">
                {earlyAccessBenefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 animate-card-enter"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Additional info */}
              <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">No spam, ever.</span>{" "}
                  We&apos;ll only email you about ShipLoop updates and your early access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
