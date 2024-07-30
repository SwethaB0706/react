
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchImages } from '../Recipelist/api'; // Import the fetchImages function
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
  const [images, setImages] = useState({});

  useEffect(() => {
    const fetchImagesForRecipes = async () => {
      if (data) {
        const recipes = data.getRecipes;
        const imagePromises = recipes.map(recipe => fetchImages(recipe.title));
        const imageUrls = await Promise.all(imagePromises);

        const imageMap = recipes.reduce((acc, recipe, index) => {
          acc[recipe.id] = imageUrls[index];
          return acc;
        }, {});

        setImages(imageMap);
      }
    };

    fetchImagesForRecipes();
  }, [data]);

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

      const response = await fetch('http://localhost:5000/api/replicate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          version: 'a16z-infra/llama13b-v2-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5',
          input,
        }),
      });

      const output = await response.json();
      console.log('LLaMA response:', output);

      if (Array.isArray(output)) {
        setResponse(output.join(''));
      } else if (typeof output === 'object' && output !== null) {
        setResponse(JSON.stringify(output, null, 2));
      } else {
        setResponse(String(output));
      }
    } catch (error) {
      console.error('Error querying LLaMA:', error);
      setResponse('An error occurred while querying LLaMA.');
    }
  };

  const handleRandomRecipe = async () => {
    try {
      const input = {
        prompt: 'Give me a random recipe',
        max_tokens: 1024,
      };

      const response = await fetch('http://localhost:5000/api/replicate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          version: 'a16z-infra/llama13b-v2-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5',
          input,
        }),
      });

      const output = await response.json();
      console.log('Random recipe response:', output);

      if (Array.isArray(output)) {
        setRandomRecipe(output.join(''));
      } else if (typeof output === 'object' && output !== null) {
        setRandomRecipe(JSON.stringify(output, null, 2));
      } else {
        setRandomRecipe(String(output));
      }
    } catch (error) {
      console.error('Error querying LLaMA:', error);
      setRandomRecipe('An error occurred while querying LLaMA.');
    }
  };

  const filteredRecipes = selectedCategory
    ? recipes.filter((recipe) => recipe.category === selectedCategory)
    : recipes;

  return (
    <div className={styles.ddashboardContainer}>
      <header className={styles.dheader}>
        <div className={styles.dhero}>
          <h1 className={styles.ddashboardHeader}>Dashboard</h1>
          <p>Total Recipes: {recipes.length}</p>
        </div>
        <div className={styles.dcta}>
          <Link to="/recipes" className={styles.dviewAllLink}>View All Recipes</Link>
          </div>
      </header>

      <main>
        <section className={styles.dsection}>
          <h2>Categories</h2>
          <div className={styles.dcategorySlider}>
            <button
              className={styles.dcategoryItem}
              onClick={handleAllRecipesClick}
            >
              All Recipes
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.dcategoryItem} ${
                  selectedCategory === category ? styles.selectedCategory : ''
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.dsection}>
          <h2>{selectedCategory ? `${selectedCategory} Recipes` : 'Recent Recipes'}</h2>
          <div className={styles.drecipeSlider}>
            {filteredRecipes.slice(0, 5).map((recipe) => (
              <div
                key={recipe.id}
                className={styles.drecipeItem}
                style={{ backgroundImage: `url(${images[recipe.id]})` }}
              >
                <Link to={`/recipe/${recipe.id}`}>
                  {recipe.title} - {recipe.category}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.dsection}>
          <h2>Ask LLaMA About Dishes</h2>
          <div className={styles.dchatContainer}>
            <input
              type="text"
              value={query}
              onChange={handleQueryChange}
              className={styles.dchatInput}
              placeholder="Ask about a dish..."
            />
            <button onClick={handleAskLLaMA} className={styles.dchatButton}>
              Ask LLaMA
            </button>
            <p className={styles.dchatResponse}>{response}</p>
          </div>
        </section>

        {randomRecipe && (
          <section className={styles.dsection}>
            <h2>Random Recipe</h2>
            <div className={styles.randomRecipe}>
              <p>{randomRecipe}</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
