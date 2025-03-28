import pool from "../../../../lib/db";

export async function GET(req) {
  try {
    // const { searchParams } = new URL(req.url);
    // const tableName = searchParams.get("tableName");

    // // ✅ Validate table name (Prevent SQL Injection)
    // const allowedTables = ["blogs", "news", "articles"];
    // if (!tableName || !allowedTables.includes(tableName)) {
    //   return new Response(JSON.stringify({ error: "Invalid table name" }), {
    //     status: 400,
    //     headers: { "Content-Type": "application/json" },
    //   });
    // }

    // ✅ Fetch Data Query
    const query = `SELECT * FROM blogs ORDER BY id DESC`;
    const { rows } = await pool.query(query);

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ message: `No data found in blogs` }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
