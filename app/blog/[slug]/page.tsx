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
    <div className="min-h-screen flex flex-col items-center">
      <header className="w-full max-w-4xl mx-auto p-4 md:p-6 flex">
        <div className="flex space-x-4">
          <span className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold">
            {data.title}
          </span>
        </div>
      </header>

      <main className="flex-grow w-full bg-white text-black">
        <div className="max-w-4xl mx-auto p-4 md:p-6">
          <div className="prose max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-4xl font-bold my-4">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-3xl font-bold my-4">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl font-bold my-3">{children}</h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-xl font-semibold my-3">{children}</h4>
                ),
                h5: ({ children }) => (
                  <h5 className="text-lg font-semibold my-2">{children}</h5>
                ),
                h6: ({ children }) => (
                  <h6 className="text-base font-medium my-2">{children}</h6>
                ),
                p: ({ children }) => (
                  <p className="text-base leading-7 my-4">{children}</p>
                ),
                a: ({ href, children }) => (
                  <a href={href} className="text-blue-600 hover:underline">
                    {children}
                  </a>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
                    {children}
                  </blockquote>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside my-4">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside my-4">{children}</ol>
                ),
                li: ({ children }) => <li className="ml-6">{children}</li>,
                strong: ({ children }) => (
                  <strong className="font-semibold">{children}</strong>
                ),
                em: ({ children }) => <em className="italic">{children}</em>,
                hr: () => <hr className="my-8 border-gray-200" />,
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
