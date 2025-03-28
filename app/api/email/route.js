import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body, "Received data from React Native app");

    // ✅ Validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and Email are required!" },
        { status: 400 }
      );
    }

    // 📨 Gmail SMTP Setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hamzawaqas194@gmail.com", // ✅ Secure from .env
        pass: "hctb ahjq viqf wzun", // ✅ Secure from .env
      },
    });

    // ✅ Email Template for Admin (Formatted)
    const adminMailOptions = {
      from: `"New Request from ${body.name}" <${body.email}>`, // 📩 User ki email as sender
      to: process.env.ADMIN_EMAIL, // ✅ Admin ka email
      subject: "New Form Submission Received",
      html: `
        <h2>New Form Submission</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Father Name:</strong> ${body.fatherName || "N/A"}</p>
        <p><strong>Mother Name:</strong> ${body.motherName || "N/A"}</p>
        <p><strong>Country:</strong> ${body.country || "N/A"}</p>
        <p><strong>City:</strong> ${body.cityName || "N/A"}</p>
        <p><strong>Age:</strong> ${body.age || "N/A"}</p>
        <p><strong>Date of Birth:</strong> ${body.dateOfBirth || "N/A"}</p>
        <p><strong>Gender:</strong> ${body.gender || "N/A"}</p>
        <p><strong>Status:</strong> ${body.status || "N/A"}</p>
        <p><strong>WhatsApp Number:</strong> ${body.whatsappNumber || "N/A"}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Nature of Bait:</strong> ${body.natureOfBait || "N/A"}</p>
        <hr/>
        <p>Reply directly to this email to respond to the user.</p>
      `,
    };

    // ✅ Email to User (Confirmation)
    const userMailOptions = {
      from: `"Support Team" <${process.env.SMTP_USER}>`, // 📩 Admin se reply
      to: body.email,
      subject: "Your Form Submission Received",
      html: `
        <p>Hello <strong>${body.name}</strong>,</p>
        <p>We have received your request and will get back to you soon.</p>
        <p>Regards,<br/>Support Team</p>
      `,
    };

    // 📬 Send Emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return NextResponse.json(
      { message: "Email sent successfully to Admin & User" },
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
