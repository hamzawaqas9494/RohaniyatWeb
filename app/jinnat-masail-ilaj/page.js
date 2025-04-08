"use client"; // ✅ Client Component banane ke liye
import { useState, useEffect } from "react";
import MainLayout from "../admin/components/ui/MainLayout";

export default function AboutPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../api/card-data/get-blog-data"); // ✅ API ka sahi route likho
        const data = await response.json();
        if (response.ok) {
          setBlogs(data); // ✅ Data ko set karo state me
        } else {
          console.error("Error fetching data:", data.error || data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">jinnat masail ilaj</h1>
      {blogs.map((blog) => (
        <div key={blog.id} className="mb-6">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      ))}
    </MainLayout>
  );
}
