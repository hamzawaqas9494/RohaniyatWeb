import pool from "../../../../lib/db";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const tableName = searchParams.get("tableName");
    const limit = parseInt(searchParams.get("limit")) || 5;
    const page = parseInt(searchParams.get("page")) || 1;
    const offset = (page - 1) * limit;

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
        },
      });
    }

    const dataQuery = `SELECT * FROM ${tableName} ORDER BY id DESC LIMIT $1 OFFSET $2`;
    const countQuery = `SELECT COUNT(*) FROM ${tableName}`;
    const dataParams = [limit, offset];

    const dataResult = await pool.query(dataQuery, dataParams);
    const countResult = await pool.query(countQuery);
    const totalCount = parseInt(countResult.rows[0].count);

    return new Response(
      JSON.stringify({ rows: dataResult.rows, total: totalCount }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
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

