import { render, screen } from '@testing-library/react';
import FilterButtons from '../FilterButtons';

describe('FilterButtons', () => {
  it('should render', () => {
    render(<FilterButtons onSearch={() => {}} />);
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });
});