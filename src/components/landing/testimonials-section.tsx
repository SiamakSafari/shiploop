"use client";

import { testimonials } from "@/data/landing-data";
import { TestimonialCard } from "./testimonial-card";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm font-medium text-primary">
              Loved by indie hackers
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            See What Builders Are Saying
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of indie hackers who have transformed their shipping
            habits with ShipLoop.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              username={testimonial.username}
              avatar={testimonial.avatar}
              quote={testimonial.quote}
              product={testimonial.product}
              shipScore={testimonial.shipScore}
              mrr={testimonial.mrr}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
