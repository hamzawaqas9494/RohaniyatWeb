// // import { writeFile } from "fs/promises";
// // import { join } from "path";
// // import pool from "../../../../lib/db";

// // export async function POST(req) {
// //   try {
// //     const formData = await req.formData();

// //     const tableName = formData.get("tableName"); // ✅ Get table name dynamically
// //     const file = formData.get("image");
// //     const title = formData.get("title");
// //     const content = formData.get("content");

// //     console.log(tableName, title, content, file);

// //     if (!tableName || !title || !content) {
// //       return new Response(
// //         JSON.stringify({
// //           error: "Table name, Title, Content, and SubContent are required",
// //         }),
// //         { status: 400, headers: { "Content-Type": "application/json" } }
// //       );
// //     }

// //     // ✅ Validate table name (prevent SQL injection)
// //     const allowedTables = [
// //       "wazaif",
// //       "jado_tona_alaj",
// //       "mujrab_nakosh",
// //       "qutab",
// //     ]; // ✅ Add allowed table names
// //     if (!allowedTables.includes(tableName)) {
// //       return new Response(JSON.stringify({ error: "Invalid table name" }), {
// //         status: 400,
// //         headers: { "Content-Type": "application/json" },
// //       });
// //     }

// //     let imagePath = null;
// //     if (file) {
// //       const bytes = await file.arrayBuffer();
// //       const buffer = Buffer.from(bytes);
// //       const fileName = `${Date.now()}-${file.name}`;
// //       const filePath = join(process.cwd(), "public/uploads", fileName);
// //       await writeFile(filePath, buffer);
// //       imagePath = `/uploads/${fileName}`;
// //     }

// //     // ✅ Insert Query (Dynamic Table)
// //     const query = `INSERT INTO ${tableName} (title, content, image) VALUES ($1, $2, $3)`;
// //     await pool.query(query, [title, content, imagePath]);

// //     return new Response(
// //       JSON.stringify({
// //         message: `Data added to ${tableName} successfully`,
// //         imagePath,
// //       }),
// //       { status: 201, headers: { "Content-Type": "application/json" } }
// //     );
// //   } catch (error) {
// //     console.error("Error uploading image:", error);
// //     return new Response(JSON.stringify({ error: "Internal Server Error" }), {
// //       status: 500,
// //       headers: { "Content-Type": "application/json" },
// //     });
// //   }
// // }
// import { writeFile } from "fs/promises";
// import { join } from "path";
// import pool from "../../../../lib/db";

// export async function POST(req) {
//   try {
//     const formData = await req.formData();

//     const tableName = formData.get("tableName"); // ✅ Get table name dynamically
//     const file = formData.get("image");
//     const title = formData.get("title");
//     const content = formData.get("content");
//     const id = formData.get("id"); // ✅ Get ID if available

//     console.log(tableName, title, content, file, id);

//     if (!tableName || !title || !content) {
//       return new Response(
//         JSON.stringify({
//           error: "Table name, Title, Content are required",
//         }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // ✅ Validate table name (prevent SQL injection)
//     const allowedTables = [
//       "wazaif",
//       "jado_tona_alaj",
//       "mujrab_nakosh",
//       "qutab",
//     ]; // ✅ Add allowed table names
//     if (!allowedTables.includes(tableName)) {
//       return new Response(JSON.stringify({ error: "Invalid table name" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     let imagePath = null;
//     if (file) {
//       const bytes = await file.arrayBuffer();
//       const buffer = Buffer.from(bytes);
//       const fileName = `${Date.now()}-${file.name}`;
//       const filePath = join(process.cwd(), "public/uploads", fileName);
//       await writeFile(filePath, buffer);
//       imagePath = `/uploads/${fileName}`;
//     }

//     let query, queryParams;

//     if (id) {
//       // If an id is provided, update the existing record
//       query = `UPDATE ${tableName} SET title = $1, content = $2, image = $3 WHERE id = $4`;
//       queryParams = [title, content, imagePath, id];
//     } else {
//       // If no id, insert a new record
//       query = `INSERT INTO ${tableName} (title, content, image) VALUES ($1, $2, $3)`;
//       queryParams = [title, content, imagePath];
//     }

//     await pool.query(query, queryParams);

//     return new Response(
//       JSON.stringify({
//         message: `Data ${
//           id ? "updated" : "added"
//         } to ${tableName} successfully`,
//         imagePath,
//       }),
//       { status: 201, headers: { "Content-Type": "application/json" } }
//     );
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

import { writeFile } from "fs/promises";
import { join } from "path";
import pool from "../../../../lib/db"; // Assumes you are using a pg Pool or client
// export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const tableName = formData.get("tableName");
    const file = formData.get("image");
    const title = formData.get("title");
    const content = formData.get("content");
    const id = formData.get("id");

    if (!tableName || !title || !content) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const allowedTables = [
      "Taweez",
      "Wazaif",
      "Qutb",
      "Rohani_ilaaj",
      "Taweezat_Usmaniya",
      "Rohani_Dokan",
    ];
    if (!allowedTables.includes(tableName)) {
      return new Response(JSON.stringify({ error: "Invalid table name" }), {
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

    let query, queryParams;

    if (id) {
      // ✅ UPDATE existing post
      query = `
        UPDATE ${tableName}
        SET title = $1, content = $2, ${imagePath ? "image = $3," : ""}
        updated_at = NOW()
        WHERE id = $${imagePath ? 4 : 3}
        RETURNING *;
      `;

      queryParams = imagePath
        ? [title, content, imagePath, id]
        : [title, content, id];
    } else {
      // ✅ INSERT new post
      query = `
        INSERT INTO ${tableName} (title, content, ${
        imagePath ? "image," : ""
      } created_at)
        VALUES ($1, $2, ${imagePath ? "$3," : ""} NOW())
        RETURNING *;
      `;

      queryParams = imagePath ? [title, content, imagePath] : [title, content];
    }

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
