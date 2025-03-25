import { jwtDecode } from 'jwt-decode';

export const getUserEmail = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const decoded = jwtDecode<{ email: string }>(token);
    return decoded.email;
  } catch {
    return null;
  }
};
