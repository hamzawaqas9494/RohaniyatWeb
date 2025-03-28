import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await sql`SELECT * FROM blogs ORDER BY id DESC;`; // Get All Blogs
    return NextResponse.json({ blogs: blogs.rows });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
