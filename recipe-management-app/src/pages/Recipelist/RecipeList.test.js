import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from 'react-router-dom';
import RecipeList from "./RecipeList";
import { GET_RECIPES } from "./RecipeList"; // Import your query
 
test("renders loading state initially", () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <RecipeList />
    </MockedProvider>
  );
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
 
const mocks = [
    {
      request: {
        query: GET_RECIPES,
      },
      error: new Error("An error occurred"),
    },
  ];
 
  
 