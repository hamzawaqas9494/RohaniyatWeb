// // /////////////////////////////////////////////////// postgresql connection /////////////////////////////////////// 
// // // import { Pool } from "pg";
// // // const pool = new Pool({
// // //   connectionString: process.env.DATABASE_URL,
// // //   ssl: {
// // //     rejectUnauthorized: false,
// // //   },
// // // });
// // // export default pool;
// // //////////////////////////////////////////mysql connection////////////////////////////////////////////////// 
// // import mysql from 'mysql2/promise';
// // export async function connectToDatabase() {
// //   const connection = await mysql.createConnection(process.env.DATABASE_URL);
// //   return connection;
// // }
// // export default connectToDatabase;


// // lib/db.ts or lib/db.js

// import mysql from 'mysql2/promise';

// let connection; // Cache the connection

// export default async function connectToDatabase() {
//   if (!connection) {
//     connection = await mysql.createConnection(process.env.DATABASE_URL);
//     console.log("✅ DB Connected");
//   }
//   return connection;
// }
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default async function connectToDatabase() {
  return pool;
}
