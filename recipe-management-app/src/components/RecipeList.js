import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const GET_RECIPES = gql`
  query GetRecipes {
    getRecipes {
      id
      title
      category
    }
  }
`;

const RecipeListContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const RecipeListHeader = styled.h1`
  color: #333;
  text-align: center;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const RecipeCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  text-align: center;
`;

const AddRecipeButton = styled(Link)`
  display: block;
  width: 200px;
  margin: 20px auto;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
`;

const RecipeList = () => {
  const { loading, error, data } = useQuery(GET_RECIPES);
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const recipes = data.getRecipes;

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <RecipeListContainer>
      <RecipeListHeader>Recipe List</RecipeListHeader>
      <SearchBar
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <RecipeGrid>
        {filteredRecipes.map(recipe => (
          <RecipeCard key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.category}</p>
            <Link to={`/recipe/${recipe.id}`}>View Details</Link>
          </RecipeCard>
        ))}
      </RecipeGrid>
      <AddRecipeButton to="/add-recipe">Add New Recipe</AddRecipeButton>
    </RecipeListContainer>
  );
}

export default RecipeList;