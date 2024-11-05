export const sendVerificationCode = async (email, code) => {
    try {
      // Simulate sending a verification code (e.g., via email)
      console.log(`Sending verification code ${code} to ${email}`);
      // In production, integrate an actual email or SMS service here
    } catch (error) {
      console.error('Error sending verification code:', error);
    }
  };
  