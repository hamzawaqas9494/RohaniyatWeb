import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      fatherName,
      motherName,
      country,
      cityName,
      age,
      dateOfBirth,
      gender,
      status,
      whatsappNumber,
      email,
      natureOfBait,
    } = body;

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Your Gmail
        pass: process.env.PASSWORD, // App Password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.TO_EMAIL, // Receiver Email
      subject: "New Form Submission",
      text: `
      Name: ${name}
      Father Name: ${fatherName}
      Mother Name: ${motherName}
      Country: ${country}
      City: ${cityName}
      Age: ${age}
      Date of Birth: ${dateOfBirth}
      Gender: ${gender}
      Status: ${status}
      WhatsApp: ${whatsappNumber}
      Email: ${email}
      Nature of Bait: ${natureOfBait}
      `,
    };

    await transporter.sendMail(mailOptions);

    return Response.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
