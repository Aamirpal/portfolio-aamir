import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { HTMLAttributes } from "react";

// Define the types for the `code` component's props
interface CodeProps extends HTMLAttributes<HTMLElement> {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export async function generateStaticParams() {
  const directoryPath = path.join(process.cwd(), "content");
  const filenames = fs.readdirSync(directoryPath);

  return filenames.map((filename) => ({
    slug: filename.replace(".md", ""),
  }));
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), "content", `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { content, data } = matter(fileContent);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <header className="w-full max-w-4xl mx-auto p-4 md:p-6 flex justify-center">
        <div className="flex space-x-4">
          <span className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold">
            {data.title}
          </span>
        </div>
      </header>

      <main className="w-full bg-white text-black">
        <div className="max-w-4xl mx-auto p-4 md:p-6">
          <div className="prose max-w-none">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-6">{children}</p>,
                code({ inline, className, children, ...props }: CodeProps) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={dracula as any} // Cast to 'any'
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </main>
    </div>
  );
}
