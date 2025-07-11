// ////////////////////////////////////////////////// postgresql//////////////////////////////////////////////// 
// // import pool from "../../../../lib/db";
// // export const dynamic = "force-dynamic";
// // export async function DELETE(req) {
// //   const { searchParams } = new URL(req.url);
// //   const tableName = searchParams.get("tableName");
// //   const id = searchParams.get("id");
// //   if (!tableName || !id) {
// //     return new Response(
// //       JSON.stringify({ message: "Table name and ID are required" }),
// //       {
// //         status: 400,
// //       }
// //     );
// //   }
// //   try {
// //     const query = `DELETE FROM ${tableName} WHERE id = $1 RETURNING *`;
// //     const result = await pool.query(query, [id]);
// //     if (result.rowCount > 0) {
// //      return new Response(
// //         JSON.stringify({ message: "Item deleted successfully" }),
// //         {
// //           status: 200,
// //         }
// //       );
// //     } else {
// //       return new Response(JSON.stringify({ message: "Item not found" }), {
// //         status: 404,
// //       });
// //     }
// //   } catch (error) {
// //     console.error("Error deleting item:", error);
// //     return new Response(JSON.stringify({ message: "Error deleting item" }), {
// //       status: 500,
// //     });
// //   }
// // }
// ////////////////////////////////////////////////// mysql /////////////////////////////////////////////////
// import connectToDatabase from "../../../../lib/db";
// export const dynamic = "force-dynamic";
// export async function DELETE(req) {
//   const { searchParams } = new URL(req.url);
//   const tableName = searchParams.get("tableName");
//   const id = searchParams.get("id");
//   if (!tableName || !id) {
//     return new Response(
//       JSON.stringify({ message: "Table name and ID are required" }),
//       { status: 400 }
//     );
//   }
//   try {
//     const db = await connectToDatabase();
//     const query = `DELETE FROM \`${tableName}\` WHERE id = ?`;
//     const [result] = await db.query(query, [id]);
//     if (result.affectedRows > 0) {
//       return new Response(
//         JSON.stringify({ message: "Item deleted successfully" }),
//         { status: 200 }
//       );
//     } else {
//       return new Response(JSON.stringify({ message: "Item not found" }), {
//         status: 404,
//       });
//     }
//   } catch (error) {
//     console.error("Error deleting item:", error);
//     return new Response(
//       JSON.stringify({ message: "Error deleting item" }),
//       { status: 500 }
//     );
//   }
// }


import connectToDatabase from "../../../../lib/db";
import { supabase } from "../../../../lib/supabaseClient.js";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const tableName = searchParams.get("tableName");
  const id = searchParams.get("id");

  if (!tableName || !id) {
    return new Response(
      JSON.stringify({ message: "Table name and ID are required" }),
      { status: 400 }
    );
  }

  try {
    const db = await connectToDatabase();

    // 🔍 Get the image URL before deleting the record
    const [rows] = await db.query(`SELECT image FROM \`${tableName}\` WHERE id = ?`, [id]);
    const imageUrl = rows[0]?.image;

    
      console.log(imageUrl,"imageUrl")
    // 🔁 Remove image from Supabase Storage
    if (imageUrl) {
      const fileName = imageUrl.split("/").pop(); // extract file name

      console.log(fileName,"fileName")
      const { error: deleteError } = await supabase.storage
        .from("rohaniyatblogimage")
        .remove([fileName]);

      if (deleteError) {
        console.error("❌ Error deleting image from Supabase:", deleteError);
        // ⚠ continue anyway — not blocking DB deletion
      }
    }

    // ❌ Delete from database
    const query = `DELETE FROM \`${tableName}\` WHERE id = ?`;
    const [result] = await db.query(query, [id]);

    if (result.affectedRows > 0) {
      return new Response(
        JSON.stringify({ message: "Item deleted successfully" }),
        { status: 200 }
      );
    } else {
      return new Response(JSON.stringify({ message: "Item not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.error("❌ Error deleting item:", error);
    return new Response(
      JSON.stringify({ message: "Error deleting item" }),
      { status: 500 }
    );
  }
}
