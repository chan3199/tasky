import AuthForm from '../components/AuthForm';
import { login } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import { notify } from '../utils/toast';
import { AxiosError } from 'axios';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      localStorage.setItem('token', (await login(email, password)).data.token);
      notify('로그인 성공!');
      navigate('/todos');
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      const errorMessage = axiosErr.response?.data?.message || '처리 중 오류가 발생했습니다.';
      notify(errorMessage);
    }
  };

  return (
    <>
      <AuthForm title="로그인" buttonText="로그인" onSubmit={handleLogin} />
      <p className="text-center mt-4 text-sm text-gray-500">
        계정이 없으신가요?{' '}
        <Link to="/signup" className="text-blue-500 underline">회원가입</Link>
      </p>
    </>
  );
}
