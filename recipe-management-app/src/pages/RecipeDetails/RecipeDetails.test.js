import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import RecipeDetails from './RecipeDetails';
import { gql } from '@apollo/client';
 
// Mock useParams and useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
  useNavigate: () => jest.fn(),
}));
 
// Define the GET_RECIPE query here
const GET_RECIPE = gql`
  query GetRecipe($id: ID!) {
    getRecipe(id: $id) {
      id
      title
      ingredients
      instructions
      category
      date
    }
  }
`;
 
const mocks = [
  {
    request: {
      query: GET_RECIPE,
      variables: { id: '1' },
    },
    result: {
      data: {
        getRecipe: {
          id: '1',
          title: 'Test Recipe',
          ingredients: ['Ingredient 1', 'Ingredient 2'],
          instructions: ['Step 1', 'Step 2'],
          category: 'Test Category',
          date: '2023-07-31',
        },
      },
    },
  },
];
 
const renderRecipeDetails = () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <RecipeDetails />
      </BrowserRouter>
    </MockedProvider>
  );
};
 
describe('RecipeDetails', () => {
  test('renders loading state', () => {
    renderRecipeDetails();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
 
  test('renders recipe title', async () => {
    renderRecipeDetails();
    const title = await screen.findByText('Test Recipe');
    expect(title).toBeInTheDocument();
  });
 
  test('renders delete button', async () => {
    renderRecipeDetails();
    const deleteButton = await screen.findByText('Delete Recipe');
    expect(deleteButton).toBeInTheDocument();
  });
});