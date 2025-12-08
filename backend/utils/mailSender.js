import nodemailer from 'nodemailer';

const mailSender = async (email, otp) => {
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
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Email Verification</h2>
                <p>Hello,</p>
                <p>Your OTP for verification is:</p>
                <h3 style="background:#f4f4f4; padding:10px; display:inline-block;">${otp}</h3>
                <p>This OTP is valid for <b>10 minutes</b>. Please do not share it with anyone.</p>
                <p>Best regards,<br>Your App Team</p>
            </div>
        `;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            html: body
        };

        const result = await transporter.sendMail(mailOptions);
        console.log(`OTP email sent to ${email}`, result.messageId);
    } catch (error) {
        console.log("Mail sending error:", error.message);
        console.log("Error details:", error);
        throw error;
    }
};

export default mailSender;