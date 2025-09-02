import { useRef, useState } from "react";
import { gsap } from "gsap";

// ====== 資料 (採用版本二的完整資料) ======
const teamMembers = [
  {
    name: "Yu Fu",
    group: "Wetlab Leader",
    field: "Biology",
    photo: "/public/photos/fy.png",
    intro:
      "I am passionate about bridging AI and biology. I focus on building interpretable ML models for gene expression analysis.",
  },
  {
    name: "Haobo Lin",
    group: "Drylab Leader",
    field: "Computer Science",
    photo: "https://placehold.co/100x100/db2777/ffffff?text=BC",
    intro:
      "I enjoy designing novel gene circuits and applying CRISPR technologies to real-world challenges.",
  },
  {
    name: "Cathy Li",
    group: "Member",
    field: "Science Communication & Policy",
    photo: "https://placehold.co/100x100/16a34a/ffffff?text=CL",
    intro:
      "I love translating synthetic biology into accessible knowledge and exploring its societal impacts.",
  },
  {
    name: "David Wu",
    group: "Member",
    field: "Metabolic Engineering",
    photo: "https://placehold.co/100x100/eab308/ffffff?text=DW",
    intro:
      "I work on optimizing microbial pathways for sustainable chemical production.",
  },
  {
    name: "Eva Sun",
    group: "Member",
    field: "Protein Design",
    photo: "https://placehold.co/100x100/2563eb/ffffff?text=ES",
    intro:
      "I focus on computational protein design to expand synthetic biology capabilities.",
  },
];

// ====== 卡片元件 (採用版本一的穩定結構) ======
function TeamCard({ member }) {
  const cardRef = useRef(null); // 直接鎖定 .card 元素
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    gsap.to(cardRef.current, {
      rotationY: flipped ? 0 : 180,
      duration: 0.75,
      ease: "power2.inOut",
    });
    setFlipped(!flipped);
  };

  return (
    <div className="card-container" onClick={handleFlip}>
      <div ref={cardRef} className="card">
        {/* 正面 */}
        <div className="card-front">
          <img src={member.photo} alt={member.name} className="avatar" />
          <h3 className="name">{member.name}</h3>
          <p className="group">{member.group}</p>
          <p className="field">{member.field}</p>
        </div>

        {/* 背面 */}
        <div className="card-back">
          <p className="intro">{member.intro}</p>
        </div>
      </div>
    </div>
  );
}

// ====== 頁面元件 (採用版本二的佈局) ======
export function Members() {
  const leads = teamMembers.filter((m) => (m.group === "Drylab Leader" || m.group === "Wetlab Leader"));
  const members = teamMembers.filter((m) => m.group === "Member");

  return (
    <div className="page">
      <h1 className="cardtitle">Team Members</h1>

      <div className="cardsection">
        <h2 className="cardsection-title">Team Leads</h2>
        <div className="grid-leads">
          {leads.map((member, idx) => (
            <TeamCard key={idx} member={member} />
          ))}
        </div>
      </div>

      <div className="carddivider" />

      <div className="cardsection">
        <h2 className="cardsection-title">Members</h2>
        <div className="grid-members">
          {members.map((member, idx) => (
            <TeamCard key={idx} member={member} />
          ))}
        </div>
      </div>

      {/* ====== 樣式 (整合版本二的風格到版本一的結構上) ====== */}
      <style>{`
        /* ====== 頁面 & 參考線 ====== */
        .page {
          --silver: #c0c0c0;
          --glass: rgba(120, 120, 120, 0.18);
          --glass-strong: rgba(140,140,140,0.28);
          --text: #e6e6e6;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: radial-gradient(1200px 600px at 20% -10%, rgba(255,255,255,0.08), transparent), #141414;
          padding: 2.5rem 1.25rem 4rem;
          color: var(--text);
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial;
          position: relative;
          overflow: hidden;
        }
        .page::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: 
            linear-gradient(to right, rgba(192,192,192,0.10) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(192,192,192,0.06) 1px, transparent 1px);
          background-size: 120px 120px, 120px 120px;
          mix-blend-mode: screen;
          opacity: 0.5;
        }
        .cardtitle {
          font-size: 2.25rem; font-weight: 800; letter-spacing: 0.02em;
          margin: 0 0 2rem; color: var(--silver);
          text-shadow: 0 0 24px rgba(255,255,255,0.12);
        }
        .cardsection { width: 100%; max-width: 1200px; margin: 0 auto 2.5rem; }
        .cardsection-title {
          font-size: 1.25rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--silver);
          margin: 0 0 1rem; padding-left: 0.75rem; position: relative;
        }
        .cardsection-title::before {
          content: ""; position: absolute; left: 0; top: 50%; transform: translateY(-50%);
          width: 4px; height: 1.2em; background: var(--silver);
          box-shadow: 0 0 12px rgba(255,255,255,0.25);
        }
        .carddivider {
          width: min(1100px, 90%); height: 1px;
          background: linear-gradient(to right, transparent, var(--silver), transparent);
          margin: 2.25rem auto 2.5rem; opacity: 0.7;
        }

        /* ====== 網格佈局 ====== */
        .grid-leads {
          display: grid; grid-template-columns: repeat(2, minmax(260px, 1fr));
          gap: 1.75rem; justify-items: center;
        }
        .grid-members {
          display: grid; grid-template-columns: repeat(3, minmax(260px, 1fr));
          gap: 1.75rem; justify-items: center;
        }
        @media (max-width: 1024px) {
          .grid-members { grid-template-columns: repeat(2, minmax(240px, 1fr)); }
        }
        @media (max-width: 640px) {
          .grid-leads { grid-template-columns: 1fr; }
          .grid-members { grid-template-columns: 1fr; }
        }

        /* ====== 卡片容器 (設定 3D 視角) ====== */
        .card-container {
          width: 20rem; height: 18rem;
          cursor: pointer;
          transition: transform 220ms ease, filter 220ms ease;
          will-change: transform;
          perspective: 1200px;
        }
        .card-container:hover { transform: translateY(-10px); filter: brightness(1.02); }
        .card-container:focus-visible { outline: 2px solid var(--silver); outline-offset: 4px; border-radius: 1rem; }

        /* ====== 卡片本體 (我們旋轉這個元素) ====== */
        .card {
          position: relative; width: 100%; height: 100%;
          border-radius: 1rem;
          will-change: transform;
          transform-style: preserve-3d;
          background: linear-gradient(135deg, rgba(160,160,160,0.18), rgba(200,200,200,0.10));
        }
        
        /* ====== 卡片正反面 (通用樣式) ====== */
        .card-front, .card-back {
          position: absolute; 
          inset: 0;
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center;
          padding: 1rem; 
          border-radius: 1rem; 
          color: var(--silver); 
          text-align: center;
          background: linear-gradient(135deg, var(--glass), var(--glass-strong));
          border: 1px solid rgba(192,192,192,0.35);
          box-shadow: 0 8px 30px rgba(0,0,0,0.35), inset 0 0 0.5px rgba(255,255,255,0.25);
          backdrop-filter: blur(10px) saturate(115%);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        /* ====== 卡片背面 (特定樣式) ====== */
        .card-back {
          padding: 1.25rem 1rem;
          transform: rotateY(180deg);
        }

        /* ====== 內容樣式 ====== */
        .avatar {
          width: 100px; height: 100px; border-radius: 50%; object-fit: cover;
          box-shadow: 0 2px 10px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.25);
        }
        .name { font-size: 1.25rem; font-weight: 700; letter-spacing: 0.02em; margin-top: 0.35rem; }
        .group { font-size: 1rem; opacity: 0.9; margin: 0.35rem 0;}
        .field { font-size: 1rem; opacity: 0.85; max-width: 90%; margin: 0.35rem 0; }
        .intro { font-size: 1.05rem; line-height: 1.5; color: #efefef; opacity: 0.95; }
      `}</style>
    </div>
  );
}

