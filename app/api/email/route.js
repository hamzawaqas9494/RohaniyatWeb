import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.name) {
      return NextResponse.json(
        { error: "Name and Country are required!" },
        { status: 400 }
      );
    }

    // 📨 Gmail SMTP Setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // ✅ Admin Gmail (Sender)
        pass: process.env.PASSWORD, // ✅ Gmail App Password
      },
    });

    // 📩 Mail Content (User ke Data ke Saath)
    const mailOptions = {
      from: `"New Form Submission" <${process.env.EMAIL}>`, // ✅ Sender (Your Gmail)
      to: process.env.TO_EMAIL, // ✅ Admin Email (Receiver)
      subject: "New Form Submission Received",
      text: `
        Name: ${body.name}
        Father Name: ${body.fatherName || "N/A"}
      `,
    };

    // 📬 Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Failed to send email", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
