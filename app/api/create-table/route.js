import { connectToDatabase } from '../../../lib/db';

export async function GET(req) {
  try {
    const db = await connectToDatabase();

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await db.query(createTableQuery);

    return new Response(JSON.stringify({ message: '✅ Table `users` created (if not exists)' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: '❌ Failed to create table' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
