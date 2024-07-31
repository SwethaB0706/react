import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import * as apolloHooks from '@apollo/client';
import Register from './Register';
 
// Mock the useMutation hook
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: jest.fn(),
  gql: jest.fn(),
}));
 
describe('Register Component', () => {
  const mockRegister = jest.fn();
 
  beforeEach(() => {
    // Reset the mock before each test
    mockRegister.mockReset();
    // Set up the mock implementation for useMutation
    apolloHooks.useMutation.mockReturnValue([mockRegister, { loading: false, error: null }]);
  });
 
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
 
  test('renders register form', () => {
    renderComponent();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });
 
  test('updates input values on change', () => {
    renderComponent();
    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
 
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
 
    expect(usernameInput).toHaveValue('testuser');
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });
 
//   test('displays error message on registration error', async () => {
//     mockRegister.mockRejectedValueOnce(new Error('Registration error'));
//     renderComponent();
//     const usernameInput = screen.getByPlaceholderText('Username');
//     const emailInput = screen.getByPlaceholderText('Email');
//     const passwordInput = screen.getByPlaceholderText('Password');
//     const submitButton = screen.getByRole('button', { name: 'Register' });
 
//     fireEvent.change(usernameInput, { target: { value: 'testuser' } });
//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'password123' } });
//     fireEvent.click(submitButton);
 
//     await waitFor(() => {
//       expect(screen.getByText('Error: Registration error')).toBeInTheDocument();
//     });
//   });
 
  test('displays login link', () => {
    renderComponent();
    const loginLink = screen.getByText('Already have an account?');
    expect(loginLink).toBeInTheDocument();
  });
});