import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {App} from "./App";
import wait from 'waait';

it('renders without crashing', () => {
    expect(() => render(<App/>)).not.toThrow();
});

it('renders the home page without logging in', async () => {
  const {findByText} = render(<App/>);
  expect(await findByText('Hi, y\'all')).toBeInTheDocument();
});

it('handles the login page properly, failed login, actual login', async () => {
  const {findByText, findByLabelText} = render(<App/>);
  fireEvent.click(await findByText('Login'));
  expect(window.location.pathname).toBe('/login');

  // Reset button should be disabled until there is input
  expect(await findByText('Reset')).toBeDisabled();

  const passwordInput = await findByLabelText('Password');
  const emailInput = await findByLabelText('Email');

  // Empty fields should show an error
  fireEvent.click(await findByText('Submit'));

  // Wait for the form to validate
  await wait(1);

  expect(passwordInput).toHaveClass('error');
  expect(emailInput).toHaveClass('error');

  // Let's apply text
  fireEvent.change(passwordInput, {target: {value: 'test'}});
  fireEvent.change(emailInput, {target: {value: 'test@example.com'}});
  // Once there is input, undo the reset button disable state
  expect(await findByText('Reset')).not.toBeDisabled();
  fireEvent.click(await findByText('Submit'));
  // Value is from the __mock__/firebase.ts file
  expect(await findByText('There is no user with that email')).toBeInTheDocument();
  // Let's see if logging in with a prevalidated user (in __mock__/firebase.ts again) works
  fireEvent.change(passwordInput, {target: {value: 'shouldwork'}});
  fireEvent.change(emailInput, {target: {value: 'works@example.com'}});
  fireEvent.click(await findByText('Submit'));
  await wait(1);
  expect(await findByText('Log Out')).toBeInTheDocument();
});
