import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pages from "../pages.ts";
import "./Navbar.css";

export function Navbar() {
  // 只保留滚动显隐和移动菜单的状态
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 处理页面滚动的逻辑
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsVisible(true);
        return;
      }
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, isMobileMenuOpen]);

  // 点击任何链接后都关闭移动端菜单
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const pageLinks = Pages.map((item, pageIndex) => {
    if ("folder" in item && item.folder) {
      // <li> 不再需要动态的 'open' 类
      // <span> 不再需要 onClick 事件
      return (
        <li key={`page-${pageIndex}`} className="nav-item dropdown">
          <span className="nav-link">{item.name}</span>
          <ul className="dropdown-menu">
            {item.folder.map((subpage, subpageIndex) => (
              <li key={`subpage-${pageIndex}-${subpageIndex}`}>
                <Link
                  to={subpage.path ?? "src/contents"}
                  className="dropdown-link"
                  onClick={handleLinkClick}
                >
                  {subpage.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      );
    } else if ("path" in item && item.path) {
      return (
        <li key={`page-${pageIndex}`} className="nav-item">
          <Link to={item.path} className="nav-link" onClick={handleLinkClick}>
            {item.name}
          </Link>
        </li>
      );
    }
    return null;
  });

  return (
    <nav className={`navbar ${isVisible ? "navbar-visible" : "navbar-hidden"}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={handleLinkClick}>
          {import.meta.env.VITE_TEAM_NAME || "MyTeam"}
        </Link>

        <button
          className="navbar-toggle"
          aria-label="Toggle navigation"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {/* ... icon bars ... */}
        </button>

        <div className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
          <ul className="nav-menu">{pageLinks}</ul>
        </div>
      </div>
    </nav>
  );
}
