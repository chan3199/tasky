import AuthForm from '../components/AuthForm';
import { signup } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { notify } from '../utils/toast';
import { AxiosError } from 'axios';

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = async (email: string, password: string) => {
    try {
      await signup(email, password);
      notify('회원가입 완료! 로그인 해주세요.');
      navigate('/');
    } catch (err) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        const errorMessage = axiosErr.response?.data?.message || '처리 중 오류가 발생했습니다.';
        notify(errorMessage);
      }
  };

  return <AuthForm title="회원가입" buttonText="가입하기" onSubmit={handleSignup} />;
}
