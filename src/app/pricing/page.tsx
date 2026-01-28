import { PricingCards } from "@/components/pricing/pricing-card";
import Link from "next/link";

export const metadata = {
  title: "Pricing - ShipLoop",
  description: "Simple pricing for indie hackers. Free to start, Pro to scale.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-semibold">ShipLoop</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-sm px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Simple pricing for{" "}
          <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
            shippers
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Start free. Upgrade when you're ready to ship faster.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4">
        <PricingCards />
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-muted-foreground">
                Yes! Cancel anytime from your settings. You'll keep Pro access until your billing period ends.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">What happens to my data if I downgrade?</h3>
              <p className="text-muted-foreground">
                Your data is safe. You'll keep access to your oldest project. Other projects become read-only until you upgrade again.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-muted-foreground">
                We don't offer refunds for partial months, but you can cancel anytime to prevent future charges.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Is there a student discount?</h3>
              <p className="text-muted-foreground">
                Email us at support@shiploop.app with your .edu email for 50% off Pro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2025 ShipLoop</p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/privacy.html" className="hover:text-foreground">Privacy</Link>
            <Link href="/terms.html" className="hover:text-foreground">Terms</Link>
            <a href="mailto:support@shiploop.app" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
