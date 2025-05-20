import { type JSX } from 'react';
import { useUsers } from '../hooks/useUsers';
import FilterButtons from './FilterButtons';

const UserList = (): JSX.Element => {
  const { data: users, isLoading, isError, error, searchUsers } = useUsers();


  const handleSearch = async (search: string) => {
    try {
      await searchUsers(search);
    } catch (error) {
      console.error(error);
    }
  }

  return (<>
    <h1>Users</h1>
    <FilterButtons onSearch={handleSearch} />
    {isLoading && <p>Loading...</p>}
    {users?.map((user) => (
      <div key={user.id} className='user-card'>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    ))}
    {isError && (
      <p data-testid="error-message">
        There was an error loading the users: {error?.message}
      </p>
    )}
    {users.length === 0 && <p>No users found</p>}
  </>)
}

export default UserList;
