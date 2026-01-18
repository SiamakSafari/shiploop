import {
  LandingHeader,
  LandingFooter,
  HeroSection,
  SocialProofBar,
  FeaturesGrid,
  HowItWorks,
  TestimonialsSection,
  LeaderboardPreview,
  WaitlistSection,
  FAQSection,
  FinalCTA,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative">
      <LandingHeader />

      <main>
        {/* Hero - Full viewport with Ship Score preview */}
        <HeroSection />

        {/* Social Proof Bar - Animated counters */}
        <SocialProofBar />

        {/* Features Grid - Bento style */}
        <FeaturesGrid />

        {/* How It Works - 3 steps */}
        <HowItWorks />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Leaderboard Preview */}
        <LeaderboardPreview />

        {/* Waitlist Signup */}
        <WaitlistSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Final CTA */}
        <FinalCTA />
      </main>

      <LandingFooter />
    </div>
  );
}
