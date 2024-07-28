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


// import React, { useState } from 'react';
// import { useQuery, gql } from '@apollo/client';
// import { Link } from 'react-router-dom';
// import Replicate from 'replicate';
// import styles from './Dashboard.module.css';

// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN,
// });

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
//   const [query, setQuery] = useState('');
//   const [response, setResponse] = useState('');
//   const [randomRecipe, setRandomRecipe] = useState('');

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const recipes = data.getRecipes;
//   const categories = [...new Set(recipes.map((recipe) => recipe.category))];

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//   };

//   const handleAllRecipesClick = () => {
//     setSelectedCategory('');
//   };

//   const handleQueryChange = (e) => {
//     setQuery(e.target.value);
//   };

//   const handleAskLLaMA = async () => {
//     try {
//       const input = {
//         prompt: query,
//         max_tokens: 1024,
//       };

//       const output = await replicate.run('a16z-infra/llama13b-v2-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5', { input });
//       setResponse(output.join(''));
//     } catch (error) {
//       console.error('Error querying LLaMA:', error);
//     }
//   };

//   const handleRandomRecipe = async () => {
//     try {
//       const input = {
//         prompt: 'Give me a random recipe',
//         max_tokens: 1024,
//       };

//       const output = await replicate.run('a16z-infra/llama13b-v2-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5', { input });
//       setRandomRecipe(output.join(''));
//     } catch (error) {
//       console.error('Error querying LLaMA:', error);
//     }
//   };

//   const filteredRecipes = selectedCategory
//     ? recipes.filter((recipe) => recipe.category === selectedCategory)
//     : recipes;

//   return (
//     <div className={styles.dashboardContainer}>
//       <h1 className={styles.dashboardHeader}>Recipe Dashboard</h1>
//       <div className={styles.summary}>
//         <p>Total Recipes: {recipes.length}</p>

//         <div className={styles.categorySlider}>
//           <button
//             className={styles.categoryItem}
//             onClick={handleAllRecipesClick}
//           >
//             All Recipes
//           </button>
//           {categories.map((category) => (
//             <div
//               key={category}
//               className={`${styles.categoryItem} ${
//                 selectedCategory === category ? styles.selectedCategory : ''
//               }`}
//               onClick={() => handleCategoryClick(category)}
//             >
//               {category}
//             </div>
//           ))}
//         </div>
//       </div>
//       <h2>
//         {selectedCategory ? `${selectedCategory} Recipes` : 'Recent Recipes'}
//       </h2>
//       <div className={styles.recipeSlider}>
//         {filteredRecipes.slice(0, 5).map((recipe) => (
//           <div key={recipe.id} className={styles.recipeItem}>
//             <Link to={`/recipe/${recipe.id}`}>
//               {recipe.title} - {recipe.category}
//             </Link>
//           </div>
//         ))}
//       </div>
//       <Link to="/recipes" className={styles.viewAllLink}>
//         View All Recipes
//       </Link>

//       <div className={styles.chatContainer}>
//         <h2>Ask LLaMA About Dishes</h2>
//         <input
//           type="text"
//           value={query}
//           onChange={handleQueryChange}
//           className={styles.chatInput}
//           placeholder="Ask about a dish..."
//         />
//         <button onClick={handleAskLLaMA} className={styles.chatButton}>
//           Ask LLaMA
//         </button>
//         <p className={styles.chatResponse}>{response}</p>
//       </div>

//       <button onClick={handleRandomRecipe} className={styles.randomButton}>
//         Get Random Recipe
//       </button>
//       {randomRecipe && (
//         <div className={styles.randomRecipe}>
//           <h3>Random Recipe</h3>
//           <p>{randomRecipe}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useState } from 'react';
// import { useQuery, gql } from '@apollo/client';
// import { Link } from 'react-router-dom';
// import Replicate from 'replicate';
// import styles from './Dashboard.module.css';

// const replicate = new Replicate({
//   auth: process.env.REACT_APP_REPLICATE_API_TOKEN,
// });

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
//   const [query, setQuery] = useState('');
//   const [response, setResponse] = useState('');
//   const [randomRecipe, setRandomRecipe] = useState('');

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const recipes = data.getRecipes;
//   const categories = [...new Set(recipes.map((recipe) => recipe.category))];

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//   };

//   const handleAllRecipesClick = () => {
//     setSelectedCategory('');
//   };

//   const handleQueryChange = (e) => {
//     setQuery(e.target.value);
//   };

//   const handleAskLLaMA = async () => {
//     try {
//       const input = {
//         prompt: query,
//         max_tokens: 1024,
//       };

//       const output = await replicate.run('a16z-infra/llama13b-v2-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5', { input });
//       setResponse(output.join(''));
//     } catch (error) {
//       console.error('Error querying LLaMA:', error);
//     }
//   };

//   const handleRandomRecipe = async () => {
//     try {
//       const input = {
//         prompt: 'Give me a random recipe',
//         max_tokens: 1024,
//       };

//       const output = await replicate.run('a16z-infra/llama13b-v2-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5', { input });
//       setRandomRecipe(output.join(''));
//     } catch (error) {
//       console.error('Error querying LLaMA:', error);
//     }
//   };

//   const filteredRecipes = selectedCategory
//     ? recipes.filter((recipe) => recipe.category === selectedCategory)
//     : recipes;

//   return (
//     <div className={styles.dashboardContainer}>
//       <header className={styles.header}>
//         <div className={styles.hero}>
//           <h1 className={styles.dashboardHeader}>Recipe Dashboard</h1>
//           <p>Total Recipes: {recipes.length}</p>
//         </div>
//         <div className={styles.cta}>
//           <Link to="/recipes" className={styles.viewAllLink}>View All Recipes</Link>
//           <button onClick={handleRandomRecipe} className={styles.randomButton}>Get Random Recipe</button>
//         </div>
//       </header>

//       <main>
//         <section className={styles.section}>
//           <h2>Categories</h2>
//           <div className={styles.categorySlider}>
//             <button
//               className={styles.categoryItem}
//               onClick={handleAllRecipesClick}
//             >
//               All Recipes
//             </button>
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 className={`${styles.categoryItem} ${
//                   selectedCategory === category ? styles.selectedCategory : ''
//                 }`}
//                 onClick={() => handleCategoryClick(category)}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </section>

//         <section className={styles.section}>
//           <h2>{selectedCategory ? `${selectedCategory} Recipes` : 'Recent Recipes'}</h2>
//           <div className={styles.recipeSlider}>
//             {filteredRecipes.slice(0, 5).map((recipe) => (
//               <div key={recipe.id} className={styles.recipeItem}>
//                 <Link to={`/recipe/${recipe.id}`}>
//                   {recipe.title} - {recipe.category}
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section className={styles.section}>
//           <h2>Ask LLaMA About Dishes</h2>
//           <div className={styles.chatContainer}>
//             <input
//               type="text"
//               value={query}
//               onChange={handleQueryChange}
//               className={styles.chatInput}
//               placeholder="Ask about a dish..."
//             />
//             <button onClick={handleAskLLaMA} className={styles.chatButton}>
//               Ask LLaMA
//             </button>
//             <p className={styles.chatResponse}>{response}</p>
//           </div>
//         </section>

//         {randomRecipe && (
//           <section className={styles.section}>
//             <h2>Random Recipe</h2>
//             <div className={styles.randomRecipe}>
//               <p>{randomRecipe}</p>
//             </div>
//           </section>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
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
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className={styles.hero}>
          <h1 className={styles.dashboardHeader}>Recipe Dashboard</h1>
          <p>Total Recipes: {recipes.length}</p>
        </div>
        <div className={styles.cta}>
          <Link to="/recipes" className={styles.viewAllLink}>View All Recipes</Link>
          <button onClick={handleRandomRecipe} className={styles.randomButton}>Get Random Recipe</button>
        </div>
      </header>

      <main>
        <section className={styles.section}>
          <h2>Categories</h2>
          <div className={styles.categorySlider}>
            <button
              className={styles.categoryItem}
              onClick={handleAllRecipesClick}
            >
              All Recipes
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryItem} ${
                  selectedCategory === category ? styles.selectedCategory : ''
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>{selectedCategory ? `${selectedCategory} Recipes` : 'Recent Recipes'}</h2>
          <div className={styles.recipeSlider}>
            {filteredRecipes.slice(0, 5).map((recipe) => (
              <div key={recipe.id} className={styles.recipeItem}>
                <Link to={`/recipe/${recipe.id}`}>
                  {recipe.title} - {recipe.category}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>Ask LLaMA About Dishes</h2>
          <div className={styles.chatContainer}>
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
            <p className={styles.chatResponse}>{response}</p>
          </div>
        </section>

        {randomRecipe && (
          <section className={styles.section}>
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
