import { config } from "../config/env.js";
export const emailTemplates = {
    verifyEmail: (name, token) => ({
        subject: "🔐 Verify Your Email Address",
        html: `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Email Verification</title>
    <style>
        /* Base Styles */
        body {
            margin: 0;
            padding: 0;
            width: 100% !important;
            background-color: #f0f4f8; /* A softer, professional background */
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        /* Container */
        .container {
            max-width: 580px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Header */
        .header {
            text-align: center;
            padding: 20px 0;
        }

        .header img {
            max-width: 140px;
        }

        /* Content Card */
        .content-card {
            background-color: #ffffff;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.07);
            text-align: center;
        }

        h1 {
            color: #1d2d50; /* A darker, more professional blue/black */
            font-size: 24px;
            font-weight: 600;
            margin-top: 0;
            margin-bottom: 10px;
        }

        p {
            font-size: 16px;
            line-height: 1.6;
            color: #555555;
            margin: 15px 0;
        }

        /* Button */
        .button {
            display: inline-block;
            padding: 14px 28px;
            background-color: #2563eb; /* Original brand color for consistency */
            color: #ffffff !important; /* Important to override default link styles */
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            transition: background-color 0.2s;
        }

        .button:hover {
            background-color: #1d4ed8; /* A slightly darker blue for hover */
        }

        /* Link */
        .link {
            font-family: monospace;
            font-size: 13px;
            color: #888888;
            word-break: break-all;
        }

        /* Divider */
        .divider {
            border-bottom: 1px solid #e5e7eb;
            width: 80%;
            margin: 30px auto;
        }

        /* Footer */
        .footer {
            margin-top: 20px;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #9ca3af;
        }

        .footer p {
            font-size: 12px;
            color: #9ca3af;
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://www.carenowmedical.com/wp-content/uploads/2017/01/cropped-CareNow-1.png" alt="CareNow Logo">
        </div>

        <div class="content-card">
            <h1>Confirm Your Email Address</h1>
            <p>Hi ${name},</p>
            <p>Thanks for signing up with CareNow! Please click the button below to complete your registration and verify your email.</p>

            <a href="${config.CLIENT_URL_PATIENT}/verify-email/${token}" class="button">Verify My Email</a>

            <div class="divider"></div>

            <p style="font-size: 14px; color: #888;">If the button doesn't work, you can copy and paste this link into your browser:</p>
            <a class="link" href="${config.CLIENT_URL_PATIENT}/verify-email/${token}">${config.CLIENT_URL_PATIENT}/verify-email/${token}</a>

        </div>

        <div class="footer">
            <p>This verification link is valid for the next <strong>24 hours</strong>.</p>
            <p>If you didn't create an account, you can safely ignore this email.</p>
            <p>© ${new Date().getFullYear()} CareNow. All rights reserved.</p>
            <p>CareNow Private Limited, Jamshedpur, India</p>
        </div>
    </div>
</body>
</html>
    `,
    }),
    resetPassword: (name, token) => ({
        subject: "🔑 Password Reset Request",
        html: `
      <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Password Reset Request</title>
      <style>
          /* Base Styles */
          body {
              margin: 0;
              padding: 0;
              width: 100% !important;
              background-color: #f0f4f8;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
          }
          .container {
              max-width: 580px;
              margin: 0 auto;
              padding: 20px;
          }
          .header {
              text-align: center;
              padding: 20px 0;
          }
          .header img {
              max-width: 140px;
          }
          .content-card {
              background-color: #ffffff;
              border-radius: 12px;
              padding: 40px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.07);
              text-align: center;
          }
          h1 {
              color: #1d2d50;
              font-size: 24px;
              font-weight: 600;
              margin-top: 0;
              margin-bottom: 10px;
          }
          p {
              font-size: 16px;
              line-height: 1.6;
              color: #555555;
              margin: 15px 0;
          }

          /* --- STYLES FOR THE CLICKABLE BUTTON --- */
          .button {
              display: inline-block;
              padding: 14px 28px;
              background-color: #dc2626; /* Red for alert/action */
              color: #ffffff !important; /* Important to override default link styles */
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              font-size: 16px;
              margin: 20px 0;
              transition: background-color 0.2s;
          }
          .button:hover {
              background-color: #b91c1c; /* A slightly darker red for hover */
          }

          .warning-box {
              background-color: #fef2f2;
              border: 1px solid #fecaca;
              border-radius: 8px;
              padding: 20px;
              margin: 30px 0;
              text-align: left;
          }
          .warning-box p {
              margin: 0;
              font-size: 14px;
              color: #991b1b;
          }
          .warning-box p strong {
              color: #7f1d1d;
          }

          .security-tips {
              text-align: left;
              margin-top: 25px;
              font-size: 14px;
              color: #555555;
          }
          .security-tips ul {
              padding-left: 20px;
              list-style-position: outside;
          }
          .security-tips li {
              margin-bottom: 8px;
          }

          .footer {
              margin-top: 20px;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #9ca3af;
          }
          .footer p {
              font-size: 12px;
              color: #9ca3af;
              margin: 5px 0;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <img src="https://www.carenowmedical.com/wp-content/uploads/2017/01/cropped-CareNow-1.png" alt="CareNow Logo">
          </div>

          <div class="content-card">
              <h1>Password Reset Request</h1>
              <p>Hi ${name},</p>
              <p>We received a request to reset the password for your CareNow account. Click the button below to set a new password.</p>

              <a href="${config.CLIENT_URL_PATIENT}/reset-password/${token}" class="button">Reset Your Password</a>
              <p style="font-size:14px; color:#888;">This password reset link will expire in <strong>1 hour</strong>.</p>

              <div class="warning-box">
                  <p><strong>Important:</strong> If you did not request a password reset, please ignore this email or contact our support if you have any concerns.</p>
              </div>

              <div class="security-tips">
                  <strong>For your security, we recommend:</strong>
                  <ul>
                      <li>Creating a new, strong password you don't use anywhere else.</li>
                      <li>Not sharing your password with anyone.</li>
                  </ul>
              </div>
          </div>

          <div class="footer">
              <p>© 2025 CareNow. All rights reserved.</p>
              <p>CareNow Private Limited, Jamshedpur, India</p>
          </div>
      </div>
  </body>
  </html>
    `,
    }),
};
