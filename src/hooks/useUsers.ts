import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchUsers, searchUsers as searchUsersApi } from '../services/api';
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
        if (isMounted) {
          setUsers(data);
        }
      } catch (error) {
        if (isMounted) {
          setIsError(true);
          setError(error as Error);
        }
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

  const searchUsers = useCallback(async (search: string) => {
    try {
      const filteredUsers = await searchUsersApi(search);
      setUsers(filteredUsers);
    } catch (error) {
      setIsError(true);
      setError(error as Error);
      setIsLoading(false);
    }
  }, []);

  return useMemo(() => ({
    data: users,
    isLoading,
    isError,
    error,
    searchUsers,
  }), [users, isLoading, isError, error, searchUsers]);
};


