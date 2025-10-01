import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "8px",
    backgroundColor: "#3094ff",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.1s",
  };

  const buttonHoverStyle = { backgroundColor: "#0056b3" };

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: "10px",
          left: "20px",
          fontSize: "35px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        <img
          src="/images/hallymm.png"
          alt="logo background"
          style={{ width: "80px", height: "40px", marginRight: "15px" }}
        />
        INTRAMURAL LEAGUE
      </div>

      <div style={{ position: "fixed", top: "20px", right: "20px", display: "flex", gap: "7px" }}>
        {[
          { label: "팀소개", path: "/team/농구" },
          { label: "경기 일정", path: "/schedule" },
          { label: "응원톡", path: "/cheer" },
          { label: "공지사항", path: "/notices-extended" },
          { label: "로그인", path: "/login" },
          { label: "홈", path: "/" },
        ].map((btn, idx) => (
          <button
            key={idx}
            onClick={() => navigate(btn.path)}
            style={buttonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
