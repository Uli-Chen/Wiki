import { useState } from "react";

interface ExpandableBarProps {
  title: string;
  children: React.ReactNode;
}

export function ExpandableBar({ title, children }: ExpandableBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="expandable-bar">
      <div className="expandable-header" onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        <span className={`arrow ${isOpen ? "open" : ""}`}>&#9662;</span>
      </div>
      <div className={`expandable-content ${isOpen ? "show" : ""}`}>
        {children}
      </div>
      <style>{`
        .expandable-bar {
          background-color: #3a3a3a;
          color: white;
          border-radius: 8px;
          margin: 1rem 0;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .expandable-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          cursor: pointer;
          font-size: 1.1rem;
          font-weight: 500;
          user-select: none;
          background: linear-gradient(90deg, #3a3a3a, #4a4a4a);
        }

        .expandable-header:hover {
          background: linear-gradient(90deg, #4a4a4a, #5a5a5a);
        }

        .arrow {
          transition: transform 0.3s ease;
        }

        .arrow.open {
          transform: rotate(180deg);
        }

        .expandable-content {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          padding: 0 1rem;
          transition: all 0.3s ease;
        }

        .expandable-content.show {
          max-height: 500px;
          opacity: 1;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}
