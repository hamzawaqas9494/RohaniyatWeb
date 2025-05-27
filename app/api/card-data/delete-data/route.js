import pool from "../../../../lib/db";
export const dynamic = "force-dynamic";
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const tableName = searchParams.get("tableName");
  const id = searchParams.get("id");
  if (!tableName || !id) {
    return new Response(
      JSON.stringify({ message: "Table name and ID are required" }),
      {
        status: 400,
      }
    );
  }
  try {
    const query = `DELETE FROM ${tableName} WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [id]);
    if (result.rowCount > 0) {
     return new Response(
        JSON.stringify({ message: "Item deleted successfully" }),
        {
          status: 200,
        }
      );
    } else {
      return new Response(JSON.stringify({ message: "Item not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    return new Response(JSON.stringify({ message: "Error deleting item" }), {
      status: 500,
    });
  }
}
