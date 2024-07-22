import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useParams, Link,useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id)
  }
`;

const RecipeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const RecipeTitle = styled.h1`
  color: #333;
  text-align: center;
`;

const RecipeInfo = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const List = styled.ul`
  padding-left: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled(Link)`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const RecipeDetails= ()=> {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_RECIPE, { variables: { id } });

  const [deleteRecipe] = useMutation(DELETE_RECIPE, {
    onCompleted: () => navigate('/recipes')
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { title, ingredients, instructions, category, date } = data.getRecipe;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe({ variables: { id } });
    }
  };

  return (
    <RecipeContainer>
      <RecipeTitle>{title}</RecipeTitle>
      <RecipeInfo>
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Date:</strong> {date}</p>
        <h3>Ingredients:</h3>
        <List>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </List>
        <h3>Instructions:</h3>
        <List>
          {instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </List>
      </RecipeInfo>
      <ButtonContainer>
        <Button to={`/edit-recipe/${id}`}>Edit Recipe</Button>
        <DeleteButton onClick={handleDelete}>Delete Recipe</DeleteButton>
      </ButtonContainer>
    </RecipeContainer>
  );
}

export default RecipeDetails;