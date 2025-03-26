import { useState } from 'react';
import { signup } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password);
      navigate('/login');
    } catch (err) {
      setError('회원가입에 실패했습니다. 이미 존재하는 계정일 수 있습니다.\n'+err);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">회원가입</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          required
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          required
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          가입하기
        </button>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>
      <p className="text-center mt-4 text-sm">
        이미 계정이 있으신가요? <a href="/login" className="text-blue-600 hover:underline">로그인</a>
      </p>
    </div>
  );
}
