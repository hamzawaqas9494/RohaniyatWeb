import pool from "../../../../lib/db";

export async function GET() {
  try {
    // await pool.query(`DROP TABLE IF EXISTS blogs;`);
    // console.log("Existing table dropped.");

    console.log("Creating blogs table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255),
        image VARCHAR(255),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NULL
      );
    `);

    console.log("Table created successfully.");
    return new Response("Table created successfully", { status: 200 });
  } catch (error) {
    console.error("Error creating table:", error);
    return new Response(`Error creating table: ${error.message}`, {
      status: 500,
    });
  }
}
