// import React from 'react';
// import { useQuery, gql } from '@apollo/client';
// import { Link } from 'react-router-dom';
// import styles from './Dashboard.module.css';
// import {useState} from 'react';

// const GET_RECIPES = gql`
//   query GetRecipes {
//     getRecipes {
//       id
//       title
//       category
//     }
//   }
// `;

// const Dashboard = () => {
//   const { loading, error, data } = useQuery(GET_RECIPES, {
//     fetchPolicy: 'network-only',
//   });
//   const [selectedCategory, setSelectedCategory] = useState('');
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

  
//   const recipes = data.getRecipes;
//   const categories = [...new Set(recipes.map(recipe => recipe.category))];

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//   };
//   const handleAllRecipesClick = () => {    
//     setSelectedCategory (''); 
//   };
  
 
//   const filteredRecipes = selectedCategory
//     ? recipes.filter(recipe => recipe.category === selectedCategory)
//     : recipes;
 
//     return (
//       <div className={styles.dashboardContainer}>
//         <h1 className={styles.dashboardHeader}>Recipe Dashboard</h1>
//         <div className={styles.summary}>
//           <p>Total Recipes: {recipes.length}</p>
          
//           <div className={styles.categorySlider}>
//           <button 
//           className={styles.categoryItem}
//           onClick={handleAllRecipesClick}
//         >
//           All Recipes
//         </button>
//             {categories.map(category => (
//               <div
//                 key={category}
//                 className={`${styles.categoryItem} ${selectedCategory === category ? styles.selectedCategory : ''}`}
//                 onClick={() => handleCategoryClick(category)}
//               >
//                 {category}
                
//               </div>
//             ))}
//           </div>
//         </div>
//         <h2>{selectedCategory ? `${selectedCategory} Recipes` : 'Recent Recipes'}</h2>
//         <div className={styles.recipeSlider}>
//           {filteredRecipes.slice(0, 5).map(recipe => (
//             <div key={recipe.id} className={styles.recipeItem}>
//               <Link to={`/recipe/${recipe.id}`}>
//                 {recipe.title} - {recipe.category}
//               </Link>
//             </div>
//           ))}
//         </div>
//         <Link to="/recipes" className={styles.viewAllLink}>View All Recipes</Link>
//       </div>
//     );
//   };
 
//   export default Dashboard;

import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import Replicate from 'replicate';
import styles from './Dashboard.module.css';

const replicate = new Replicate({
  auth: process.env.REACT_APP_REPLICATE_API_TOKEN,
});

const GET_RECIPES = gql`
  query GetRecipes {
    getRecipes {
      id
      title
      category
    }
  }
`;

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_RECIPES, {
    fetchPolicy: 'network-only',
  });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [randomRecipe, setRandomRecipe] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const recipes = data.getRecipes;
  const categories = [...new Set(recipes.map((recipe) => recipe.category))];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAllRecipesClick = () => {
    setSelectedCategory('');
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleAskLLaMA = async () => {
    try {
      const input = {
        prompt: query,
        max_tokens: 1024,
      };

      const output = await replicate.run('meta/meta-llama-3.1-405b-instruct', { input });
      setResponse(output.join(''));
    } catch (error) {
      console.error('Error querying LLaMA:', error);
    }
  };

  const handleRandomRecipe = async () => {
    try {
      const input = {
        prompt: 'Give me a random recipe',
        max_tokens: 1024,
      };

      const output = await replicate.run('meta/meta-llama-3.1-405b-instruct', { input });
      setRandomRecipe(output.join(''));
    } catch (error) {
      console.error('Error querying LLaMA:', error);
    }
  };

  const filteredRecipes = selectedCategory
    ? recipes.filter((recipe) => recipe.category === selectedCategory)
    : recipes;

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardHeader}>Recipe Dashboard</h1>
      <div className={styles.summary}>
        <p>Total Recipes: {recipes.length}</p>

        <div className={styles.categorySlider}>
          <button
            className={styles.categoryItem}
            onClick={handleAllRecipesClick}
          >
            All Recipes
          </button>
          {categories.map((category) => (
            <div
              key={category}
              className={`${styles.categoryItem} ${
                selectedCategory === category ? styles.selectedCategory : ''
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
      <h2>
        {selectedCategory ? `${selectedCategory} Recipes` : 'Recent Recipes'}
      </h2>
      <div className={styles.recipeSlider}>
        {filteredRecipes.slice(0, 5).map((recipe) => (
          <div key={recipe.id} className={styles.recipeItem}>
            <Link to={`/recipe/${recipe.id}`}>
              {recipe.title} - {recipe.category}
            </Link>
          </div>
        ))}
      </div>
      <Link to="/recipes" className={styles.viewAllLink}>
        View All Recipes
      </Link>

      <div className={styles.chatContainer}>
        <h2>Ask LLaMA About Dishes</h2>
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          className={styles.chatInput}
          placeholder="Ask about a dish..."
        />
        <button onClick={handleAskLLaMA} className={styles.chatButton}>
          Ask LLaMA
        </button>
        <div className={styles.chatResponse}>{response}</div>
      </div>

      <button onClick={handleRandomRecipe} className={styles.randomButton}>
        Get Random Recipe
      </button>
      {randomRecipe && (
        <div className={styles.randomRecipe}>
          <h3>Random Recipe</h3>
          <p>{randomRecipe}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
