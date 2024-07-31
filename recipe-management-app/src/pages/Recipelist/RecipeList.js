import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { fetchImages } from "./api";
import "./RecipeList.css";

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const GET_RECIPES = gql`
  query GetRecipes {
    getRecipes {
      id
      title
      category
    }
  }
`;

const RecipeList = () => {
  const { loading, error, data } = useQuery(GET_RECIPES);
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState(
    () => getFromLocalStorage("recipeImages") || {}
  );
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentImagePage, setCurrentImagePage] = useState(1);

  useEffect(() => {
    if (data) {
      fetchImagesForRecipes();
    }
  }, [data]);

  const fetchImagesForRecipes = async () => {
    const recipes = data.getRecipes;
    for (const recipe of recipes) {
      if (!images[recipe.id]) {
        setCurrentRecipe(recipe);
        const imageUrl = await fetchImages(recipe.title);
        updateImages({ ...images, [recipe.id]: imageUrl });
        break;
      }
    }
  };

  const updateImages = (newImages) => {
    setImages(newImages);
    saveToLocalStorage("recipeImages", newImages);
  };

  const handleImageConfirmation = async (confirmed) => {
    if (confirmed) {
      setCurrentRecipe(null);
      setCurrentImagePage(1);
      fetchImagesForRecipes();
    } else {
      const newImageUrl = await fetchImages(
        currentRecipe.title,
        currentImagePage + 1
      );
      updateImages({ ...images, [currentRecipe.id]: newImageUrl });
      setCurrentImagePage((prev) => prev + 1);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const recipes = data.getRecipes;

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="recipe-list-container">
      <h1 className="recipe-list-header">Recipe List</h1>
      <input
        type="text"
        className="search-bar"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {currentRecipe && (
        <div className="image-confirmation">
          <h3>Is this image correct for {currentRecipe.title}?</h3>
          <img src={images[currentRecipe.id]} alt={currentRecipe.title} />
          <div>
            <button onClick={() => handleImageConfirmation(true)}>Yes</button>
            <button onClick={() => handleImageConfirmation(false)}>
              No, try another
            </button>
          </div>
        </div>
      )}
      <div className="recipe-grid">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="recipe-card"
            style={{ backgroundImage: `url(${images[recipe.id] || "black"})` }}
          >
            <div className="recipe-card-content">
              <h3>{recipe.title}</h3>
              <p>{recipe.category}</p>
              <Link to={`/recipe/${recipe.id}`} className="view-link">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Link to="/add-recipe" className="add-recipe-button">
        Add New Recipe
      </Link>
    </div>
  );
};

export default RecipeList;
