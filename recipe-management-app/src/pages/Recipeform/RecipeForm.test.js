import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import RecipeForm from './RecipeForm';
 
test('renders the RecipeForm component with all fields', () => {
  render(
    <MockedProvider>
      <MemoryRouter>
        <RecipeForm />
      </MemoryRouter>
    </MockedProvider>
  );
 
  // Check for form title
  expect(screen.getByText(/add new recipe/i)).toBeInTheDocument();
 
  // Check for input fields
  expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/ingredients \(one per line\)/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/instructions \(one step per line\)/i)).toBeInTheDocument();
 
  // Check for select field
  expect(screen.getByText(/select category/i)).toBeInTheDocument();
 
 
  // Check for submit button
  expect(screen.getByText(/add recipe/i)).toBeInTheDocument();
});
 
test('updates input values on change', () => {
    render(
        <MockedProvider>
          <MemoryRouter>
            <RecipeForm />
          </MemoryRouter>
        </MockedProvider>
      );
    const Title = screen.getByPlaceholderText('Title');
    const Ingredients = screen.getByPlaceholderText('Ingredients (one per line)');
    const Instructions = screen.getByPlaceholderText('Instructions (one step per line)');
 
    fireEvent.change(Title, { target: { value: 'Idly' } });
    fireEvent.change(Ingredients, { target: { value: 'flour' } });
    fireEvent.change(Instructions, { target: { value: 'steam' } });
 
    expect(Title).toHaveValue('Idly');
    expect(Ingredients).toHaveValue('flour');
    expect(Instructions).toHaveValue('steam');
  });
 
 