import { users } from '../data/Users';
import type { User } from '../types/User';

export const fetchUsers = async (): Promise<User[]> => {
  return users;
};

export const searchUsers = async (search: string): Promise<User[]> => {
  return users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));
};
