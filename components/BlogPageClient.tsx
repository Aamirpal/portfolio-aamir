"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

export default function BlogPageClient({ blogPosts }: { blogPosts: any[] }) {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Sort blogPosts by date in descending order
  const sortedBlogPosts = blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedBlogPosts.map((post, index) => (
          <Link
            key={index}
            href={`/blog/${post.slug}`}
            className="flex justify-center"
          >
            <Card className="max-w-[400px] w-full">
              <CardHeader className="flex gap-3 items-start">
                <div className="flex flex-col w-full">
                  <p className="text-md font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                    {truncateText(post.title, 50)}
                  </p>
                  <p className="text-small text-default-500">{post.date}</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody className="h-[150px] overflow-hidden">
                <p>{truncateText(post.description, 100)}</p>
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
