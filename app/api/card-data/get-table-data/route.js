import pool from "../../../../lib/db";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const tableName = searchParams.get("tableName");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "15"); // Load 15 records per page
    const offset = (page - 1) * limit;

    const allowedTables = [
      "wazaif",
      "jado_tona_alaj",
      "mujrab_nakosh",
      "qutab",
    ];
    if (!tableName || !allowedTables.includes(tableName)) {
      return new Response(JSON.stringify({ error: "Invalid table name" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Query to fetch the data with pagination
    const dataQuery = `SELECT * FROM ${tableName} ORDER BY id DESC LIMIT $1 OFFSET $2`;
    const countQuery = `SELECT COUNT(*) FROM ${tableName}`;

    const [dataResult, countResult] = await Promise.all([
      pool.query(dataQuery, [limit, offset]),
      pool.query(countQuery),
    ]);

    const totalRows = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalRows / limit);

    return new Response(
      JSON.stringify({
        rows: dataResult.rows,
        totalPages,
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
