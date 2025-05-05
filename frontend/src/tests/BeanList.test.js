import { render, screen } from '@testing-library/react';
import BeanList from '../components/BeanList';

test('renders bean list header', () => {
  render(<BeanList />);
  expect(screen.getByText(/beans/i)).toBeInTheDocument();
});
