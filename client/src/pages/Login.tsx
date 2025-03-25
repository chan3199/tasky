import { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { notify } from '../utils/utils'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const token = await login(email, password);
      localStorage.setItem('token', token);
      notify('로그인 성공!');
      navigate('/todos');
    } catch {
      notify('로그인 실패');
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 gap-4">
      <h2 className="text-2xl font-bold">로그인</h2>
      <input
        className="border px-4 py-2 rounded w-64"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border px-4 py-2 rounded w-64"
        placeholder="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        로그인
      </button>
    </div>
  );
}
