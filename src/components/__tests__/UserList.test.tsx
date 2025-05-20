import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserList from '../UserList';
import { fetchUsers } from '../../services/api';

// Mock del módulo api
jest.mock('../../services/api', () => ({
  fetchUsers: jest.fn()
}));

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

describe('UserList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetchUsers as jest.Mock).mockResolvedValue(mockUsers);
  });

  it('should render loading state initially', () => {
    render(<UserList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render users after loading', async () => {
    render(<UserList />);
    
    // Esperar a que desaparezca el estado de carga
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    // Verificar que los usuarios se muestren
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should render error state when fetch fails', async () => {
    const errorMessage = 'Failed to fetch';
    (fetchUsers as jest.Mock).mockRejectedValue(new Error(errorMessage));
    
    render(<UserList />);
    
    // Esperar a que desaparezca el estado de carga
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    // Verificar el mensaje de error
    const errorElement = screen.getByTestId('error-message');
    expect(errorElement).toHaveTextContent(`There was an error loading the users: ${errorMessage}`);
  });
});