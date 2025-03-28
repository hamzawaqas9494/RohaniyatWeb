import { writeFile } from "fs/promises";
import { join } from "path";
import pool from "../../../../lib/db";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const tableName = formData.get("tableName"); // ✅ Get table name dynamically
    const file = formData.get("image");
    const title = formData.get("title");
    const subtitle = formData.get("subtitle");
    const content = formData.get("content");

    console.log(tableName, title, subtitle, content, file);

    if (!tableName || !title || !content) {
      return new Response(
        JSON.stringify({
          error: "Table name, Title, Content, and SubContent are required",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // ✅ Validate table name (prevent SQL injection)
    const allowedTables = ["blogs", "news", "articles"]; // ✅ Add allowed table names
    if (!allowedTables.includes(tableName)) {
      return new Response(JSON.stringify({ error: "Invalid table name" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let imagePath = null;
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = join(process.cwd(), "public/uploads", fileName);
      await writeFile(filePath, buffer);
      imagePath = `/uploads/${fileName}`;
    }

    // ✅ Insert Query (Dynamic Table)
    const query = `INSERT INTO ${tableName} (title, subtitle, content, image) VALUES ($1, $2, $3, $4)`;
    await pool.query(query, [title, subtitle, content, imagePath]);

    return new Response(
      JSON.stringify({
        message: `Data added to ${tableName} successfully`,
        imagePath,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error uploading image:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
