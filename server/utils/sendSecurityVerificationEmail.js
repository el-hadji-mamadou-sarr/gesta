const nodemailer = require('nodemailer');

function sendVerification(email, fullname, subject, resetToken){
        const link = `http://localhost:3000/reset-${subject}?token=${resetToken}`;

        const transporter = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
                }
        });

        const mailOptions = {
                from: 'no-reply@gesta.com',
                to: email,
                subject: `Gesta ${subject} reset request`,
                html: `
                <h1>Hello Mr ${fullname},</h1>
                <p>
                You can reset your ${subject} by clicking on the link 
                <a href="${link}">Reset your ${subject}</a>
                </p>
                `
        }

        transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                        throw error;
                }
               
        });
}

module.exports = sendVerification;