//////////////////////////////////////////////////// postgresql//////////////////////////////////////////////////// 
import pool from "../../../../lib/db";
export const dynamic = "force-dynamic";
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const tableName = searchParams.get("tableName");
    const id = searchParams.get("id"); // optional
    const allowedTables = [
      "taweez", "wazaif", "qutb", "rohaniilaaj", "tawizatusmaniya",
      "rohanidokan", "nooriaamal", "noorialviaamal", "ooliaallahkaamal",
      "bamokalamal", "khasulkhasammal", "alviamal", "saflitavezat",
    ];
    if (!tableName || !allowedTables.includes(tableName)) {
      return new Response(JSON.stringify({ error: "Invalid table name" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // 👈 Allow all origins (for testing)
        },
      });
    }
    let query;
    let params = [];
    if (id) {
      query = `SELECT * FROM ${tableName} WHERE id = $1`;
      params = [id];
    } else {
      query = `SELECT * FROM ${tableName} ORDER BY id DESC`;
    }
    const result = await pool.query(query, params);
    return new Response(
      JSON.stringify({
        rows: result.rows,
        total: result.rowCount,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // 👈 CORS header
        },
      }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // 👈 CORS header
      },
    });
  }
}
//////////////////////////////////////////////////// mysql//////////////////////////////////////////////////// 
// import connectToDatabase from "../../../../lib/db";
// export const dynamic = "force-dynamic";
// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const tableName = searchParams.get("tableName");
//     const id = searchParams.get("id"); // optional
//     const allowedTables = [
//       "taweez", "wazaif", "qutb", "rohaniilaaj", "tawizatusmaniya",
//       "rohanidokan", "nooriaamal", "noorialviaamal", "ooliaallahkaamal",
//       "bamokalamal", "khasulkhasammal", "alviamal", "saflitavezat",
//     ];
//     if (!tableName || !allowedTables.includes(tableName)) {
//       return new Response(JSON.stringify({ error: "Invalid table name" }), {
//         status: 400,
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//       });
//     }
//     const db = await connectToDatabase();
//     let query;
//     let params = [];
//     if (id) {
//       query = `SELECT * FROM \`${tableName}\` WHERE id = ?`;
//       params = [id];
//     } else {
//       query = `SELECT * FROM \`${tableName}\` ORDER BY id DESC`;
//     }
//     const [rows] = await db.query(query, params);
//     return new Response(
//       JSON.stringify({
//         rows,
//         total: rows.length,
//       }),
//       {
//         status: 200,
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//       status: 500,
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//     });
//   }
// }
