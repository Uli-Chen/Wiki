import React, { useState, useEffect } from "react";
import "./BackToTop.css";
// 你可以使用自己的圖片，或者使用 SVG 代替
import upArrow from "../../public/ufo.png";

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 監聽滾動事件來控制按鈕的顯示/隱藏
  useEffect(() => {
    const toggleVisibility = () => {
      // 當滾動超過 300 像素時顯示按鈕
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // 清理函數：在組件卸載時移除事件監聽器
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // 點擊按鈕後平滑滾動到頁面頂部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`back-to-top ${isVisible ? "show" : ""}`}>
      <img
        src={upArrow} // 替換成你的圖片路徑
        alt="Back to top"
        onClick={scrollToTop}
        className="back-to-top-icon"
      />
    </div>
  );
};

export default BackToTopButton;
