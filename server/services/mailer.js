import nodemailer from 'nodemailer';

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

/**
 * Send OTP email to user
 * @param {string} email - Recipient email
 * @param {string} otp - 6-digit OTP code
 * @param {string} name - Optional user name
 */
export async function sendOTPEmail(email, otp, name = '') {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"Compario" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '🔐 Your Compario Login OTP',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#0f1117;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1117;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background:#1a1d2e;border-radius:16px;overflow:hidden;border:1px solid #2a2d3e;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6c63ff,#4f46e5);padding:32px 40px;text-align:center;">
              <div style="display:inline-flex;align-items:center;gap:10px;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M7 16V4m0 0L3 8m4-4 4 4"/>
                  <path d="M17 8v12m0 0 4-4m-4 4-4-4"/>
                </svg>
                <span style="color:white;font-size:24px;font-weight:700;letter-spacing:-0.5px;">Compario</span>
              </div>
              <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">Smart Price Comparison</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="color:#f1f5f9;margin:0 0 8px;font-size:22px;font-weight:600;">
                ${name ? `Hi ${name}! 👋` : 'Verify your email 👋'}
              </h2>
              <p style="color:#94a3b8;margin:0 0 32px;font-size:15px;line-height:1.6;">
                Use the OTP below to log in to your Compario account. This code expires in <strong style="color:#f1f5f9;">10 minutes</strong>.
              </p>

              <!-- OTP Box -->
              <div style="background:#0f1117;border:2px solid #6c63ff;border-radius:12px;padding:28px;text-align:center;margin-bottom:32px;">
                <p style="color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin:0 0 12px;">Your One-Time Password</p>
                <div style="letter-spacing:16px;font-size:40px;font-weight:700;color:#6c63ff;font-family:'Courier New',monospace;">${otp}</div>
              </div>

              <p style="color:#64748b;font-size:13px;line-height:1.6;margin:0;">
                🔒 This OTP was requested for <strong style="color:#94a3b8;">${email}</strong>. If you didn't request this, you can safely ignore this email.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #2a2d3e;padding:20px 40px;text-align:center;">
              <p style="color:#475569;font-size:12px;margin:0;">© ${new Date().getFullYear()} Compario. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`✉️  OTP email sent to ${email}`);
}
