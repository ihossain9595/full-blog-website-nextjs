import nodemailer from "nodemailer";

export async function SendMail(EmailTo, EmailText, EmailSubject) {
  const transporter = nodemailer.createTransport({
    host: "mail.teamrabbil.com",
    port: 587,
    secure: false,
    auth: {
      user: "info@teamrabbil.com",
      pass: "~sR4[bhaC[Qs",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const MailOptions = {
    from: "Next JS News Portal <info@teamrabbil.com>",
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };

  return await transporter.sendMail(MailOptions);
}
