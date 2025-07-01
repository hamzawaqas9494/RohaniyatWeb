import { writeFile } from "fs/promises";
import { join } from "path";
import pool from "../../../../lib/db";
export const dynamic = "force-dynamic";

const allowedTables = [
  "taweez", "wazaif", "qutb", "rohaniilaaj", "tawizatusmaniya",
  "rohanidokan", "nooriaamal", "noorialviaamal", "ooliaallahkaamal",
  "bamokalamal", "khasulkhasammal", "alviamal", "saflitavezat",
];

export async function PUT(req) {
  try {
    const formData = await req.formData();

    const tableName = formData.get("tableName");
    const id = formData.get("id");
    const title = formData.get("title");
    const content = formData.get("content");
    const file = formData.get("image");

    if (!tableName || !allowedTables.includes(tableName)) {
      return new Response(JSON.stringify({ error: "Invalid table name" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!id || !title || !content) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let imagePath = null;

    if (file && typeof file.name === "string") {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = join(process.cwd(), "public/uploads", fileName);
      await writeFile(filePath, buffer);
      imagePath = `/uploads/${fileName}`;
    }

    let query = `
      UPDATE ${tableName}
      SET title = $1, content = $2${imagePath ? ", image = $3" : ""}, updated_at = NOW()
      WHERE id = $${imagePath ? 4 : 3}
      RETURNING *;
    `;

    const queryParams = imagePath
      ? [title, content, imagePath, id]
      : [title, content, id];

    const result = await pool.query(query, queryParams);

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: "Blog not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, data: result.rows[0] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("❌ PUT error:", error);
    return new Response(JSON.stringify({ error: "Failed to update blog" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
