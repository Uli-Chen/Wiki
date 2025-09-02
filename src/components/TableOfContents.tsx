import React, { useState, useEffect, useRef } from "react";
import "./TableOfContents.css";

// 定義標題物件的型別
interface Heading {
  id: string;
  text: string;
  level: "H1" | "H2" | "H3"; // 假設你可能會用到 h3
}

interface TableOfContentsProps {
  // 指定要掃描的內容容器的選擇器，預設為 #page-content
  contentSelector?: string;
  // 一個用來觸發組件更新的屬性，通常是當前頁面的路由路徑
  contentKey?: any;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  contentSelector = "#page-content",
  contentKey,
}) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const headingElementsRef = useRef<{ [key: string]: HTMLElement }>({});
  const revealPoint = 200;

  // 1. 提取標題：當 contentSelector 或 contentKey 改變時重新執行
  useEffect(() => {
    const contentElement = document.querySelector(contentSelector);
    if (!contentElement) {
      console.warn(
        `Content element with selector "${contentSelector}" not found.`
      );
      setHeadings([]);
      return;
    }

    const extractedHeadings: Heading[] = Array.from(
      contentElement.querySelectorAll<HTMLElement>("h1, h2, h3")
    ).map((el) => {
      const id =
        el.id ||
        el.textContent
          ?.trim()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") ||
        "";
      el.id = id;
      headingElementsRef.current[id] = el;
      return {
        id,
        text: el.textContent || "",
        level: el.tagName as "H1" | "H2" | "H3",
      };
    });
    setHeadings(extractedHeadings);
    setActiveId("");
    setIsVisible(false); // 重置可見性，讓它重新判斷
  }, [contentSelector, contentKey]);

  // 2. 監聽滾動事件來高亮和控制顯示
  useEffect(() => {
    const handleScroll = () => {
      const fromTop = window.scrollY + 100;
      let newActiveId = "";

      for (const id in headingElementsRef.current) {
        const el = headingElementsRef.current[id];
        if (
          el.offsetTop <= fromTop &&
          el.offsetTop + el.offsetHeight > fromTop
        ) {
          newActiveId = id;
          break;
        }
      }
      setActiveId(newActiveId);

      if (window.scrollY > revealPoint) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 點擊目錄項目時的平滑滾動
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const el = headingElementsRef.current[id];
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className={`toc-container ${isVisible ? "is-visible" : "is-hidden"}`}>
      <ul>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`toc-item toc-level-${heading.level.toLowerCase()}`}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleLinkClick(e, heading.id)}
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
