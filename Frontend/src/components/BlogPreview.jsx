import DisplayCards from "./ui/display-cards";
import { Sparkles } from "lucide-react";

const blogData = [
  {
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "How I Built My Second Brain",
    description: "A complete guide to organizing your knowledge.",
    date: "2 days ago",
    titleClassName: "text-blue-400",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "React Best Practices",
    description: "Write clean and scalable React code.",
    date: "5 days ago",
    titleClassName: "text-blue-400",
    className:
      "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "Node.js API Design",
    description: "Build production-ready backend APIs.",
    date: "1 week ago",
    titleClassName: "text-blue-400",
    className:
      "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
  },
];

export default function BlogPreview() {
  return (
    <section className="py-20 px-6 bg-black text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold">
        Latest from the Blog
      </h2>

      <p className="text-gray-400 mt-2">
        Explore insights, ideas, and knowledge.
      </p>

      <div className="mt-12 flex justify-center">
        <DisplayCards cards={blogData} />
      </div>
    </section>
  );
}