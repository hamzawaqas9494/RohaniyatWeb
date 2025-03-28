import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

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

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to send email.",
    });
  }
}
