import pool from "../../../../lib/db"; // Adjust the path based on your project structure
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS
        Taweez,
        Wazaif,
        Qutb,
        Rohani_Ilaaj,
        Tawizat_Usmaniya,
        Rohani_Dokan;
    `);
    console.log("Existing tables dropped.");
    ///////////////////////////////// Create the "Taweez" table///////////////////////////////////////////
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Taweez (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
        ///////////////////////////////// Create the "Wazaif" table///////////////////////////////////////////

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Wazaif (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
        ///////////////////////////////// Create the "Qutb" table///////////////////////////////////////////

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Qutb (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
        ///////////////////////////////// Create the "Rohani_Ilaaj" table///////////////////////////////////////////

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Rohani_Ilaaj (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
        ///////////////////////////////// Create the "Tawizat_Usmaniya" table///////////////////////////////////////////
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Tawizat_Usmaniya (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
        ///////////////////////////////// Create the "Rohani_Dokan" table///////////////////////////////////////////
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Rohani_Dokan (
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
