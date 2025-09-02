import React, { useState, useEffect } from "react";
import "./ReadingProgressBar.css";

const ReadingProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 定義滾動事件處理函數
    const handleScroll = () => {
      // 獲取當前頁面滾動的位置
      const scrollTop = window.scrollY;

      // 計算整個頁面的可滾動高度
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // 計算進度百分比，並限制在 0 到 100 之間
      const scrollProgress = (scrollTop / docHeight) * 100;

      setProgress(scrollProgress);
    };

    // 添加滾動事件監聽器
    window.addEventListener("scroll", handleScroll);

    // 清理函數：在組件卸載時移除事件監聽器
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="progress-bar-container">
      {/* 使用 style 屬性來動態設定寬度 */}
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ReadingProgressBar;
