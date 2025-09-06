import { useState } from "react";
import "./ExpandableBar.css";

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
    </div>
  );
}
