import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    logger: true,
    debug: true,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });

  console.log("Verifying SMTP...");
  await transporter.verify();
  console.log("SMTP VERIFIED");

  await transporter.sendMail({
    from: `"ResumeRank AI" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

export default sendEmail;