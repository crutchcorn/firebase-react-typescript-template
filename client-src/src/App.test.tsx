import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {App} from "./App";

it('renders without crashing', () => {
    expect(() => render(<App/>)).not.toThrow();
});

it('renders the home page without logging in', async () => {
  const {findByText} = render(<App/>);
  expect(await findByText('Hi, y\'all')).toBeInTheDocument();
});

it('handles the login page properly', async () => {
  const {findByText, findByLabelText, debug} = render(<App/>);
  fireEvent.click(await findByText('Login'));
  expect(window.location.pathname).toBe('/login');
  expect(await findByText('Reset')).toBeDisabled();
  fireEvent.change(await findByLabelText('Password'), {target: {value: 'test'}});
  fireEvent.change(await findByLabelText('Email'), {target: {value: 'test@example.com'}});
  expect(await findByText('Reset')).not.toBeDisabled();
  fireEvent.click(await findByText('Submit'));
  debug();
});
