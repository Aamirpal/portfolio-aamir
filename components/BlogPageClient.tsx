"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

export default function BlogPageClient({ blogPosts }) {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <Link
            key={index}
            href={`/blog/${post.slug}`}
            className="flex justify-center"
          >
            <Card className="max-w-[400px] w-full">
              <CardHeader className="flex gap-3">
                <Image
                  alt="Blog thumbnail"
                  height={40}
                  radius="sm"
                  src={
                    post.imageUrl ||
                    "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                  } // Fallback image
                  width={40}
                />
                <div className="flex flex-col">
                  <p className="text-md font-semibold">{post.title}</p>
                  <p className="text-small text-default-500">{post.date}</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>{post.description}</p>
              </CardBody>
              <Divider />
              <CardFooter className="flex justify-end">
                <Link href={`/blog/${post.slug}`} underline="hover">
                  Read More
                </Link>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
