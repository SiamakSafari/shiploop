import { NextRequest, NextResponse } from "next/server";
import { COACH_PERSONALITIES, CoachPersonality } from "@/lib/coach";

// Pre-defined responses for common questions (fallback when no AI API key)
const COACH_RESPONSES: Record<string, string[]> = {
  motivation: [
    "Remember: every big success started with someone just like you deciding to ship. You've got this!",
    "The best time to start was yesterday. The second best time is right now. What are you going to ship today?",
    "Your competitors are shipping while you're doubting. Let's change that energy!",
    "Success is just a series of small wins stacked up. What's your next small win?",
  ],
  stuck: [
    "When you're stuck, ship something tiny. A single commit. One tweet. Just move. Momentum builds momentum.",
    "Break it down smaller. What's the ONE thing you can do in the next 15 minutes?",
    "Perfectionism is the enemy of progress. Ship ugly, improve later.",
    "Take a 10-minute break, then come back with fresh eyes. Sometimes the best code is written after a walk.",
  ],
  pricing: [
    "Start higher than you think. It's easier to discount than to raise prices.",
    "Your pricing reflects your confidence. Charge what you're worth, not what you fear.",
    "Test your pricing. Run experiments. Let data guide you, not imposter syndrome.",
    "If no one complains about your price, you're charging too little.",
  ],
  launch: [
    "Launch when you're 80% ready. The last 20% takes forever and often doesn't matter.",
    "Your first launch is a learning experience, not a make-or-break moment.",
    "Set a launch date and work backwards. Deadlines create focus.",
    "Ship it. Get feedback. Iterate. Repeat. That's the whole game.",
  ],
  default: [
    "Keep shipping! Consistency beats intensity every time.",
    "What you're building matters. Don't give up when it gets hard.",
    "Every maker faces doubt. The successful ones ship anyway.",
    "Focus on your users, not your competitors. Serve them well and success follows.",
    "Your journey is unique. Compare yourself only to who you were yesterday.",
  ],
};

function getCoachResponse(personality: CoachPersonality, question: string): string {
  const lowercaseQuestion = question.toLowerCase();
  const config = COACH_PERSONALITIES[personality];

  // Determine response category
  let category = "default";
  if (lowercaseQuestion.includes("motivat") || lowercaseQuestion.includes("inspire") || lowercaseQuestion.includes("down")) {
    category = "motivation";
  } else if (lowercaseQuestion.includes("stuck") || lowercaseQuestion.includes("block") || lowercaseQuestion.includes("help")) {
    category = "stuck";
  } else if (lowercaseQuestion.includes("price") || lowercaseQuestion.includes("pricing") || lowercaseQuestion.includes("charge")) {
    category = "pricing";
  } else if (lowercaseQuestion.includes("launch") || lowercaseQuestion.includes("ship") || lowercaseQuestion.includes("release")) {
    category = "launch";
  }

  const responses = COACH_RESPONSES[category];
  const baseResponse = responses[Math.floor(Math.random() * responses.length)];

  // Personality-specific touches
  const personalityTouches: Record<CoachPersonality, string> = {
    "hype-beast": " LET'S GOOO! ",
    "zen-master": " Remember to breathe and stay present. ",
    "drill-sergeant": " No excuses. Get it done. ",
    "roast-master": " But hey, what do I know? You're the genius here. ",
  };

  const touch = personalityTouches[personality] || "";

  return `${config.avatar} ${baseResponse}${touch}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, personality = "hype-beast" } = body;

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured for AI responses
    const openaiKey = process.env.OPENAI_API_KEY;

    let response: string;

    if (openaiKey) {
      // Use OpenAI for more intelligent responses
      try {
        const config = COACH_PERSONALITIES[personality as CoachPersonality];

        const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: `You are ${config.name}, an AI coach for indie hackers and makers. Your personality: ${config.description}. Your catchphrase is "${config.catchphrase}". Be encouraging, actionable, and concise. Keep responses under 100 words.`,
              },
              {
                role: "user",
                content: question,
              },
            ],
            max_tokens: 150,
            temperature: 0.8,
          }),
        });

        const data = await aiResponse.json();
        response = `${config.avatar} ${data.choices?.[0]?.message?.content || getCoachResponse(personality as CoachPersonality, question)}`;
      } catch (aiError) {
        console.error("[Coach AI] OpenAI error, falling back to predefined:", aiError);
        response = getCoachResponse(personality as CoachPersonality, question);
      }
    } else {
      // Use predefined responses
      response = getCoachResponse(personality as CoachPersonality, question);
    }

    return NextResponse.json({
      response,
      personality,
      isAI: !!openaiKey,
    });
  } catch (error) {
    console.error("[Coach Ask] Error:", error);
    return NextResponse.json(
      { error: "Failed to get coach response" },
      { status: 500 }
    );
  }
}
