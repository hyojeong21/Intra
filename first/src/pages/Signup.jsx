import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const SignUp = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    confirmPassword: '',
  });

  const userIcon = '/images/001-user.png';
  const emailIcon = '/images/mail.png';
  const lockIcon = '/images/002-lock.png';
  const eyesOpen = '/images/003-visible.png';
  const eyesHidden = '/images/004-hidden.png';

  const validateEmail = (email) => {
    if (email && !email.endsWith('@hallym.ac.kr')) {
      return '학교 이메일(@hallym.ac.kr) 형식이 아닙니다.';
    }
    return '';
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (confirmPassword && password !== confirmPassword) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === 'email') {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
    if (name === 'confirmPassword' || name === 'password') {
      const newPassword = name === 'password' ? value : form.password;
      const newConfirmPassword = name === 'confirmPassword' ? value : form.confirmPassword;
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(newPassword, newConfirmPassword),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailError = validateEmail(form.email);
    const passwordError = validateConfirmPassword(form.password, form.confirmPassword);

    if (emailError || passwordError) {
      setErrors({ email: emailError, confirmPassword: passwordError });
      alert('입력 정보를 다시 확인해주세요.');
      return;
    }

    console.log(form);
    alert('회원가입 성공!');
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">회원가입</h1>
      <p className="signup-subtitle">필수 정보를 입력해주세요</p>
      <form onSubmit={handleSubmit}>
        {/* 아이디 */}
        <label className="signup-label">아이디</label>
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

        {/* 이메일 */}
        <label className="signup-label">이메일</label>
        <div className="input-wrapper">
          <img src={emailIcon} alt="이메일 아이콘" className="input-icon" />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="학교 이메일을 입력하세요 (예시: Intra@hallym.ac.kr)"
            required
            className={errors.email ? 'input-error' : ''}
          />
        </div>
        {errors.email && <p className="error-message">{errors.email}</p>}

        {/* 비밀번호 */}
        <label className="signup-label">비밀번호</label>
        <div className="input-wrapper">
          <img src={lockIcon} alt="비밀번호 아이콘" className="input-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
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

        {/* 비밀번호 확인 */}
        <label className="signup-label">비밀번호 확인</label>
        <div className="input-wrapper">
          <img src={lockIcon} alt="비밀번호 아이콘" className="input-icon" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호를 다시 입력하세요"
            required
            className={errors.confirmPassword ? 'input-error' : ''}
          />
          <img
            src={showConfirmPassword ? eyesOpen : eyesHidden}
            alt="비밀번호 보기 토글"
            className="eye-toggle-icon"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </div>
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

        <button type="submit" className="signup-button">회원가입</button>
      </form>
      <div className="signup-links">
        <a href="/resend-email" className="link-blue">인증메일을 못받으셨나요?</a>
        <p>이미 계정이 있으신가요? <a href="/login" className="link-blue">로그인</a></p>
        <a href="/" className="link-blue">홈페이지로 돌아가기</a>
      </div>
    </div>
  );
};

export default SignUp;
