import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  position?: number;
}

export function WelcomeEmail({ position = 1 }: WelcomeEmailProps) {
  const previewText = `Welcome to the ShipLoop waitlist! You're #${position} in line.`;

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
            <Heading style={heading}>
              You&apos;re on the waitlist!
            </Heading>
            <Text style={positionText}>
              You&apos;re <span style={highlightText}>#{position}</span> in line
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Main content */}
          <Section style={contentSection}>
            <Text style={paragraph}>
              Thanks for joining ShipLoop - the Indie Hacker Operating System designed
              to help you ship with confidence.
            </Text>

            <Text style={paragraph}>
              We&apos;re building something special for makers like you:
            </Text>

            <Section style={featureList}>
              <Text style={featureItem}>
                <span style={bulletPoint}>&#10003;</span> Track your Ship Score and climb the leaderboard
              </Text>
              <Text style={featureItem}>
                <span style={bulletPoint}>&#10003;</span> Maintain shipping streaks and build momentum
              </Text>
              <Text style={featureItem}>
                <span style={bulletPoint}>&#10003;</span> Connect GitHub, Stripe, and more for real-time insights
              </Text>
              <Text style={featureItem}>
                <span style={bulletPoint}>&#10003;</span> Get AI coaching from personalities that match your vibe
              </Text>
            </Section>

            <Text style={paragraph}>
              We&apos;ll email you when it&apos;s your turn to join. In the meantime,
              follow us for updates and sneak peeks.
            </Text>

            <Section style={buttonSection}>
              <Button style={button} href="https://twitter.com/shiploop">
                Follow @shiploop
              </Button>
            </Section>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              ShipLoop - The Indie Hacker Operating System
            </Text>
            <Text style={footerLinks}>
              <Link href="https://shiploop.io" style={link}>Website</Link>
              {" | "}
              <Link href="https://twitter.com/shiploop" style={link}>Twitter</Link>
            </Text>
            <Text style={footerDisclaimer}>
              You received this email because you signed up for the ShipLoop waitlist.
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
  color: "#E8945A", // Fallback
  margin: "0",
};

const heroSection = {
  padding: "24px 48px",
  textAlign: "center" as const,
};

const heading = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#0a0a0f",
  margin: "0 0 16px",
};

const positionText = {
  fontSize: "18px",
  color: "#525252",
  margin: "0",
};

const highlightText = {
  color: "#E8945A",
  fontWeight: "700",
  fontSize: "24px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 48px",
};

const contentSection = {
  padding: "0 48px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#525252",
  margin: "0 0 16px",
};

const featureList = {
  margin: "24px 0",
  padding: "24px",
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
};

const featureItem = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#374151",
  margin: "0 0 12px",
};

const bulletPoint = {
  color: "#E8945A",
  fontWeight: "700",
  marginRight: "8px",
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
  padding: "12px 24px",
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
};

export default WelcomeEmail;
