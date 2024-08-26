import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogPageClient from "@/components/BlogPageClient";

export default function BlogPage() {
  const directoryPath = path.join(process.cwd(), "content");
  const filenames = fs.readdirSync(directoryPath);

  const blogPosts = filenames.map((filename) => {
    const filePath = path.join(directoryPath, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      ...data,
      slug: filename.replace(".md", ""),
    };
  });

  return <BlogPageClient blogPosts={blogPosts} />;
}
