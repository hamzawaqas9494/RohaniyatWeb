import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body, "get data from react native app");

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
        user: "hamzawaqas194@gmail.com",
        pass: "hctb ahjq viqf wzun",
      },
    });

    const mailOptions = {
      from: `"New Form Submission" <${"hamzawaqas194@gmail.com"}>`,
      to: "hamzawaqas194@gmail.com",
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
      { error: "Failed to send email hamza", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
