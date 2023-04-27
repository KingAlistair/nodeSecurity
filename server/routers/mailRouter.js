import { Router } from "express";
import nodemailer from 'nodemailer';

const router = Router();

// Endpoint to handle contact form submissions
router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Transporter set up with an ethereal account
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.HOST_EMAIL,
        pass: process.env.HOST_PASSWORD,
      },
    });

    try {
      // Define the email message
      const mailOptions = {
        from: email,
        to: process.env.HOST_EMAIL,
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
