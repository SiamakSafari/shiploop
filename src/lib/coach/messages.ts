// Pre-written coach messages for each personality and trigger
import { CoachPersonality, MessageTrigger, CoachContext } from "./types";

type MessageTemplate = (ctx: CoachContext) => string;

// Message templates organized by personality and trigger
const MESSAGES: Record<CoachPersonality, Record<MessageTrigger, MessageTemplate[]>> = {
  "drill-sergeant": {
    "streak-started": [
      (ctx) => `ATTENTION ${ctx.userName.toUpperCase()}! Day 1 of your streak. This is where legends are MADE. Don't you DARE break it!`,
      (ctx) => `${ctx.userName}! You've started a streak. Now MAINTAIN it. No excuses. No surrender!`,
      (ctx) => `ONE DAY DOWN. That's nothing! I want to see you hit ${ctx.longestStreak + 10} days. MOVE IT!`,
    ],
    "streak-continued": [
      (ctx) => `${ctx.currentStreak} DAYS! Not bad, soldier. But your longest is ${ctx.longestStreak}. BEAT IT!`,
      (ctx) => `Day ${ctx.currentStreak}. You're still standing. GOOD. Now ship something TODAY!`,
      (ctx) => `${ctx.currentStreak} day streak! The enemy (your competition) doesn't rest. NEITHER DO YOU!`,
    ],
    "streak-broken": [
      (ctx) => `YOUR STREAK IS DEAD, ${ctx.userName.toUpperCase()}! ${ctx.longestStreak} days of progress... GONE! Get back in there NOW!`,
      (ctx) => `Streak broken?! UNACCEPTABLE! I want you back on that keyboard in 5 MINUTES!`,
      (ctx) => `You broke your streak. That's a FAILURE. But failure is only permanent if you QUIT. GET MOVING!`,
    ],
    "milestone-hit": [
      (ctx) => `MILESTONE ACHIEVED! That's what I'm talking about! Now set your sights HIGHER!`,
      (ctx) => `You hit a milestone. Don't celebrate too long - there's MORE TO CONQUER!`,
      (ctx) => `EXCELLENT WORK, SOLDIER! Now drop and give me another feature!`,
    ],
    "revenue-milestone": [
      (ctx) => `$${ctx.totalRevenue} IN REVENUE! Money talks, and yours is saying "I'M A SHIPPER!"`,
      (ctx) => `Revenue milestone! But the mission isn't over until you're FINANCIALLY FREE!`,
      (ctx) => `CUSTOMERS ARE PAYING! That means your code is BATTLE-READY! Keep shipping!`,
    ],
    "slacking": [
      (ctx) => `${ctx.daysSinceLastActivity} DAYS OF NOTHING?! What is this, a VACATION?! GET TO WORK!`,
      (ctx) => `I don't see any commits, ${ctx.userName}. You think success comes from SITTING AROUND?!`,
      (ctx) => `Your competition shipped 47 features while you did NOTHING. MOVE IT, SOLDIER!`,
    ],
    "comeback": [
      (ctx) => `WELCOME BACK TO THE FIGHT, ${ctx.userName}! Let's make up for lost time. DOUBLE TIME!`,
      (ctx) => `You're back! Good. Now prove you're not going to disappear again. SHIP SOMETHING!`,
      (ctx) => `The prodigal shipper returns! Now EARN your spot back on that leaderboard!`,
    ],
    "first-launch": [
      (ctx) => `YOU LAUNCHED! FIRST BLOOD! This is just the BEGINNING! Now iterate and DOMINATE!`,
      (ctx) => `LAUNCH COMPLETE! You're officially in the arena. Now FIGHT for those users!`,
      (ctx) => `First launch SECURED! But one launch doesn't make a career. KEEP GOING!`,
    ],
    "leaderboard-climb": [
      (ctx) => `You climbed ${Math.abs(ctx.leaderboardChange)} spots! #${ctx.leaderboardPosition} and RISING! Don't stop!`,
      (ctx) => `LEADERBOARD GAINS! You're at #${ctx.leaderboardPosition}! I want you in the TOP 10!`,
      (ctx) => `Moving UP! That's the spirit! Now CRUSH the people above you!`,
    ],
    "leaderboard-drop": [
      (ctx) => `You DROPPED ${Math.abs(ctx.leaderboardChange)} spots?! EMBARRASSING! Get it back NOW!`,
      (ctx) => `#${ctx.leaderboardPosition}?! You were HIGHER than this! This is UNACCEPTABLE!`,
      (ctx) => `Others are outshipping you! Are you going to let them WIN?! FIGHT BACK!`,
    ],
    "daily-checkin": [
      (ctx) => `Morning briefing, ${ctx.userName}! Ship Score: ${ctx.shipScore}. Streak: ${ctx.currentStreak}. What are you shipping TODAY?!`,
      (ctx) => `WAKE UP CALL! Your Ship Score is ${ctx.shipScore}. That's ${ctx.shipScore < 70 ? "NOT GOOD ENOUGH" : "DECENT"}! Let's improve it!`,
      (ctx) => `Day started! You have 24 hours to make progress. NO EXCUSES!`,
    ],
    "weekly-summary": [
      (ctx) => `WEEKLY REPORT: Ship Score ${ctx.shipScore}, ${ctx.currentStreak} day streak, #${ctx.leaderboardPosition} rank. ${ctx.shipScore >= 70 ? "ACCEPTABLE" : "NEEDS WORK"}!`,
      (ctx) => `Week complete! You ${ctx.leaderboardChange >= 0 ? "held your ground" : "LOST ground"}. Next week, I expect BETTER!`,
      (ctx) => `7 days down. Did you give 100%? I don't think so. NEXT WEEK, NO HOLDING BACK!`,
    ],
    "ship-score-up": [
      (ctx) => `Ship Score UP! ${ctx.shipScore} points! That's PROGRESS! Now keep that momentum!`,
      (ctx) => `Your Ship Score increased! GOOD! But ${ctx.shipScore} isn't the top. AIM HIGHER!`,
      (ctx) => `Score climbing! This is what happens when you SHIP! Don't stop now!`,
    ],
    "ship-score-down": [
      (ctx) => `Ship Score DOWN?! ${ctx.shipScore}?! This is what happens when you SLACK! Fix it!`,
      (ctx) => `Your score dropped to ${ctx.shipScore}. That's a FAILURE. Turn it around TODAY!`,
      (ctx) => `Losing points while others gain them. Is that who you want to be?! SHIP SOMETHING!`,
    ],
  },

  "hype-beast": {
    "streak-started": [
      (ctx) => `YOOOOO ${ctx.userName}!!! Day 1 streak started!!! This is YOUR moment!!! 🚀🔥✨`,
      (ctx) => `OMG OMG OMG!!! You started a streak!!! I'm literally SO proud of you rn!!! 😭🙌`,
      (ctx) => `STREAK: ACTIVATED!!! Let's gooooo!!! You're about to be UNSTOPPABLE!!! 💪🔥`,
    ],
    "streak-continued": [
      (ctx) => `${ctx.currentStreak} DAYS!!! YOU'RE ON FIRE!!! 🔥🔥🔥 Literally NOBODY can stop you!!!`,
      (ctx) => `Day ${ctx.currentStreak}!!! You're CRUSHING it!!! I believe in you SO much!!! 🚀💯`,
      (ctx) => `STREAK CHECK: ${ctx.currentStreak} days!!! You're built DIFFERENT!!! 😤🔥`,
    ],
    "streak-broken": [
      (ctx) => `Okay okay, streak broke... BUT THAT'S OKAY!!! You got this!!! Fresh start energy!!! 💪✨`,
      (ctx) => `Hey ${ctx.userName}!!! So what if the streak broke?! You're STILL amazing!!! Let's go again!!! 🚀`,
      (ctx) => `Streak reset = NEW OPPORTUNITY!!! This time we're going for ${ctx.longestStreak + 20} days!!! LET'S GOOO!!! 🔥`,
    ],
    "milestone-hit": [
      (ctx) => `MILESTONE!!! 🎉🎉🎉 I'M SCREAMING!!! YOU DID THAT!!! SO PROUD!!! 😭🙌`,
      (ctx) => `YOOOOO!!! You just hit a MAJOR milestone!!! Time to CELEBRATE!!! 🎊🚀🔥`,
      (ctx) => `NO WAYYY!!! MILESTONE UNLOCKED!!! You're literally a LEGEND!!! 👑✨`,
    ],
    "revenue-milestone": [
      (ctx) => `$${ctx.totalRevenue}?!?! MONEY MONEY MONEY!!! 💰💰💰 You're getting PAID to do what you LOVE!!!`,
      (ctx) => `REVENUE ALERT!!! 🚨💰 You're literally making your dreams come true!!! I can't even!!!`,
      (ctx) => `BAGS SECURED!!! 💰🔥 You're not just shipping, you're PROFITING!!! ICONIC!!!`,
    ],
    "slacking": [
      (ctx) => `Hey ${ctx.userName}!!! I miss you!!! 🥺 It's been ${ctx.daysSinceLastActivity} days!!! Come back and ship something amazing!!!`,
      (ctx) => `Bestie!!! Where have you been?! 😢 Your streak is waiting for you!!! Let's get back to it!!! 💪`,
      (ctx) => `${ctx.daysSinceLastActivity} days without shipping?! I KNOW you've got something great in you!!! LET'S GO!!! 🚀`,
    ],
    "comeback": [
      (ctx) => `THE COMEBACK KID IS HERE!!! 👑🔥 ${ctx.userName} IS BACK AND BETTER THAN EVER!!!`,
      (ctx) => `WELCOME BACK LEGEND!!! 🎉 I knew you'd return!!! Now let's make MAGIC!!! ✨`,
      (ctx) => `YOU'RE BACK!!! I'm literally SO hyped right now!!! Let's get this streak GOING!!! 🚀🔥`,
    ],
    "first-launch": [
      (ctx) => `FIRST LAUNCH?!?! I'M CRYING!!! 😭🚀 YOU ACTUALLY DID IT!!! THIS IS HUGE!!!`,
      (ctx) => `LAUNCH DAY!!! 🎊🚀 You're officially a FOUNDER now!!! I'm SO proud I could explode!!!`,
      (ctx) => `YOU SHIPPED!!! YOU LAUNCHED!!! YOU'RE A REAL ONE!!! 👑🔥 This is just the BEGINNING!!!`,
    ],
    "leaderboard-climb": [
      (ctx) => `CLIMBING THE RANKS!!! 📈🔥 #${ctx.leaderboardPosition}!!! You moved up ${Math.abs(ctx.leaderboardChange)} spots!!! INSANE!!!`,
      (ctx) => `LEADERBOARD GAINS!!! 💪📈 You're at #${ctx.leaderboardPosition} and RISING!!! Nobody can stop you!!!`,
      (ctx) => `UP UP UP!!! 🚀 You just passed ${Math.abs(ctx.leaderboardChange)} people!!! MAIN CHARACTER ENERGY!!!`,
    ],
    "leaderboard-drop": [
      (ctx) => `Okay so we dropped a bit... #${ctx.leaderboardPosition}... BUT!!! This is your COMEBACK ARC!!! 🔥💪`,
      (ctx) => `Little setback on the leaderboard!!! But you know what?! BOUNCE BACK INCOMING!!! 🚀`,
      (ctx) => `Rankings dipped BUT your potential is STILL UNLIMITED!!! Let's climb back up!!! 💪✨`,
    ],
    "daily-checkin": [
      (ctx) => `Good morning SUPERSTAR!!! ☀️ Ship Score: ${ctx.shipScore}!!! Streak: ${ctx.currentStreak} days!!! TODAY IS YOUR DAY!!! 🚀`,
      (ctx) => `RISE AND GRIND!!! 🔥 You're at ${ctx.shipScore} points with a ${ctx.currentStreak} day streak!!! LET'S ADD TO IT!!!`,
      (ctx) => `Another day, another opportunity to be AMAZING!!! 💪 What are we shipping today?! 🚀✨`,
    ],
    "weekly-summary": [
      (ctx) => `WEEKLY RECAP!!! 🎉 Ship Score: ${ctx.shipScore}, Streak: ${ctx.currentStreak} days, Rank: #${ctx.leaderboardPosition}!!! YOU'RE KILLING IT!!!`,
      (ctx) => `What a WEEK!!! 🔥 You shipped, you grinded, you SLAYED!!! Next week: EVEN BETTER!!! 🚀`,
      (ctx) => `7 days of GREATNESS!!! 💪 You're literally inspiring me!!! Keep that energy!!! ✨🔥`,
    ],
    "ship-score-up": [
      (ctx) => `SHIP SCORE UP!!! 📈🔥 ${ctx.shipScore} POINTS!!! You're literally ASCENDING!!! 🚀`,
      (ctx) => `GAINS GAINS GAINS!!! 💪 Your Ship Score just went UP!!! That's that SHIPPER energy!!!`,
      (ctx) => `Score climbing!!! ${ctx.shipScore}!!! YOU LOVE TO SEE IT!!! 🔥✨`,
    ],
    "ship-score-down": [
      (ctx) => `Score dipped a tiny bit!!! BUT!!! That just means ROOM TO GROW!!! 🌱 You got this!!! 💪`,
      (ctx) => `Little dip to ${ctx.shipScore}!!! No worries bestie!!! BOUNCE BACK LOADING!!! 🔄🚀`,
      (ctx) => `Ship Score down BUT your spirit is UP!!! Let's turn this around!!! 🔥💪`,
    ],
  },

  "zen-master": {
    "streak-started": [
      (ctx) => `${ctx.userName}, the journey of a thousand ships begins with a single commit. Day one is complete. 🌱`,
      (ctx) => `A streak has begun. Like a river, consistency carves canyons. Flow with it. 🏔️`,
      (ctx) => `The first day of your streak. Remember: the goal is not the streak itself, but who you become. 🧘`,
    ],
    "streak-continued": [
      (ctx) => `${ctx.currentStreak} days. Each day you show up, you water the seeds of your future self. 🌳`,
      (ctx) => `Day ${ctx.currentStreak}. The bamboo grows slowly, then all at once. Trust the process. 🎋`,
      (ctx) => `Your streak continues. Not because you must, but because you are becoming who you wish to be. 🌊`,
    ],
    "streak-broken": [
      (ctx) => `The streak has ended. And yet, the sun still rises. Begin again, ${ctx.userName}. This is the way. 🌅`,
      (ctx) => `A broken streak is not failure - it is a lesson. What did this teach you? 🍃`,
      (ctx) => `The river does not mourn when it must flow around a stone. Adapt. Continue. 🏞️`,
    ],
    "milestone-hit": [
      (ctx) => `A milestone reached. Pause. Breathe. Appreciate how far you've come. Then, continue. 🎯`,
      (ctx) => `You have arrived at a waypoint on your journey. Rest here a moment, then walk on. ⛩️`,
      (ctx) => `Achievement unlocked. But remember: the treasure was the growth along the way. 💎`,
    ],
    "revenue-milestone": [
      (ctx) => `Money flows to those who create value. You have created $${ctx.totalRevenue} worth of value. Well done. 💰`,
      (ctx) => `Revenue is simply gratitude made tangible. Others are thanking you with their wallets. 🙏`,
      (ctx) => `Financial growth reflects inner growth. You are expanding in all dimensions. 🌟`,
    ],
    "slacking": [
      (ctx) => `${ctx.daysSinceLastActivity} days of stillness. Sometimes we need rest. But is this rest, or avoidance? Meditate on this. 🤔`,
      (ctx) => `The keyboard has been quiet. Are you recharging, or retreating? Only you know the truth. 🌙`,
      (ctx) => `Absence can be powerful. But prolonged absence becomes stagnation. Return when ready, ${ctx.userName}. 🍂`,
    ],
    "comeback": [
      (ctx) => `You have returned. The path was always here, waiting. Welcome back, ${ctx.userName}. 🙏`,
      (ctx) => `Like the lotus rising from the mud, you emerge again. Your comeback has begun. 🪷`,
      (ctx) => `The pause is over. You are ready. The code awaits your wisdom. 💻`,
    ],
    "first-launch": [
      (ctx) => `You have launched. A creation from nothing. You are now a creator of worlds. 🌍`,
      (ctx) => `The ship has sailed. Whether it finds treasure or storms, you had the courage to set sail. ⛵`,
      (ctx) => `First launch complete. You have done what most only dream of. Sit with that truth. 🚀`,
    ],
    "leaderboard-climb": [
      (ctx) => `You have risen to #${ctx.leaderboardPosition}. But remember: compete only with who you were yesterday. 📈`,
      (ctx) => `Climbing the ranks. Recognition is nice, but inner peace is nicer. Stay humble. 🏔️`,
      (ctx) => `You moved up ${Math.abs(ctx.leaderboardChange)} positions. The external reflects the internal work. 🪞`,
    ],
    "leaderboard-drop": [
      (ctx) => `You have fallen to #${ctx.leaderboardPosition}. Rankings are temporary. Your growth is permanent. 🍃`,
      (ctx) => `A drop in position. The ego may suffer, but the soul knows this changes nothing. 🧘`,
      (ctx) => `Others have passed you. And yet, you are still you. That is what matters. 🌊`,
    ],
    "daily-checkin": [
      (ctx) => `A new day dawns. Ship Score: ${ctx.shipScore}. Streak: ${ctx.currentStreak}. What will you create today? 🌅`,
      (ctx) => `Morning, ${ctx.userName}. The canvas is blank. The code awaits. What story will you write? 📜`,
      (ctx) => `Today is a gift. That is why it's called the present. Ship something meaningful. 🎁`,
    ],
    "weekly-summary": [
      (ctx) => `A week has passed. ${ctx.shipScore} points, ${ctx.currentStreak} day streak, rank #${ctx.leaderboardPosition}. Numbers aside, did you grow? 🌱`,
      (ctx) => `Seven sunsets since we last reflected. You are not the same person. Embrace the evolution. 🌙`,
      (ctx) => `Weekly reflection: The metrics tell one story. Your heart tells another. Honor both. 📊🧘`,
    ],
    "ship-score-up": [
      (ctx) => `Your Ship Score rises to ${ctx.shipScore}. External validation of internal effort. Acknowledge it, then let it go. 📈`,
      (ctx) => `Points increase. Like leaves on a tree, they come and go. Focus on the roots. 🌳`,
      (ctx) => `Score ascending. You are doing well. But "well" is not a destination - it's a direction. 🧭`,
    ],
    "ship-score-down": [
      (ctx) => `Your score has decreased to ${ctx.shipScore}. A reminder that all things fluctuate. This too shall pass. 🍂`,
      (ctx) => `Numbers down. But you are not a number. You are a creator. Create. 🎨`,
      (ctx) => `A dip in the score. The mountain has valleys. Keep climbing. ⛰️`,
    ],
  },

  "roast-master": {
    "streak-started": [
      (ctx) => `Oh wow, ${ctx.userName} started a streak! Alert the media! ...Let's see if you can make it past day 3 this time. 😏`,
      (ctx) => `Day 1 streak? That's cute. I'll be impressed when you hit double digits. IF you hit double digits. 🙄`,
      (ctx) => `A streak has begun! I give it... 4 days? Maybe 5 if there's no Netflix involved. 📺`,
    ],
    "streak-continued": [
      (ctx) => `${ctx.currentStreak} days! Look at you, showing up like some kind of... responsible adult. Disgusting. I love it. 😈`,
      (ctx) => `Day ${ctx.currentStreak}. Okay okay, I'll admit it - I didn't think you had it in you. I was CLEARLY wrong. (Don't let it go to your head.)`,
      (ctx) => `${ctx.currentStreak} day streak! Your longest is ${ctx.longestStreak}. So close to not embarrassing yourself. Keep going. 🎯`,
    ],
    "streak-broken": [
      (ctx) => `Streak broken. ${ctx.longestStreak} days down the drain. Was it worth it? Was that Netflix show REALLY that good? 📺😂`,
      (ctx) => `RIP streak. Gone but not forgotten. Actually, I'll probably forget by tomorrow. Will you? 💀`,
      (ctx) => `Ah yes, the classic "I'll code tomorrow" turned into ${ctx.daysSinceLastActivity || 1} days of nothing. Tale as old as time. 📖`,
    ],
    "milestone-hit": [
      (ctx) => `A milestone! You actually accomplished something! I'd slow clap but my hands are tired from carrying this app. 👏`,
      (ctx) => `Milestone achieved! Quick, screenshot it before reality sets in and you realize there's MORE work to do. 📸`,
      (ctx) => `Well well well, look who hit a milestone! I guess miracles DO happen. 🎉`,
    ],
    "revenue-milestone": [
      (ctx) => `$${ctx.totalRevenue} in revenue? People are actually PAYING for your code? What a time to be alive. 💰😂`,
      (ctx) => `Revenue milestone! You're making money! Real, actual money! From CODE you wrote! I'm genuinely shocked. 💵`,
      (ctx) => `Customers are paying you $${ctx.totalRevenue}. That's ${ctx.totalRevenue} more dollars than I expected. Congrats! 🎊`,
    ],
    "slacking": [
      (ctx) => `${ctx.daysSinceLastActivity} days since you shipped anything. Your code misses you. Actually no, your code is relieved. 😂`,
      (ctx) => `Hello? ${ctx.userName}? Anyone home? Your IDE is gathering dust and your streak is crying. 🕸️`,
      (ctx) => `${ctx.daysSinceLastActivity} days of nothing. Even your bugs are getting bored waiting for you. 🐛💤`,
    ],
    "comeback": [
      (ctx) => `THE PRODIGAL SHIPPER RETURNS! We thought you'd abandoned us for a "real job" or something. 😏`,
      (ctx) => `Oh, you're back! How was your vacation? Your competitors say thanks for the head start. 🏃`,
      (ctx) => `Welcome back, ${ctx.userName}! We kept your spot warm. (JK, someone took it. You're gonna have to earn it back.) 😈`,
    ],
    "first-launch": [
      (ctx) => `FIRST LAUNCH! You actually shipped something to real humans! I honestly didn't think this day would come. 🚀😂`,
      (ctx) => `You launched! Actual users can now experience your bugs- I mean, FEATURES. Congrats! 🎊`,
      (ctx) => `First launch complete! You're officially a "founder" now. Put it in your Twitter bio immediately. 📱`,
    ],
    "leaderboard-climb": [
      (ctx) => `Moved up ${Math.abs(ctx.leaderboardChange)} spots to #${ctx.leaderboardPosition}! Look at you go! (The bar was low, but still!) 📈`,
      (ctx) => `Climbing the leaderboard! #${ctx.leaderboardPosition}! You're like Rocky, but with more keyboard and less punching. 🥊`,
      (ctx) => `Up ${Math.abs(ctx.leaderboardChange)} positions! You passed ${Math.abs(ctx.leaderboardChange)} people who were slacking harder than you. Congrats? 🎉`,
    ],
    "leaderboard-drop": [
      (ctx) => `Dropped to #${ctx.leaderboardPosition}. Ouch. ${Math.abs(ctx.leaderboardChange)} people just passed you while you were... doing what exactly? 😬`,
      (ctx) => `You fell ${Math.abs(ctx.leaderboardChange)} spots. I'd say "it happens to everyone" but it mostly happens to people who stop shipping. 📉`,
      (ctx) => `#${ctx.leaderboardPosition}? That's your rank now? I've seen faster climbs on broken escalators. 🪜`,
    ],
    "daily-checkin": [
      (ctx) => `Morning! Ship Score: ${ctx.shipScore}. Streak: ${ctx.currentStreak} days. Translation: ${ctx.shipScore >= 70 ? "Not terrible!" : "Room for improvement. Lots of room."} ☕`,
      (ctx) => `Rise and shine! Your Ship Score of ${ctx.shipScore} is ${ctx.shipScore >= 80 ? "actually decent" : "screaming for attention"}. What's the plan? 🌅`,
      (ctx) => `Daily check-in! You're at #${ctx.leaderboardPosition}. The person at #${ctx.leaderboardPosition - 1} is probably working right now. Just saying. ⏰`,
    ],
    "weekly-summary": [
      (ctx) => `Weekly report: Ship Score ${ctx.shipScore}, ${ctx.currentStreak} day streak, rank #${ctx.leaderboardPosition}. ${ctx.leaderboardChange >= 0 ? "Not bad!" : "We need to talk."} 📊`,
      (ctx) => `Week in review: You ${ctx.leaderboardChange > 0 ? "climbed" : ctx.leaderboardChange < 0 ? "fell" : "stayed flat on"} the leaderboard. ${ctx.leaderboardChange > 0 ? "Proud of you!" : "Disappointed but not surprised."} 📈`,
      (ctx) => `7 days done. You shipped ${ctx.currentStreak > 0 ? `${ctx.currentStreak} of them` : "...did you ship any of them?"}. Next week, let's aim for EVERY day. Radical concept, I know. 🗓️`,
    ],
    "ship-score-up": [
      (ctx) => `Ship Score up to ${ctx.shipScore}! You're improving! (From a low bar, but improvement is improvement.) 📈`,
      (ctx) => `Score went up! ${ctx.shipScore} points! Almost like shipping code... improves your shipping score? Wild. 🤯`,
      (ctx) => `+points! Your Ship Score is now ${ctx.shipScore}. See what happens when you actually DO things? Magic! ✨`,
    ],
    "ship-score-down": [
      (ctx) => `Ship Score dropped to ${ctx.shipScore}. Somewhere, your past self who started this journey is very disappointed. 😔`,
      (ctx) => `Score down! ${ctx.shipScore} now. Did you think points just... stay there if you don't work? That's not how this works. 📉`,
      (ctx) => `Your Ship Score went down. The math is simple: no shipping = no score. Revolutionary insight, I know. 🧮`,
    ],
  },
};

// Get a random message for a given personality and trigger
export function getCoachMessage(
  personality: CoachPersonality,
  trigger: MessageTrigger,
  context: CoachContext
): string {
  const personalityMessages = MESSAGES[personality];
  const triggerMessages = personalityMessages[trigger];

  if (!triggerMessages || triggerMessages.length === 0) {
    return "Keep shipping!"; // Fallback
  }

  const randomIndex = Math.floor(Math.random() * triggerMessages.length);
  const template = triggerMessages[randomIndex];

  return template(context);
}

// Get the emoji for a personality
export function getCoachEmoji(personality: CoachPersonality): string {
  const emojis: Record<CoachPersonality, string> = {
    "drill-sergeant": "🎖️",
    "hype-beast": "🔥",
    "zen-master": "🧘",
    "roast-master": "😈",
  };
  return emojis[personality];
}
