import React, { useState, useEffect, useRef } from "react";
import "./TableOfContents.css";

interface Heading {
  id: string;
  text: string;
  level: "H1" | "H2" | "H3";
}

interface TableOfContentsProps {
  contentSelector?: string;
  contentKey?: any;
  headerSelector?: string; // 默认 header 元素
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  contentSelector = "#page-content",
  contentKey,
  headerSelector = "header",
}) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const observer = useRef<IntersectionObserver | null>(null);

  // 生成唯一 ID
  const generateId = (text: string, index: number) =>
    text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "") +
    "-" +
    index;

  // 提取标题
  useEffect(() => {
    const contentElement = document.querySelector(contentSelector);
    if (!contentElement) return;

    const elements = Array.from(
      contentElement.querySelectorAll<HTMLElement>("h1, h2, h3")
    );

    const extractedHeadings: Heading[] = elements.map((el, index) => {
      const id = el.id || generateId(el.textContent || "section", index);
      el.id = id;
      return {
        id,
        text: el.textContent || "",
        level: el.tagName as "H1" | "H2" | "H3",
      };
    });

    setHeadings(extractedHeadings);
  }, [contentSelector, contentKey]);

  // 追踪 Header 是否离开视口
  useEffect(() => {
    const headerEl = document.querySelector(headerSelector);
    if (!headerEl) return;

    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(!entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );

    headerObserver.observe(headerEl);
    return () => headerObserver.disconnect();
  }, [headerSelector]);

  // 追踪当前标题
  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0.1 }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.current?.observe(el);
    });

    return () => observer.current?.disconnect();
  }, [headings]);

  // 点击目录 → 平滑滚动
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className={`toc-container ${isVisible ? "is-visible" : "is-hidden"}`}>
      <div className="toc-title">Contents</div>
      <ul>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`toc-item toc-level-${heading.level.toLowerCase()}`}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={heading.id === activeId ? "active" : ""}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
