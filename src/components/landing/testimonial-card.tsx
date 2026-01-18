"use client";

import { Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface TestimonialCardProps {
  name: string;
  username: string;
  avatar: string;
  quote: string;
  product: string;
  shipScore: number;
  mrr: string;
  index?: number;
}

export function TestimonialCard({
  name,
  username,
  avatar,
  quote,
  product,
  shipScore,
  mrr,
  index = 0,
}: TestimonialCardProps) {
  return (
    <div
      className="glass-premium rounded-2xl p-6 hover-lift animate-card-enter relative overflow-hidden group"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        {/* Quote icon */}
        <div className="absolute top-6 right-6 text-primary/20">
          <Quote className="h-8 w-8" />
        </div>

        {/* Quote */}
        <p className="text-foreground mb-6 leading-relaxed pr-8">
          &ldquo;{quote}&rdquo;
        </p>

        {/* Author info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 ring-2 ring-primary/20">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>
                {name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-foreground">{name}</p>
              <p className="text-sm text-muted-foreground">{username}</p>
            </div>
          </div>

          {/* Ship Score badge */}
          <div className="text-right">
            <Badge variant="secondary" className="mb-1">
              {product}
            </Badge>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-bold text-primary">{shipScore}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-emerald-500 font-medium">{mrr}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
