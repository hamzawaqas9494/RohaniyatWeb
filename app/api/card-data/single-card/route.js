import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const id = searchParams.get("id"); // Extract ID from query params

    console.log(id, "Received ID");

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    const blogResult = await sql`
      SELECT * FROM blogs WHERE id = ${id};
    `;

    console.log(blogResult, "Blog Result");

    if (blogResult.rows.length === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ specificBlogResult: blogResult.rows }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}
