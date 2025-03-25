import { useState } from 'react';
import { notify } from '../utils/toast';

interface Props {
  title: string;
  buttonText: string;
  onSubmit: (email: string, password: string) => void;
}

export default function AuthForm({ title, buttonText, onSubmit }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return notify('올바른 이메일 형식을 입력해주세요.');
    }
    
    if (password.length < 4) {
      return notify('비밀번호는 최소 4자 이상이어야 합니다.');
    }
    

    setLoading(true);
    await onSubmit(email, password);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded shadow">
      <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>
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
        onClick={handleSubmit}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
      >
        {loading ? '처리 중...' : buttonText}
      </button>
    </div>
  );
}
