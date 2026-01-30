import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface StreakReminderEmailProps {
  username: string;
  currentStreak: number;
  bestStreak: number;
}

export function StreakReminderEmail({
  username = "Maker",
  currentStreak = 5,
  bestStreak = 10,
}: StreakReminderEmailProps) {
  const isAtRisk = currentStreak > 0;
  const previewText = isAtRisk
    ? `Don't break your ${currentStreak}-day streak! Ship something today.`
    : "Start a new shipping streak today!";

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={logoSection}>
            <Text style={logo}>ShipLoop</Text>
          </Section>

          {/* Hero */}
          <Section style={heroSection}>
            {isAtRisk ? (
              <>
                <Text style={fireEmoji}>&#128293;</Text>
                <Heading style={heading}>
                  Don&apos;t break your streak!
                </Heading>
                <Text style={subheading}>
                  You&apos;re on a <span style={highlightText}>{currentStreak}-day</span> shipping streak
                </Text>
              </>
            ) : (
              <>
                <Text style={rocketEmoji}>&#128640;</Text>
                <Heading style={heading}>
                  Start shipping today!
                </Heading>
                <Text style={subheading}>
                  Begin your journey to the leaderboard
                </Text>
              </>
            )}
          </Section>

          <Hr style={hr} />

          {/* Main content */}
          <Section style={contentSection}>
            <Text style={greeting}>Hey {username},</Text>

            {isAtRisk ? (
              <>
                <Text style={paragraph}>
                  You&apos;ve been on fire lately! Your {currentStreak}-day shipping streak
                  is impressive, but it expires in just a few hours.
                </Text>

                <Text style={paragraph}>
                  Don&apos;t let all that momentum go to waste. Even a small commit,
                  a quick update, or engaging with your community counts!
                </Text>

                {currentStreak >= bestStreak && (
                  <Section style={achievementBox}>
                    <Text style={achievementText}>
                      &#127942; You&apos;re about to beat your personal best of {bestStreak} days!
                    </Text>
                  </Section>
                )}
              </>
            ) : (
              <>
                <Text style={paragraph}>
                  We noticed you haven&apos;t shipped anything recently.
                  Every indie hacker journey starts with a single commit.
                </Text>

                <Text style={paragraph}>
                  Your best streak was <strong>{bestStreak} days</strong>.
                  Ready to beat that? Start today and build unstoppable momentum!
                </Text>
              </>
            )}

            <Section style={buttonSection}>
              <Button style={button} href="https://shiploop.io/dashboard">
                Open ShipLoop
              </Button>
            </Section>

            <Section style={tipsSection}>
              <Text style={tipsTitle}>Quick ways to ship today:</Text>
              <Text style={tipItem}>&#8226; Push a small code improvement</Text>
              <Text style={tipItem}>&#8226; Share a build update on social media</Text>
              <Text style={tipItem}>&#8226; Reply to a user&apos;s feedback</Text>
              <Text style={tipItem}>&#8226; Update your project documentation</Text>
            </Section>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              ShipLoop - The Indie Hacker Operating System
            </Text>
            <Text style={footerLinks}>
              <Link href="https://shiploop.io/dashboard/settings" style={link}>
                Email preferences
              </Link>
              {" | "}
              <Link href="https://shiploop.io" style={link}>Website</Link>
            </Text>
            <Text style={footerDisclaimer}>
              You&apos;re receiving this because you have streak reminders enabled.
              <br />
              <Link href="https://shiploop.io/dashboard/settings" style={link}>
                Unsubscribe from streak reminders
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "580px",
};

const logoSection = {
  padding: "32px 48px 16px",
};

const logo = {
  fontSize: "28px",
  fontWeight: "700",
  background: "linear-gradient(90deg, #E8945A, #7CB4C4)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "#E8945A",
  margin: "0",
};

const heroSection = {
  padding: "24px 48px",
  textAlign: "center" as const,
};

const fireEmoji = {
  fontSize: "48px",
  margin: "0 0 16px",
};

const rocketEmoji = {
  fontSize: "48px",
  margin: "0 0 16px",
};

const heading = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#0a0a0f",
  margin: "0 0 8px",
};

const subheading = {
  fontSize: "18px",
  color: "#525252",
  margin: "0",
};

const highlightText = {
  color: "#E8945A",
  fontWeight: "700",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 48px",
};

const contentSection = {
  padding: "0 48px",
};

const greeting = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#0a0a0f",
  margin: "0 0 16px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#525252",
  margin: "0 0 16px",
};

const achievementBox = {
  backgroundColor: "#fef3c7",
  borderRadius: "8px",
  padding: "16px",
  margin: "24px 0",
  textAlign: "center" as const,
};

const achievementText = {
  fontSize: "15px",
  fontWeight: "600",
  color: "#92400e",
  margin: "0",
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#E8945A",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 32px",
};

const tipsSection = {
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  padding: "20px",
  margin: "24px 0 0",
};

const tipsTitle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#374151",
  margin: "0 0 12px",
};

const tipItem = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#525252",
  margin: "0 0 4px",
};

const footer = {
  padding: "32px 48px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#525252",
  margin: "0 0 8px",
};

const footerLinks = {
  fontSize: "14px",
  color: "#525252",
  margin: "0 0 16px",
};

const link = {
  color: "#E8945A",
  textDecoration: "underline",
};

const footerDisclaimer = {
  fontSize: "12px",
  color: "#9ca3af",
  margin: "0",
  lineHeight: "18px",
};

export default StreakReminderEmail;
