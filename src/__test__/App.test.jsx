import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

it('renders without crashing', async() => {
  const div = document.createElement('div');
  render(<App />, div);
});