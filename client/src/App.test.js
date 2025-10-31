import { render, screen } from '@testing-library/react';
import App from './App';

test('renders register form', () => {
  render(<App />);
  const linkElement = screen.getByText(/Register New User/i);
  expect(linkElement).toBeInTheDocument();
});
