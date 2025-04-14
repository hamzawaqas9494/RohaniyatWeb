// import pool from "../../../../lib/db";

// export async function GET() {
//   try {
//     // await pool.query(`DROP TABLE IF EXISTS wazaif;`);
//     // console.log("Existing table dropped.");

//     // console.log("Creating wazaif table...");
//     await pool.query(`
//       CREATE TABLE IF NOT EXISTS wazaif (
//         id SERIAL PRIMARY KEY,
//         title VARCHAR(255) NOT NULL,
//         image VARCHAR(255),
//         content TEXT NOT NULL

//       );
//     `);

//     console.log("Table created successfully.");
//     return new Response("Table created successfully", { status: 200 });
//   } catch (error) {
//     console.error("Error creating table:", error);
//     return new Response(`Error creating table: ${error.message}`, {
//       status: 500,
//     });
//   }
// }

import pool from "../../../../lib/db"; // Adjust the path based on your project structure
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS wazaif, jado_tona_alaj, mujrab_nakosh, qutab;
    `);
    console.log("Existing table dropped.");

    // Create the "wazaif" table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS wazaif (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS jado_tona_alaj (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS mujrab_nakosh (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS qutab (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("All tables created successfully.");
    return new Response("All tables created successfully", { status: 200 });
  } catch (error) {
    console.error("Error creating tables:", error);
    return new Response(`Error creating tables: ${error.message}`, {
      status: 500,
    });
  }
}
