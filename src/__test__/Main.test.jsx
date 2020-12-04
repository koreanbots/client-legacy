  
import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

it('renders without crashing', async() => {
  const { getAllByText } = render(<App />)
  const header = getAllByText('KOREANBOTS')
  expect(header).toHaveLength(2)
});