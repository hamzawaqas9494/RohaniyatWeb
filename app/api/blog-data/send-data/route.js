import { writeFile } from "fs/promises";
import { join } from "path";
export const dynamic = "force-dynamic";
import pool from "../../../../lib/db";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const tableName = formData.get("tableName");
    const file = formData.get("image");
    const title = formData.get("title");
    const content = formData.get("content");

    // ✅ Validation
    if (!tableName || !title || !content) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Allow only predefined tables
    const allowedTables = [
      "taweez",
      "wazaif",
      "qutb",
      "rohaniilaaj",
      "tawizatusmaniya",
      "rohanidokan",
      "nooriaamal",
      "noorialviaamal",
      "ooliaallahkaamal",
      "bamokalamal",
      "khasulkhasammal",
      "alviamal",
      "saflitavezat",
    ];
    if (!allowedTables.includes(tableName)) {
      return new Response(JSON.stringify({ error: "Invalid table name" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Handle image upload
    let imagePath = null;
    if (file && typeof file.name === "string") {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = join(process.cwd(), "public/uploads", fileName);
      await writeFile(filePath, buffer);
      imagePath = `/uploads/${fileName}`;
    }

    // ✅ Build INSERT query
    let query, queryParams;
    if (imagePath) {
      query = `
        INSERT INTO ${tableName} (title, content, image, created_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING *;
      `;
      queryParams = [title, content, imagePath];
    } else {
      query = `
        INSERT INTO ${tableName} (title, content, created_at)
        VALUES ($1, $2, NOW())
        RETURNING *;
      `;
      queryParams = [title, content];
    }

    // ✅ Execute query
    const { rows } = await pool.query(query, queryParams);

    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Server error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
