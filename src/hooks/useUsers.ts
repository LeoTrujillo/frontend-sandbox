import { useState, useEffect } from 'react';
import { fetchUsers } from '../services/api';
import type { User } from '../types/User';


export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setError(error as Error);
        setIsLoading(false);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    loadUsers();
    return () => {
      isMounted = false;
    };
  }, []);

  return {
    data: users,
    isLoading,
    isError,
    error,
  };
};


