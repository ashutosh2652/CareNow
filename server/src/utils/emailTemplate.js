export const emailTemplates = {
    verifyEmail: (name, token) => ({
        subject: "🔐 Verify Your Email Address",
        html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #2563eb; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .header img { max-width: 150px; }
        .content { padding: 30px; background: #f9fafb; border-radius: 0 0 8px 8px; }
        h1 { color: #2563eb; margin-top: 0; }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #2563eb;
          color: white !important;
          text-decoration: none;
          border-radius: 4px;
          font-weight: 600;
          margin: 15px 0;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          font-size: 12px;
          color: #6b7280;
        }
        .code {
          font-family: monospace;
          font-size: 16px;
          letter-spacing: 1px;
          color: #2563eb;
          font-weight: bold;
          word-break: break-all;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <img src="https://www.carenowmedical.com/wp-content/uploads/2017/01/cropped-CareNow-1.png" alt="CareNow">
      </div>
      <div class="content">
        <h1>Welcome, ${name}!</h1>
        <p>Thank you for registering with us. To complete your registration, please verify your email address:</p>

        <p>
          Please Enter below Code to Verify your Email:
        </p>

        <p class="code">
        ${token}
        </p>

        <p>This verification link will expire in <strong>24 hours</strong>.</p>

        <p>If you didn't request this, please ignore this email.</p>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} CareNow. All rights reserved.</p>
        <p>CareNow Private Limited, Jamshedpur, India</p>
      </div>
    </body>
    </html>
    `,
    }),
    resetPassword: (name, token) => ({
        subject: "🔑 Password Reset Request",
        html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #dc2626; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { padding: 30px; background: #f9fafb; border-radius: 0 0 8px 8px; }
        h1 { color: #dc2626; margin-top: 0; }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #dc2626;
          color: white !important;
          text-decoration: none;
          border-radius: 4px;
          font-weight: 600;
          margin: 15px 0;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          font-size: 12px;
          color: #6b7280;
        }
        .warning {
          background-color: #fef2f2;
          padding: 12px;
          border-left: 4px solid #dc2626;
          margin: 15px 0;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <img src="https://www.carenowmedical.com/wp-content/uploads/2017/01/cropped-CareNow-1.png" alt="CareNow">
      </div>
      <div class="content">
        <h1>Password Reset</h1>
        <p>Hi ${name},</p>
        <p>We received a request to reset your password. Click the button below to proceed:</p>

        <p>
          Reset Password
        </p>
        <p>
        <b>${token}</b>
        </p>
        <div class="warning">
          <p><strong>Important:</strong> This link will expire in <strong>1 hour</strong>. If you didn't request this change, please secure your account immediately.</p>
        </div>

        <p>For security reasons, we recommend:</p>
        <ul>
          <li>Creating a strong, unique password</li>
          <li>Updating your password regularly</li>
        </ul>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} CareNow. All rights reserved.</p>
        <p>CareNow Private Limited, Jamshedpur, India</p>
      </div>
    </body>
    </html>
    `,
    }),
};
