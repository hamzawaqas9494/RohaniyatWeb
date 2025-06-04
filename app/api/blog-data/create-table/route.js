import pool from "../../../../lib/db"; // Adjust the path based on your project structure
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    // await pool.query(`
    //   DROP TABLE IF EXISTS
    //     Taweez,
    //     Wazaif,
    //     Qutb,
    //     Rohani_ilaaj,
    //     Tawizat_Usmaniya,
    //     Rohani_Dokan;
    // `);
    console.log("Existing tables dropped.");
    ///////////////////////////////// Create the "Taweez" table///////////////////////////////////////////
    await pool.query(`
      CREATE TABLE IF NOT EXISTS taweez (
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
      CREATE TABLE IF NOT EXISTS wazaif (
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
      CREATE TABLE IF NOT EXISTS qutb (
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
      CREATE TABLE IF NOT EXISTS rohaniilaaj (
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
      CREATE TABLE IF NOT EXISTS tawizatusmaniya (
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
      CREATE TABLE IF NOT EXISTS rohanidokan (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
        ///////////////////////////////// Create the "nooriaamal" table///////////////////////////////////////////
    await pool.query(`
      CREATE TABLE IF NOT EXISTS nooriaamal (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);    ///////////////////////////// Create the "noorialviaamal" table///////////////////////////////////////////
    await pool.query(`
      CREATE TABLE IF NOT EXISTS noorialviaamal (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
        ////////////////////////////// Create the "ooliaallahkaamal" table///////////////////////////////////////////
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ooliaallahkaamal (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
        ///////////////////////////////// Create the "bamokalamal" table///////////////////////////////////////////
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bamokalamal (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
        ///////////////////////////////// Create the "khasulkhasammal" table///////////////////////////////////////////
    await pool.query(`
      CREATE TABLE IF NOT EXISTS khasulkhasammal (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
        ///////////////////////////////// Create the "alviamal" table///////////////////////////////////////////
    await pool.query(`
      CREATE TABLE IF NOT EXISTS alviamal (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
        ///////////////////////////////// Create the "saflitavezat" table///////////////////////////////////////////
    await pool.query(`
      CREATE TABLE IF NOT EXISTS saflitavezat (
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
