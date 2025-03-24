import { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const token = await login(email, password);
      localStorage.setItem('token', token);
      navigate('/todos');
    } catch (err) {
      alert('로그인 실패',);
      console.log(err);
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <input placeholder="이메일" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="비밀번호" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}
