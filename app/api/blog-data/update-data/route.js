// import pool from "../../../../lib/db";
// export const dynamic = "force-dynamic";

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const tableName = searchParams.get("tableName");
//     const id = searchParams.get("id");

//       const allowedTables = [
//       "taweez", "wazaif", "qutb", "rohaniilaaj", "tawizatusmaniya",
//       "rohanidokan", "nooriaamal", "noorialviaamal", "ooliaallahkaamal",
//       "bamokalamal", "khasulkhasammal", "alviamal", "saflitavezat",
//     ];

//     if (!tableName || !allowedTables.includes(tableName)) {
//       return new Response(JSON.stringify({ error: "Invalid table name" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     if (!id) {
//       return new Response(JSON.stringify({ error: "Missing ID" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const result = await pool.query(`SELECT * FROM ${tableName} WHERE id = $1`, [id]);

//     if (result.rows.length === 0) {
//       return new Response(JSON.stringify({ error: "Record not found" }), {
//         status: 404,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     return new Response(JSON.stringify(result.rows[0]), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });

//   } catch (error) {
//     console.error("Error fetching record:", error);
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
