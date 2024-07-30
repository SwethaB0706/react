// import React, { useState } from 'react';
// import { useQuery, gql } from '@apollo/client';
// import { Link } from 'react-router-dom';
// import './RecipeList.css';

// const GET_RECIPES = gql`
//   query GetRecipes {
//     getRecipes {
//       id
//       title
//       category
//     }
//   }
// `;

// const RecipeList = () => {
//   const { loading, error, data } = useQuery(GET_RECIPES);
//   const [searchTerm, setSearchTerm] = useState('');

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const recipes = data.getRecipes;

//   const filteredRecipes = recipes.filter(recipe =>
//     recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="recipe-list-container">
//       <h1 className="recipe-list-header">Recipe List</h1>
//       <input
//         type="text"
//         className="search-bar"
//         placeholder="Search recipes..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <div className="recipe-grid">
//         {filteredRecipes.map(recipe => (
//           <div key={recipe.id} className="recipe-card">
//             <h3>{recipe.title}</h3>
//             <p>{recipe.category}</p>
//             <Link className='viewlink' to={`/recipe/${recipe.id}`}>View Details</Link>
//           </div>
//         ))}
//       </div>
//       <Link to="/add-recipe" className="add-recipe-button">Add New Recipe</Link>
//     </div>
//   );
// }

// export default RecipeList;
// RecipeList.js
// import React, { useState, useEffect } from 'react';
// import { useQuery, gql } from '@apollo/client';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import { fetchImages } from './api'; // Import the fetchImages function

// const GET_RECIPES = gql`
//   query GetRecipes {
//     getRecipes {
//       id
//       title
//       category
//     }
//   }
// `;

// const RecipeListContainer = styled.div`
//   max-width: 800px;
//   margin: 0 auto;
//   padding: 20px;
//   backdrop-filter: blur(7px);
//   -webkit-backdrop-filter: blur(7px);
//   border: 1px solid rgba(255, 255, 255, 0.5);
//   border-radius:5px;
// `;

// const RecipeListHeader = styled.h1`
// text-align: center;
//   background: linear-gradient(90deg, #ff7d58, #ff9900);
//   -webkit-background-clip: text;
//   background-clip: text;
//   -webkit-text-fill-color: transparent;

// `;

// const SearchBar = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 20px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
// `;

// const RecipeGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//   gap: 20px;

// `;

// const RecipeCard = styled.div`
//   background-size: cover;
//   background-position: center;
//   //border: 1px solid #ddd;
//   border-radius: 5px;
//   padding: 15px;
//   text-align: center;
//   color: white; /* Make text readable on dark backgrounds */
//   height: 200px; /* Set a fixed height */
//   display: flex;
//   align-items: center;
//   justify-content: center;

// `;

// const AddRecipeButton = styled(Link)`
//   display: block;
//   width: 200px;
//   color:#fff;
//   margin: 20px auto;
//   padding: 10px;
//   background-color: #ff7d58;
//   background: linear-gradient(90deg, #ff7d58, #ff9900);
//   text-align: center;
//   text-decoration: none;
//   border-radius: 5px;
// `;

// const RecipeList = () => {
//   const { loading, error, data } = useQuery(GET_RECIPES);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [images, setImages] = useState({});

//   useEffect(() => {
//     const fetchImagesForRecipes = async () => {
//       const recipes = data.getRecipes;
//       const imagePromises = recipes.map(recipe => fetchImages(recipe.title));
//       const imageUrls = await Promise.all(imagePromises);

//       const imageMap = recipes.reduce((acc, recipe, index) => {
//         acc[recipe.id] = imageUrls[index];
//         return acc;
//       }, {});

//       setImages(imageMap);
//     };

//     if (data) {
//       fetchImagesForRecipes();
//     }
//   }, [data]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const recipes = data.getRecipes;

//   const filteredRecipes = recipes.filter(recipe =>
//     recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <RecipeListContainer className='cca'>
//       <RecipeListHeader>Recipe List</RecipeListHeader>
//       <SearchBar
//         type="text"
//         placeholder="Search recipes..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <RecipeGrid >
//         {filteredRecipes.map(recipe => (
//           <RecipeCard
//             key={recipe.id}
//             style={{ backgroundImage: `url(${images[recipe.id]})` }}
//           >
//             <div className='xxx'>
//               <h3>{recipe.title}</h3>
//               <p>{recipe.category}</p>
//               <Link to={`/recipe/${recipe.id}`}>View Details</Link>
//             </div>
//           </RecipeCard>
//         ))}
//       </RecipeGrid>
//       <AddRecipeButton to="/add-recipe">Add New Recipe</AddRecipeButton>
//     </RecipeListContainer>
//   );
// }

// export default RecipeList;
// RecipeList.js
// import React, { useState, useEffect } from 'react';
// import { useQuery, gql } from '@apollo/client';
// import { Link } from 'react-router-dom';
// import { fetchImages } from './api';
// import './RecipeList.css';

// const GET_RECIPES = gql`
//   query GetRecipes {
//     getRecipes {
//       id
//       title
//       category
//     }
//   }
// `;

// const RecipeList = () => {
//   const { loading, error, data } = useQuery(GET_RECIPES);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [images, setImages] = useState({});
//   const [currentRecipe, setCurrentRecipe] = useState(null);
//   const [currentImagePage, setCurrentImagePage] = useState(1);

//   useEffect(() => {
//     if (data) {
//       fetchImagesForRecipes();
//     }
//   }, [data]);

//   const fetchImagesForRecipes = async () => {
//     const recipes = data.getRecipes;
//     for (const recipe of recipes) {
//       if (!images[recipe.id]) {
//         setCurrentRecipe(recipe);
//         const imageUrl = await fetchImages(recipe.title);
//         setImages(prev => ({ ...prev, [recipe.id]: imageUrl }));
//         break;
//       }
//     }
//   };

//   const handleImageConfirmation = async (confirmed) => {
//     if (confirmed) {
//       setCurrentRecipe(null);
//       setCurrentImagePage(1);
//       fetchImagesForRecipes();
//     } else {
//       const newImageUrl = await fetchImages(currentRecipe.title, currentImagePage + 1);
//       setImages(prev => ({ ...prev, [currentRecipe.id]: newImageUrl }));
//       setCurrentImagePage(prev => prev + 1);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const recipes = data.getRecipes;

//   const filteredRecipes = recipes.filter(recipe =>
//     recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="recipe-list-container">
//       <h1 className="recipe-list-header">Recipe List</h1>
//       <input
//         type="text"
//         className="search-bar"
//         placeholder="Search recipes..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       {currentRecipe && (
//         <div className="image-confirmation">
//           <h3>Is this image correct for {currentRecipe.title}?</h3>
//           <img src={images[currentRecipe.id]} alt={currentRecipe.title} />
//           <div>
//             <button onClick={() => handleImageConfirmation(true)}>Yes</button>
//             <button onClick={() => handleImageConfirmation(false)}>No, try another</button>
//           </div>
//         </div>
//       )}
//       <div className="recipe-grid">
//         {filteredRecipes.map(recipe => (
//           <div key={recipe.id} className="recipe-card" style={{ backgroundImage: `url(${images[recipe.id]})` }}>
//             <div className="recipe-card-content">
//               <h3>{recipe.title}</h3>
//               <p>{recipe.category}</p>
//               <Link to={`/recipe/${recipe.id}`} className="view-link">View Details</Link>
//             </div>
//           </div>
//         ))}
//       </div>
//       <Link to="/add-recipe" className="add-recipe-button">Add New Recipe</Link>
//     </div>
//   );
// }

// export default RecipeList;
import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { fetchImages } from "./api";
import "./RecipeList.css";

// Helper functions for localStorage
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
