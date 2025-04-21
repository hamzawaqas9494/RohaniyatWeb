import pool from "../../../../lib/db";
export const dynamic = "force-dynamic";
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const tableName = searchParams.get("tableName");
    const id = searchParams.get("id");
    const allowedTables = [
      "taweez",
      "wazaif",
      "qutb",
      "rohaniilaaj",
      "tawizatusmaniya",
      "rohanidokan",
    ];
    if (!tableName || !allowedTables.includes(tableName)) {
      return new Response(JSON.stringify({ error: "Invalid table name" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        },
      });
    }
    let dataResult;
    if (id) {
      // Fetch only one row by ID
      const query = `SELECT * FROM ${tableName} WHERE id = $1`;
      dataResult = await pool.query(query, [id]);
    } else {
      // Fetch all rows
      const query = `SELECT * FROM ${tableName} ORDER BY id DESC`;
      dataResult = await pool.query(query);
    }
    return new Response(
      JSON.stringify({
        rows: dataResult.rows,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
    });
  }
}
