import { FC, ReactNode } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface RenderMarkdownProps {
  content: string;
}

interface ComponentProps {
  children: ReactNode;
  href?: string;
}

export const RenderMarkDown: FC<RenderMarkdownProps> = ({ content }) => {
  const P: FC<ComponentProps> = ({ children }) => <p className="text-white">{children}</p>;
  const Header: FC<ComponentProps> = ({ children }) => <h3 className="text-white font-bold text-lg">{children}</h3>;
  const Link: FC<ComponentProps> = ({ children, href }) => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className="text-royal-blue cursor-pointer hover:underline underline-offset-2"
    >
      {children}
    </a>
  );
  const OL: FC<ComponentProps> = ({ children }) => <ol className="list-decimal ps-4">{children}</ol>;
  const UL: FC<ComponentProps> = ({ children }) => <ul className="list-disc ps-4">{children}</ul>;
  return (
    <Markdown
      components={{
        p({ children, ...props }) {
          return <P {...props}>{children}</P>;
        },
        h1({ children, ...props }) {
          return <Header {...props}>{children}</Header>;
        },
        h2({ children, ...props }) {
          return <Header {...props}>{children}</Header>;
        },
        h3({ children, ...props }) {
          return <Header {...props}>{children}</Header>;
        },
        h4({ children, ...props }) {
          return <Header {...props}>{children}</Header>;
        },
        h5({ children, ...props }) {
          return <Header {...props}>{children}</Header>;
        },
        h6({ children, ...props }) {
          return <Header {...props}>{children}</Header>;
        },
        a({ children, href }) {
          return <Link href={href}>{children}</Link>;
        },
        ol({ children }) {
          return <OL>{children}</OL>;
        },
        ul({ children }) {
          return <UL>{children}</UL>;
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <div className="*:no-scrollbar">
              <div className="w-full bg-gray-500 mt-2 rounded-t-xl text-white px-4 py-1 font-semibold">{match[1]}</div>
              <SyntaxHighlighter
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                style={coldarkDark}
                customStyle={{ borderEndEndRadius: "0.75rem", borderEndStartRadius: "0.75rem", marginTop: 0 }}
                language={match[1]}
                PreTag="div"
                wrapLongLines
                wrapLines
                children={String(children).replace(/\n$/, "")}
                {...props}
              />
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
};
