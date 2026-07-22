import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_PASS,
    },
  });

  await transporter.sendMail({
    from: `"ResumeRank AI" <${process.env.BREVO_USER}>`,
    to,
    subject,
    html,
  });

  console.log("Email Sent Successfully");
};

export default sendEmail;