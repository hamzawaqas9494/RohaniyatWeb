// ////////////////////////////////////////////////postgresql////////////////////////////////////////////////
// // import { writeFile } from "fs/promises";
// // import { join } from "path";
// // export const dynamic = "force-dynamic";
// // import pool from "../../../../lib/db";
// // export async function POST(req) {
// //   try {
// //     const formData = await req.formData();
// //     const tableName = formData.get("tableName");
// //     const file = formData.get("image");
// //     const title = formData.get("title");
// //     const content = formData.get("content");
// //     const id = formData.get("id");
// //     if (!tableName || !title || !content) {
// //       return new Response(
// //         JSON.stringify({ error: "Missing required fields" }),
// //         {
// //           status: 400,
// //           headers: { "Content-Type": "application/json" },
// //         }
// //       );
// //     }
// //     const allowedTables = [
// //       "taweez",
// //       "wazaif",
// //       "qutb",
// //       "rohaniilaaj",
// //       "tawizatusmaniya",
// //       "rohanidokan",
// //       "nooriaamal",
// //       "noorialviaamal",
// //       "ooliaallahkaamal",
// //       "bamokalamal",
// //       "khasulkhasammal",
// //       "alviamal",
// //       "saflitavezat",
// //     ];
// //     if (!allowedTables.includes(tableName)) {
// //       return new Response(JSON.stringify({ error: "Invalid table name" }), {
// //         status: 400,
// //         headers: { "Content-Type": "application/json" },
// //       });
// //     }
// //     let imagePath = null;
// //     if (file && typeof file.name === "string") {
// //       const bytes = await file.arrayBuffer();
// //       const buffer = Buffer.from(bytes);
// //       const fileName = `${Date.now()}-${file.name}`;
// //       const filePath = join(process.cwd(), "public/uploads", fileName);
// //       await writeFile(filePath, buffer);
// //       imagePath = `/uploads/${fileName}`;
// //     }
// //     let query, queryParams;
// //     if (id) {
// //       //////////////////////////// ✅ UPDATE existing post///////////////////////////////////
// //       query = `
// //         UPDATE ${tableName}
// //         SET title = $1, content = $2, ${imagePath ? "image = $3," : ""}
// //         updated_at = NOW()
// //         WHERE id = $${imagePath ? 4 : 3}
// //         RETURNING *;
// //       `;
// //       queryParams = imagePath
// //         ? [title, content, imagePath, id]
// //         : [title, content, id];
// //     } else {
// //       ///////////////////////////////// ✅ INSERT new post///////////////////////////////////
// //       query = `
// //         INSERT INTO ${tableName} (title, content, ${
// //         imagePath ? "image," : ""
// //       } created_at)
// //         VALUES ($1, $2, ${imagePath ? "$3," : ""} NOW())
// //         RETURNING *;
// //       `;
// //       queryParams = imagePath ? [title, content, imagePath] : [title, content];
// //     }
// //     const { rows } = await pool.query(query, queryParams);
// //     return new Response(JSON.stringify({ success: true, data: rows[0] }), {
// //       status: 200,
// //       headers: { "Content-Type": "application/json" },
// //     });
// //   } catch (error) {
// //     console.error("❌ Server error:", error);
// //     return new Response(JSON.stringify({ error: "Internal server error" }), {
// //       status: 500,
// //       headers: { "Content-Type": "application/json" },
// //     });
// //   }
// // }
// //////////////////////////////////////////////////// mysql query ////////////////////////////////////////////////

// import { writeFile } from "fs/promises";
// import { join } from "path";
// import connectToDatabase from "../../../../lib/db";
// export const dynamic = "force-dynamic";
// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     const tableName = formData.get("tableName");
//     const title = formData.get("title");
//     const content = formData.get("content");
//     const file = formData.get("image");

//     if (!tableName || !title || !content) {
//       return new Response(JSON.stringify({ error: "Missing required fields" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }
//     // Upload image if available
//     let imagePath = null;
//     if (file && typeof file.name === "string") {
//       const bytes = await file.arrayBuffer();
//       const buffer = Buffer.from(bytes);
//       const fileName = `${Date.now()}-${file.name}`;
//       const filePath = join(process.cwd(), "public/uploads", fileName);
//       await writeFile(filePath, buffer);
//       imagePath = fileName;
//     }
//     const db = await connectToDatabase();
//     // Prepare query
//     let query, values;
//     if (imagePath) {
//       query = `INSERT INTO \`${tableName}\` (title, content, image, created_at) VALUES (?, ?, ?, NOW())`;
//       values = [title, content, imagePath];
//     } else {
//       query = `INSERT INTO \`${tableName}\` (title, content, created_at) VALUES (?, ?, NOW())`;
//       values = [title, content];
//     }
//     const [result] = await db.query(query, values);
//     return new Response(JSON.stringify({ success: true, insertedId: result.insertId }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     console.error("❌ Error inserting data:", err);
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }




// app/api/blog-data/send-data/route.js

import { supabase } from "../../../../lib/supabaseClient.js";
import connectToDatabase from "../../../../lib/db";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const tableName = formData.get("tableName");
    const title = formData.get("title");
    const content = formData.get("content");
    const file = formData.get("image");

    if (!tableName || !title || !content) {
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

      // ✅ Upload image to Supabase
      const { error: uploadError } = await supabase.storage
        .from("rohaniyatblogimage")
        .upload(fileName, buffer, {
          contentType: file.type,
        });

      if (uploadError) {
        console.error("❌ Supabase upload error:", uploadError);
        return new Response(JSON.stringify({ error: "Upload failed" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }

      // ✅ Get public URL
      const { data: publicData } = supabase.storage
        .from("rohaniyatblogimage")
        .getPublicUrl(fileName);

      imagePath = publicData.publicUrl;
    }

    // ✅ Insert into MySQL
    const db = await connectToDatabase();
    const query = `
      INSERT INTO \`${tableName}\` (title, content, image, created_at)
      VALUES (?, ?, ?, NOW())
    `;
    const values = [title, content, imagePath];

    const [result] = await db.query(query, values);

    return new Response(JSON.stringify({ success: true, insertedId: result.insertId }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("❌ Error inserting data:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
