"use server";

// Mock Server Actions for Authentication workflows
// Replace these with actual database calls using Prisma later.

export async function sendOtp(email: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  
  // Mock validation
  if (!email || !email.includes("@")) {
    return { error: "Invalid email address" };
  }
  
  console.log(`[MOCK EMAIL] OTP sent to ${email}: 123456`);
  return { success: true, message: "OTP sent successfully" };
}

export async function verifyOtp(email: string, code: string) {
  await new Promise((resolve) => setTimeout(resolve, 200));

  if (code !== "123456") {
    return { error: "Invalid or expired OTP code" };
  }

  return { success: true, message: "Email verified successfully" };
}

export async function requestPasswordReset(email: string): Promise<{ success: boolean; message: string; error?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  
  if (!email || !email.includes("@")) {
    return { success: false, message: "", error: "Invalid email address" };
  }
  
  console.log(`[MOCK EMAIL] Password reset link sent to ${email}`);
  return { success: true, message: "If an account exists, a reset link has been sent." };
}

export async function resetPassword(token: string, newPassword: string) {
  await new Promise((resolve) => setTimeout(resolve, 200));

  if (!token || token.length < 10) {
    return { error: "Invalid or expired reset token" };
  }

  return { success: true, message: "Password has been reset successfully. You can now log in." };
}

export async function setup2Fa(userId: string) {
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Return a mock TOTP secret and QR code data URL
  return { 
    success: true, 
    secret: "JBSWY3DPEHPK3PXP", 
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth://totp/Super-E:admin@supere.com?secret=JBSWY3DPEHPK3PXP&issuer=Super-E"
  };
}

export async function verify2Fa(userId: string, code: string) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock valid code is "000000" for testing
  if (code !== "000000") {
    return { error: "Invalid 2FA code" };
  }

  return { success: true, message: "2FA verified successfully" };
}
