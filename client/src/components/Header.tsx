import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

interface Props {
  email: string;
}

export default function Header({ email }: Props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gray-100 p-4 flex justify-between items-center shadow">
      <h1 className="text-lg font-semibold">📌 Tasky</h1>
      <div className="text-sm text-gray-700 flex gap-2 items-center">
        <span>{email} 님</span>
        <button onClick={handleLogout} className="text-red-500 hover:underline">로그아웃</button>
      </div>
    </header>
  );
}
