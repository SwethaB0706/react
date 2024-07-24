import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const recipes = data.getRecipes;
  const categories = [...new Set(recipes.map(recipe => recipe.category))];

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardHeader}>Recipe Dashboard</h1>
      <div className={styles.summary}>
        <p>Total Recipes: {recipes.length}</p>
        <div className={styles.categorySlider}>
          {categories.map(category => (
            <div key={category} className={styles.categoryItem}>{category}</div>
          ))}
        </div>
      </div>
      <h2>Recent Recipes</h2>
      <div className={styles.recipeSlider}>
        {recipes.slice(0, 5).map(recipe => (
          <div key={recipe.id} className={styles.recipeItem}>
            <Link to={`/recipe/${recipe.id}`}>
              {recipe.title} - {recipe.category}
            </Link>
          </div>
        ))}
      </div>
      <Link to="/recipes" className={styles.viewAllLink}>View All Recipes</Link>
    </div>
  );
}

export default Dashboard;

// import React from 'react';
// import { useQuery, gql } from '@apollo/client';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';

// const GET_RECIPES = gql`
//   query GetRecipes {
//     getRecipes {
//       id
//       title
//       category
//     }
//   }
// `;

// const DashboardContainer = styled.div`
//   max-width: 800px;
//   margin: 0 auto;
//   padding: 20px;
// `;

// const DashboardHeader = styled.h1`
//   color: #333;
//   text-align: center;
// `;

// const Summary = styled.div`
//   background-color: #f0f0f0;
//   padding: 20px;
//   border-radius: 5px;
//   margin-bottom: 20px;
// `;

// const CategoryList = styled.ul`
//   list-style-type: none;
//   padding: 0;
//   display: flex;
//   justify-content: space-around;
// `;

// const CategoryItem = styled.li`
//   background-color: #4CAF50;
//   color: white;
//   padding: 10px 15px;
//   border-radius: 20px;
// `;

// const RecipeList = styled.ul`
//   list-style-type: none;
//   padding: 0;
// `;

// const RecipeItem = styled.li`
//   background-color: #fff;
//   border: 1px solid #ddd;
//   padding: 10px;
//   margin-bottom: 10px;
//   border-radius: 5px;
// `;

// const Dashboard = () => {
//   const { loading, error, data } = useQuery(GET_RECIPES, {
//     fetchPolicy: 'network-only', // Ensure it always fetches from the server
//   });
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const recipes = data.getRecipes;
//   const categories = [...new Set(recipes.map(recipe => recipe.category))];

//   return (
//     <DashboardContainer>
//       <DashboardHeader>Recipe Dashboard</DashboardHeader>
//       <Summary>
//         <p>Total Recipes: {recipes.length}</p>
//         <CategoryList>
//           {categories.map(category => (
//             <CategoryItem key={category}>{category}</CategoryItem>
//           ))}
//         </CategoryList>
//       </Summary>
//       <h2>Recent Recipes</h2>
//       <RecipeList>
//         {recipes.slice(0, 5).map(recipe => (
//           <RecipeItem key={recipe.id}>
//             <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link> - {recipe.category}
//           </RecipeItem>
//         ))}
//       </RecipeList>
//       <Link to="/recipes">View All Recipes</Link>
//       {/* <button onClick={() => refetch()}>Refresh Recipes</button> */}
//     </DashboardContainer>
//   );
// }

// export default Dashboard;