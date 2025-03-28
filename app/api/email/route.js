import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  try {
    const data = req.body;

    console.log(data, "data comming from react native app ");

    // 📨 Nodemailer Transporter Setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Your Gmail Email
        pass: process.env.PASSWORD, // Your Gmail App Password
      },
    });

    // 📧 Email Content
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.TO_EMAIL, // Jis Email pe send karna hai
      subject: "New Form Submission",
      text: Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n"),
    };

    // 🔥 Send Email
    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send email." });
  }
}
