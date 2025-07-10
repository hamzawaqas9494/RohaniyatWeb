/////////////////////////////////////////////////// postgresql connection /////////////////////////////////////// 
// import { Pool } from "pg";
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });
// export default pool;
//////////////////////////////////////////mysql connection////////////////////////////////////////////////// 

// import mysql from 'mysql2/promise';
// export async function connectToDatabase() {
//   const connection = await mysql.createConnection(process.env.DATABASE_URL);
//   return connection;
// }
// export default connectToDatabase;


// lib/db.js ya db.ts
import mysql from 'mysql2/promise';

let pool;

export default async function connectToDatabase() {
  if (!pool) {
    const dbUrl = process.env.DATABASE_URL;

    if (!dbUrl) {
      throw new Error("❌ DATABASE_URL is not defined");
    }

    const { hostname, port, username, password, pathname } = new URL(dbUrl);

    pool = mysql.createPool({
      host: hostname,
      port: Number(port),
      user: username,
      password: password,
      database: pathname.slice(1),
      waitForConnections: true,
      connectionLimit: 10,
    });

    console.log("✅ MySQL Pool Connected");
  }

  return pool;
}

