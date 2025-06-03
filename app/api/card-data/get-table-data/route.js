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
        headers: { "Content-Type": "application/json" },
      });
    }

    let query;
    let params = [];
    if (id) {
      // ✅ agar specific blog chahiye by ID
      query = `SELECT * FROM ${tableName} WHERE id = $1`;
      params = [id];
    } else {
      // ✅ agar saare blogs chahiye reverse order mein
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
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
