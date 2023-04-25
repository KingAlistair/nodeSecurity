import { Router } from "express";
import nodemailer from 'nodemailer';

const router = Router();

// Endpoint to handle contact form submissions
router.post('/contact', (req, res) => {
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
  
    // Define the email message
    const mailOptions = {
      from: email,
      to: process.env.CONTACT_EMAIL,
      subject: `New message from ${name}`,
      text: message
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log(`Email sent: ${info.response}`);
        res.status(200).send('Email sent successfully');
      }
    });
  });

  export default router;