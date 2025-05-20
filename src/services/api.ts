import { users } from '../data/Users';
import type { User } from '../types/User';

export const fetchUsers = async (): Promise<User[]> => {
  return users;
};
