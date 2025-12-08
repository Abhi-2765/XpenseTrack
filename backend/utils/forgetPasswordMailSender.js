import nodemailer from 'nodemailer';

const mailSender = async (email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT) || 587,
            secure: parseInt(process.env.EMAIL_PORT) === 465, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const body = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reset Your Password</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">🔐 Password Reset</h1>
                        <p style="color: #e8e8ff; margin: 10px 0 0 0; font-size: 16px;">Secure your account in just one click</p>
                    </div>

                    <!-- Main Content -->
                    <div style="padding: 40px 30px;">
                        <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 24px;">Hello!</h2>
                        
                        <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            We received a request to reset your password. Don't worry - this happens to the best of us!
                        </p>
                        
                        <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                            Click the button below to create a new password:
                        </p>

                        <!-- Reset Button -->
                        <div style="text-align: center; margin: 30px 0 40px 0;">
                            <a href="${process.env.FRONTEND_URL || 'http://localhost:5000'}/reset-password?token=${token}" 
                               style="display: inline-block; 
                                      padding: 16px 32px; 
                                      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                      color: #ffffff; 
                                      text-decoration: none; 
                                      border-radius: 50px; 
                                      font-weight: bold; 
                                      font-size: 16px;
                                      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                                      transition: transform 0.2s ease;">
                                ✨ Reset My Password
                            </a>
                        </div>

                        <!-- Alternative Link -->
                        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <p style="color: #666666; font-size: 14px; margin: 0 0 10px 0;">
                                <strong>Can't click the button?</strong> Copy and paste this link in your browser:
                            </p>
                            <p style="word-break: break-all; 
                                      color: #667eea; 
                                      font-size: 13px; 
                                      background-color: #ffffff; 
                                      padding: 10px; 
                                      border: 1px solid #e9ecef; 
                                      border-radius: 4px; 
                                      margin: 0;">
                                ${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}
                            </p>
                        </div>

                        <!-- Security Notice -->
                        <div style="background-color: #fff3cd; 
                                    border-left: 4px solid #ffc107; 
                                    padding: 15px; 
                                    margin: 25px 0; 
                                    border-radius: 4px;">
                            <p style="color: #856404; margin: 0; font-size: 14px;">
                                <strong>🛡️ Security Notice:</strong>
                            </p>
                            <ul style="color: #856404; margin: 10px 0 0 20px; font-size: 14px;">
                                <li>This link will expire in <strong>15 minutes</strong></li>
                                <li>Only use this link if you requested a password reset</li>
                                <li>Never share this link with anyone</li>
                            </ul>
                        </div>

                        <!-- Help Section -->
                        <div style="background-color: #e3f2fd; 
                                    padding: 20px; 
                                    border-radius: 8px; 
                                    margin: 25px 0;">
                            <h3 style="color: #1976d2; margin: 0 0 10px 0; font-size: 16px;">Need Help?</h3>
                            <p style="color: #1565c0; margin: 0; font-size: 14px;">
                                If you're having trouble resetting your password or didn't request this reset, 
                                please contact our support team at 
                                <a href="mailto:support@yourapp.com" style="color: #1976d2;">support@yourapp.com</a>
                            </p>
                        </div>

                        <!-- Footer Message -->
                        <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
                            <p style="color: #999999; font-size: 12px; text-align: center; margin: 0;">
                                If you didn't request this password reset, you can safely ignore this email. 
                                Your password won't be changed.
                            </p>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div style="background-color: #f8f9fa; 
                                padding: 20px 30px; 
                                text-align: center; 
                                border-top: 1px solid #eee;
                                border-radius: 0 0 8px 8px;">
                        <p style="color: #666666; margin: 0; font-size: 14px;">
                            Best regards,<br>
                            <strong style="color: #333333;">Your App Security Team</strong>
                        </p>
                        <p style="color: #999999; margin: 10px 0 0 0; font-size: 12px;">
                            This email was sent to ${email}
                        </p>
                    </div>
                </div>

                <!-- Mobile Responsiveness -->
                <style>
                    @media only screen and (max-width: 600px) {
                        .email-container {
                            width: 100% !important;
                            margin: 0 !important;
                        }
                        .email-content {
                            padding: 20px !important;
                        }
                        .reset-button {
                            padding: 14px 28px !important;
                            font-size: 14px !important;
                        }
                    }
                </style>
            </body>
            </html>
        `;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: '🔐 Reset Your Password - Action Required',
            html: body
        };

        const result = await transporter.sendMail(mailOptions);
        console.log(`Password reset email sent to ${email}`, result.messageId);
        return result;
    } catch (error) {
        console.log("Mail sending error:", error.message);
        console.log("Error details:", error);
        throw error;
    }
};

export default mailSender;