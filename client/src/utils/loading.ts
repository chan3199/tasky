import { useState } from 'react';

// 로딩 상태를 재사용 가능한 훅으로 래핑
export function useLoading() {
  const [loading, setLoading] = useState(false);

  const withLoading = async <T>(asyncFn: () => Promise<T>): Promise<T> => {
    setLoading(true);
    try {
      return await asyncFn();
    } finally {
      setLoading(false);
    }
  };

  return { loading, withLoading };
}
