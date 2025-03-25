import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';
import { notify } from '../utils/utils';
import { JSX } from 'react';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    if (!isLoggedIn()) {
      notify('로그인이 필요합니다.');
      return <Navigate to="/" replace />;
    }
    return children;
  }