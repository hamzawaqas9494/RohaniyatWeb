////////////////////////////////////////////////// postgresql////////////////////////////////////////////////// 
import pool from "../../../../lib/db";
export const dynamic = "force-dynamic";
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const tableName = searchParams.get("tableName");
    const id = searchParams.get("id");
      const allowedTables = [
      "taweez", "wazaif", "qutb", "rohaniilaaj", "tawizatusmaniya",
      "rohanidokan", "nooriaamal", "noorialviaamal", "ooliaallahkaamal",
      "bamokalamal", "khasulkhasammal", "alviamal", "saflitavezat",
    ];
    if (!tableName || !allowedTables.includes(tableName)) {
      return new Response(JSON.stringify({ error: "Invalid table name" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!id) {
      return new Response(JSON.stringify({ error: "Missing ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const result = await pool.query(`SELECT * FROM ${tableName} WHERE id = $1`, [id]);
    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: "Record not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching record:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
////////////////////////////////////////////////// mysql////////////////////////////////////////////////// 

// import { writeFile, mkdir } from "fs/promises";
// import { existsSync } from "fs";
// import { join } from "path";
// import connectToDatabase from "../../../../lib/db";

// export const dynamic = "force-dynamic";

// const allowedTables = [
//   "taweez", "wazaif", "qutb", "rohaniilaaj", "tawizatusmaniya",
//   "rohanidokan", "nooriaamal", "noorialviaamal", "ooliaallahkaamal",
//   "bamokalamal", "khasulkhasammal", "alviamal", "saflitavezat",
// ];

// export async function PUT(req) {
//   try {
//     const formData = await req.formData();
//     const tableName = formData.get("tableName");
//     const id = formData.get("id");
//     const title = formData.get("title");
//     const content = formData.get("content");
//     const file = formData.get("image");

//     if (!tableName || !allowedTables.includes(tableName)) {
//       return new Response(JSON.stringify({ error: "Invalid table name" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     if (!id || isNaN(Number(id)) || !title || !content) {
//       return new Response(JSON.stringify({ error: "Missing or invalid fields" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     let imagePath = null;

//     if (file && typeof file.name === "string") {
//       const bytes = await file.arrayBuffer();
//       const buffer = Buffer.from(bytes);
//       const fileName = `${Date.now()}-${file.name}`;
//       const uploadDir = join(process.cwd(), "public/uploads");

//       if (!existsSync(uploadDir)) {
//         await mkdir(uploadDir, { recursive: true });
//       }

//       const filePath = join(uploadDir, fileName);
//       await writeFile(filePath, buffer);
//       imagePath = fileName;
//     }

//     const db = await connectToDatabase();

//     const query = `
//       UPDATE \`${tableName}\`
//       SET title = ?, content = ?${imagePath ? ", image = ?" : ""}, updated_at = NOW()
//       WHERE id = ?
//     `;

//     const queryParams = imagePath
//       ? [title, content, imagePath, id]
//       : [title, content, id];

//     const [result] = await db.query(query, queryParams);

//     if (result.affectedRows === 0) {
//       return new Response(JSON.stringify({ error: "Blog not found" }), {
//         status: 404,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     return new Response(JSON.stringify({ success: true }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });

//   } catch (error) {
//     console.error("❌ PUT error:", error);
//     return new Response(JSON.stringify({ error: "Failed to update blog" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
