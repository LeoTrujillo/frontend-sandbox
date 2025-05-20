import { type JSX } from 'react';
import { useUsers } from '../hooks/useUsers';

const UserList = (): JSX.Element => {
  const { data: users, isLoading, isError, error } = useUsers();

  return (<>
    <h1>Users</h1>
    {isLoading && <p>Loading...</p>}
    {users?.map((user) => (
      <div key={user.id} className='user-card'>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    ))}
    {isError && <p>There was an error loading the users: {error?.message}</p>}
    {users.length === 0 && <p>No users found</p>}
  </>)
}

export default UserList;
