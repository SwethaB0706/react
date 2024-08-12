import React, { useState, useEffect, useRef } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { fetchImages } from "../Recipelist/api";
import styles from "./Dashboard.module.css";
import { useSpring, animated, to } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';

const GET_RECIPES = gql`
  query GetRecipes {
    getRecipes {
      id
      title
      category
    }
  }
`;

const genAI = new GoogleGenerativeAI("AIzaSyBpCA_ii8eJH2lpgJLCJhkmTuvQ4Xz6aFw");

const calcX = (y, ly) => -(y - ly - window.innerHeight / 2) / 20;
const calcY = (x, lx) => (x - lx - window.innerWidth / 2) / 20;

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_RECIPES, {
    fetchPolicy: "network-only",
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [images, setImages] = useState({});

  useEffect(() => {
    const fetchImagesForRecipes = async () => {
      if (data) {
        const recipes = data.getRecipes;
        const imagePromises = recipes.map((recipe) =>
          fetchImages(recipe.title)
        );
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

  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    document.addEventListener('gesturestart', preventDefault);
    document.addEventListener('gesturechange', preventDefault);

    return () => {
      document.removeEventListener('gesturestart', preventDefault);
      document.removeEventListener('gesturechange', preventDefault);
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const recipes = data.getRecipes;
  const categories = [...new Set(recipes.map((recipe) => recipe.category))];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAllRecipesClick = () => {
    setSelectedCategory("");
  };

  const askGemini = async (prompt) => {
    const enhancedPrompt = `${prompt} (NOTE: only reply to this if it's a food-related query, else return "Please ask a food-related query." Format your response with "Ingredients:", "Instructions:", and "Tips:" as separate lines, and use "*" for list items.)`;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(enhancedPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error querying Gemini:", error);
      return "An error occurred while querying Gemini.";
    }
  };

  const handleAskGemini = async () => {
    const response = await askGemini(query);
    setResponse(response);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const formatResponse = (text) => {
    const sections = text.split("\n\n");
    return sections.map((section, index) => {
      const lines = section.split("\n");
      const title = lines[0];
      const content = lines.slice(1);

      return (
        <div key={index} className={styles.responseSection}>
          <h3 className={styles.responseTitle}>{title}</h3>
          <ul className={styles.responseList}>
            {content.map((item, i) => (
              <li key={i} className={styles.responseItem}>
                {item.replace("* ", "")}
              </li>
            ))}
          </ul>
        </div>
      );
    });
  };

  const AnimatedRecipeCard = ({ recipe }) => {
    const domTarget = useRef(null);
    const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(() => ({
      rotateX: 10,
      rotateY: 20,
      rotateZ: 0,
      scale: 1,
      zoom: 0,
      x: 0,
      y: 0,
      config: { mass: 5, tension: 250, friction: 30 },
    }));

    useGesture(
      {
        onDrag: ({ active, offset: [x, y] }) =>
          api({ x, y, rotateX: 0, rotateY: 0, scale: active ? 1 : 1.1 }),
        onPinch: ({ offset: [d, a] }) => api({ zoom: d / 200, rotateZ: a }),
        onMove: ({ xy: [px, py], dragging }) =>
          !dragging &&
          api({
            rotateX: calcX(py, y.get()),
            rotateY: calcY(px, x.get()),
            scale: 1.1,
          }),
        onHover: ({ hovering }) =>
          !hovering && api({ rotateX: 10, rotateY: 20, scale: 1 }),
      },
      { target: domTarget, eventOptions: { passive: false } }
    )

    return (
      <animated.div
        ref={domTarget}
        className={styles.drecipeItem}
        style={{
          backgroundImage: `url(${images[recipe.id]})`,
          transform: 'perspective(600px)',
          x,
          y,
          scale: to([scale, zoom], (s, z) => s + z),
          rotateX,
          rotateY,
          rotateZ,
        }}
      >
        <Link to={`/recipe/${recipe.id}`}>
          {recipe.title} - {recipe.category}
        </Link>
      </animated.div>
    );
  };

  const filteredRecipes = selectedCategory
    ? recipes.filter((recipe) => recipe.category === selectedCategory)
    : recipes;

  return (
    <div className={styles.ddashboardContainer}>
      <header className={styles.dheader}>
        <div className={styles.dhero}>
          <h1 className={styles.ddashboardHeader}>HOME</h1>
          <p>Total Recipes: {recipes.length}</p>
        </div>
        <div className={styles.dcta}>
          <Link to="/recipes" className={styles.dviewAllLink}>
            View All Recipes
          </Link>
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
                  selectedCategory === category ? styles.selectedCategory : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.dsection}>
          <h2>
            {selectedCategory
              ? `${selectedCategory} Recipes`
              : "Recent Recipes"}
          </h2>
          <div className={styles.drecipeSlider}>
            {filteredRecipes.slice(0, 5).map((recipe) => (
              <AnimatedRecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>

        <section className={styles.dsection}>
          <h2>Salt AI</h2>
          <div className={styles.dchatContainer}>
            <input
              type="text"
              value={query}
              onChange={handleQueryChange}
              className={styles.dchatInput}
              placeholder="What do you want to make today?"
            />
            <button onClick={handleAskGemini} className={styles.dchatButton}>
              Ask Gemini
            </button>
            <div className={styles.dchatResponse}>
              {response && formatResponse(response)}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;