import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.name || !body.email) {
      return new Response(JSON.stringify({ error: "Name and Email are required!" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const adminMailOptions = {
      from: `"New Request from ${body.name}" <${body.email}>`,
      to: "hamzawaqas194@gmail.com",
      subject: "New Form Submission Received",
      html: `
        <h2>New Form Submission</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Father Name:</strong> ${body.fatherName || "N/A"}</p>
        <p><strong>Mother Name:</strong> ${body.motherName || "N/A"}</p>
        <p><strong>Country:</strong> ${body.country || "N/A"}</p>
        <p><strong>City:</strong> ${body.cityName || "N/A"}</p>
        <p><strong>Date of Birth:</strong> ${body.day}-${body.month}-${body.year}</p>
        <p><strong>Age:</strong> ${body.age || "N/A"}</p>
        <p><strong>Gender:</strong> ${body.gender || "N/A"}</p>
        <p><strong>Status:</strong> ${body.status || "N/A"}</p>
        <p><strong>WhatsApp Number:</strong> ${body.whatsappNumber || "N/A"}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Nature of disease:</strong> ${body.disease || "N/A"}</p>
        <hr/>
        <p>Reply directly to this email to respond to the user.</p>
      `,
    };

    const userMailOptions = {
      from: `"Support Team" <${body.email}>`,
      to: body.email,
      subject: "Your Form Submission Received",
      html: `
        <p>Hello <strong>${body.name}</strong>,</p>
        <p>We have received your request and will get back to you soon.</p>
        <p>Regards,<br/>Support Team</p>
      `,
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return new Response(JSON.stringify({ message: "Email sent successfully to Admin & User" }), {
      status: 200,
      headers: corsHeaders,
    });

  } catch (error) {
    console.error("Server Error:", error);
    return new Response(JSON.stringify({ error: "Failed to send email", details: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET() {
  return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
    status: 405,
    headers: corsHeaders,
  });
}
