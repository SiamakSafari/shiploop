import { Resend } from "resend";

// Initialize Resend client lazily to avoid errors when API key is not set
let _resend: Resend | null = null;

export function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

export const resend = null as unknown as Resend; // Deprecated: use getResend()

// Sender configuration
export const EMAIL_FROM = "ShipLoop <noreply@shiploop.io>";
export const EMAIL_REPLY_TO = "hello@shiploop.io";
