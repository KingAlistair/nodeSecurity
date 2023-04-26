import { Router } from "express";
import nodemailer from 'nodemailer';

const router = Router();

// Endpoint to handle contact form submissions
router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter object to send the email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      }
    });

    try {
      // Define the email message
      const mailOptions = {
        from: email,
        to: process.env.CONTACT_EMAIL,
        subject: `New message from ${name}`,
        text: message
      };

      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent: ${info.response}`);
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    }
});

export default router;
