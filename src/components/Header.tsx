import "./Header.css";

interface HeaderProps {
  title: string;
  lead: string;
}

export function Header({ title, lead }: HeaderProps) {
  if (title === "Home") {
    return <></>;
  } else {
    return (
      <header className="header">
        {/* 标题区 */}
        <div className="header-top">
          <div className="header-text">
            <h1>{title}</h1>
          </div>
          <div className="header-image">
            <span>Image</span>
          </div>
        </div>

        {/* 三张卡片 */}
        <div className="header-cards">
          <div className="card">
            <h2>Card 1</h2>
            <p>This is the first card content.</p>
          </div>
          <div className="card">
            <h2>Card 2</h2>
            <p>This is the second card content.</p>
          </div>
          <div className="card">
            <h2>Card 3</h2>
            <p>This is the third card content.</p>
          </div>
        </div>
      </header>
    );
  }
}
