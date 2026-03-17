import { render, screen } from '@testing-library/react';
import App from './App';

test('renders octofit heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/octofit tracker/i);
  expect(headingElement).toBeInTheDocument();
});
