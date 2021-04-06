import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders resume', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Diana Tran/i);
  expect(linkElement).toBeInTheDocument();
});
