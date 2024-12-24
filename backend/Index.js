
// **********************************
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
require('dotenv').config();


const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTENDURL||"*",

}));
app.use(bodyParser.json());

console.log(process.env.FRONTENDURL)
// Nodemailer configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL, // Replace with your email
    pass: process.env.PASSWORD, // Replace with your app password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// API endpoint to handle form submissions
app.post("/send-email", async (req, res) => {
  const { first_name, last_name, email, message } = req.body;

  try {
    const mailOptions = {
      from: email, // Sender email
      to: process.env.EMAIL, 
      subject: "New Contact Form Submission",
      html: `
        <h3>New Contact Request</h3>
        <p><strong>First Name:</strong> ${first_name}</p>
        <p><strong>Last Name:</strong> ${last_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).send({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ message: "Failed to send email", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
