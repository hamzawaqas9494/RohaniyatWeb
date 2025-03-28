import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // Correct way to get JSON body in Next.js app directory
    const body = await req.json();

    if (!body.email) {
      return NextResponse.json(
        { error: "Email is required!" },
        { status: 400 }
      );
    }

    // Ensure environment variables are correctly set
    if (!process.env.EMAIL || !process.env.PASSWORD) {
      return NextResponse.json(
        { error: "Email credentials missing!" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: body.email, // Send to the email provided in the form
      subject: "New Form Submission",
      text: `
      Name: ${body.name}
      Father Name: ${body.fatherName}
      Mother Name: ${body.motherName}
      Country: ${body.country}
      City: ${body.cityName}
      Age: ${body.age}
      Date of Birth: ${body.dateOfBirth}
      Gender: ${body.gender}
      Status: ${body.status}
      WhatsApp: ${body.whatsappNumber}
      Nature of Bait: ${body.natureOfBait}
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
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

// Handle GET requests properly
export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
