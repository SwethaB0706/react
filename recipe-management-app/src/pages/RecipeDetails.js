import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './RecipeDetails.css';

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

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_RECIPE, { variables: { id } });

  const [deleteRecipe] = useMutation(DELETE_RECIPE, {
    update(cache) {
      const existingRecipes = cache.readQuery({
        query: gql`
          query GetRecipes {
            getRecipes {
              id
              title
              category
            }
          }
        `,
      });

      if (existingRecipes) {
        const newRecipes = existingRecipes.getRecipes.filter((recipe) => recipe.id !== id);
        cache.writeQuery({
          query: gql`
            query GetRecipes {
              getRecipes {
                id
                title
                category
              }
            }
          `,
          data: { getRecipes: newRecipes },
        });
      }
    },
    onCompleted: () => navigate('/recipes'),
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
    <div className="recipe-container">
      <h1 className="recipe-title">{title}</h1>
      <div className="recipe-info">
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Date:</strong> {date}</p>
        <h3>Ingredients:</h3>
        <ul className="list">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3>Instructions:</h3>
        <ul className="list">
          {instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
      <div className="button-container">
        <Link className="button" to={`/edit-recipe/${id}`}>Edit Recipe</Link>
        <button className="delete-button" onClick={handleDelete}>Delete Recipe</button>
      </div>
    </div>
  );
};

export default RecipeDetails;
