import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동용
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [rememberMe, setRememberMe] = useState(false);

  // public/images 기준 경로
  const userIcon = "/images/001-user.png";
  const lockIcon = "/images/002-lock.png";
  const eyesOpen = "/images/003-visible.png";
  const eyesHidden = "/images/004-hidden.png";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "rememberMe") {
      setRememberMe(checked);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("로그인 시도:", form);
    alert("로그인 성공!");
    navigate("/"); // 로그인 성공 후 홈 이동
  };

  return (
    <div className="login-container">
      <h1 className="login-title">로그인</h1>
      <p className="login-subtitle">아이디와 비밀번호를 입력해주세요</p>

      <form onSubmit={handleSubmit}>
        {/* 아이디 */}
        <label className="login-label">아이디</label>
        <div className="input-wrapper">
          <img src={userIcon} alt="아이디 아이콘" className="input-icon" />
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="아이디를 입력하세요"
            required
          />
        </div>

        {/* 비밀번호 */}
        <label className="login-label">비밀번호</label>
        <div className="input-wrapper">
          <img src={lockIcon} alt="비밀번호 아이콘" className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            required
          />
          <img
            src={showPassword ? eyesOpen : eyesHidden}
            alt="비밀번호 보기 토글"
            className="eye-toggle-icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        {/* 로그인 상태 유지 */}
        <div className="remember-wrapper">
          <input
            type="checkbox"
            name="rememberMe"
            checked={form.rememberMe}
            onChange={handleChange}
          />
          <label>로그인 상태 유지</label>
        </div>

        {/* 세션 안내 */}
        <div className="session-info">
          <p>⏰ 세션 유지 기간</p>
          <ul>
            {rememberMe ? (
              <>
                <li>일반 로그인: 24시간</li>
                <li>
                  <span className="blue-text">로그인 상태 유지: 30일</span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <span className="blue-text">일반 로그인: 24시간</span>
                </li>
                <li>로그인 상태 유지: 30일</li>
              </>
            )}
          </ul>
          <p className="gray-text">
            * 공용 컴퓨터에서는 로그인 상태 유지를 사용하지 마세요
          </p>
        </div>

        {/* 로그인 버튼 */}
        <button type="submit" className="login-button">
          로그인
        </button>
      </form>

      {/* 하단 링크 */}
      <div className="login-links">
        <a href="/forgot-password" className="link-blue">
          비밀번호를 잊으셨나요?
        </a>
        <div className="divider">또는</div>
        <p>
          계정이 없으신가요?{" "}
          <span
            className="link-blue"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            회원가입
          </span>
        </p>
        <a href="/" className="link-blue">
          홈페이지로 돌아가기
        </a>
      </div>
    </div>
  );
};

export default Login;
