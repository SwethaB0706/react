// // import React, { useState, useEffect } from 'react';
// // import { useMutation, useQuery, gql } from '@apollo/client';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import styled from 'styled-components';

// // const GET_RECIPES = gql`
// //   query GetRecipes {
// //     getRecipes {
// //       id
// //       title
// //       ingredients
// //       instructions
// //       category
// //       date
// //       userId
// //     }
// //   }
// // `;

// // const ADD_RECIPE = gql`
// //   mutation AddRecipe($title: String!, $ingredients: [String!]!, $instructions: [String!]!, $category: String!, $date: String!) {
// //     addRecipe(title: $title, ingredients: $ingredients, instructions: $instructions, category: $category, date: $date) {
// //       id
// //       title
// //       ingredients
// //       instructions
// //       category
// //       date
// //       userId
// //     }
// //   }
// // `;

// // const UPDATE_RECIPE = gql`
// //   mutation UpdateRecipe($id: ID!, $title: String!, $ingredients: [String!]!, $instructions: [String!]!, $category: String!, $date: String!) {
// //     updateRecipe(id: $id, title: $title, ingredients: $ingredients, instructions: $instructions, category: $category, date: $date) {
// //       id
// //       title
// //       ingredients
// //       instructions
// //       category
// //       date
// //       userId
// //     }
// //   }
// // `;

// // const GET_RECIPE = gql`
// //   query GetRecipe($id: ID!) {
// //     getRecipe(id: $id) {
// //       id
// //       title
// //       ingredients
// //       instructions
// //       category
// //       date
// //     }
// //   }
// // `;

// // const FormContainer = styled.div`
// //   max-width: 600px;
// //   margin: 0 auto;
// //   padding: 20px;
// // `;

// // const Form = styled.form`
// //   display: flex;
// //   flex-direction: column;
// // `;

// // const Input = styled.input`
// //   margin-bottom: 10px;
// //   padding: 10px;
// //   border: 1px solid #ddd;
// //   border-radius: 5px;
// // `;

// // const TextArea = styled.textarea`
// //   margin-bottom: 10px;
// //   padding: 10px;
// //   border: 1px solid #ddd;
// //   border-radius: 5px;
// //   height: 100px;
// // `;

// // const Button = styled.button`
// //   padding: 10px;
// //   background-color: #4CAF50;
// //   color: white;
// //   border: none;
// //   border-radius: 5px;
// //   cursor: pointer;
// // `;

// // const RecipeForm = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const [title, setTitle] = useState('');
// //   const [ingredients, setIngredients] = useState('');
// //   const [instructions, setInstructions] = useState('');
// //   const [category, setCategory] = useState('');
// //   const [date, setDate] = useState('');

// //   const { loading: queryLoading, error: queryError, data } = useQuery(GET_RECIPE, {
// //     fetchPolicy: 'network-only',
// //     variables: { id },
// //     skip: !id,
// //   });

// //   const [addRecipe] = useMutation(ADD_RECIPE, {
// //     update(cache, { data: { addRecipe } }) {
// //       const { getRecipes }  = cache.readQuery({ query: GET_RECIPES });
// //       if ({ getRecipes }) {
// //         cache.writeQuery({
// //           query: GET_RECIPES,
// //           data: { getRecipes: [...getRecipes, addRecipe] },
// //         });
// //       } else {
// //         cache.writeQuery({
// //           query: GET_RECIPES,
// //           data: { getRecipes: [addRecipe] },
// //         });
// //       }
// //     },
// //     onCompleted: () => navigate('/recipes'),
// //   });

// //   const [updateRecipe] = useMutation(UPDATE_RECIPE, {
// //     update(cache, { data: { updateRecipe } }) {
// //       const { getRecipes }  = cache.readQuery({ query: GET_RECIPES });
// //       if ({ getRecipes }) {
// //         const newRecipes = { getRecipes }.getRecipes.map(recipe =>
// //           recipe.id === updateRecipe.id ? updateRecipe : recipe
// //         );
// //         cache.writeQuery({
// //           query: GET_RECIPES,
// //           data: { getRecipes: newRecipes },
// //         });
// //       }
// //     },
// //     onCompleted: () => navigate('/recipes'),
// //   });

// //   useEffect(() => {
// //     if (data && data.getRecipe) {
// //       const { title, ingredients, instructions, category, date } = data.getRecipe;
// //       setTitle(title);
// //       setIngredients(ingredients.join('\n'));
// //       setInstructions(instructions.join('\n'));
// //       setCategory(category);
// //       setDate(date);
// //     }
// //   }, [data]);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const recipeData = {
// //       title,
// //       ingredients: ingredients.split('\n'),
// //       instructions: instructions.split('\n'),
// //       category,
// //       date,
// //     };

// //     if (id) {
// //       updateRecipe({ variables: { id, ...recipeData } });
// //     } else {
// //       addRecipe({ variables: recipeData });
// //     }
// //   };

// //   if (queryLoading) return <p>Loading...</p>;
// //   if (queryError) return <p>Error: {queryError.message}</p>;

// //   return (
// //     <FormContainer>
// //       <h2>{id ? 'Edit Recipe' : 'Add New Recipe'}</h2>
// //       <Form onSubmit={handleSubmit}>
// //         <Input
// //           type="text"
// //           placeholder="Title"
// //           value={title}
// //           onChange={(e) => setTitle(e.target.value)}
// //           required
// //         />
// //         <TextArea
// //           placeholder="Ingredients (one per line)"
// //           value={ingredients}
// //           onChange={(e) => setIngredients(e.target.value)}
// //           required
// //         />
// //         <TextArea
// //           placeholder="Instructions (one step per line)"
// //           value={instructions}
// //           onChange={(e) => setInstructions(e.target.value)}
// //           required
// //         />
// //         <Input
// //           type="text"
// //           placeholder="Category"
// //           value={category}
// //           onChange={(e) => setCategory(e.target.value)}
// //           required
// //         />
// //         <Input
// //           type="date"
// //           value={date}
// //           onChange={(e) => setDate(e.target.value)}
// //           required
// //         />
// //         <Button type="submit">{id ? 'Update Recipe' : 'Add Recipe'}</Button>
// //       </Form>
// //     </FormContainer>
// //   );
// // };

// // export default RecipeForm;

// import React, { useState, useEffect } from 'react';
// import { useMutation, useQuery, gql } from '@apollo/client';
// import { useParams, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';

// const GET_RECIPES = gql`
//   query GetRecipes {
//     getRecipes {
//       id
//       title
//       ingredients
//       instructions
//       category
//       date
//       userId
//     }
//   }
// `;

// const ADD_RECIPE = gql`
//   mutation AddRecipe($title: String!, $ingredients: [String!]!, $instructions: [String!]!, $category: String!, $date: String!) {
//     addRecipe(title: $title, ingredients: $ingredients, instructions: $instructions, category: $category, date: $date) {
//       id
//       title
//       ingredients
//       instructions
//       category
//       date
//       userId
//     }
//   }
// `;

// const UPDATE_RECIPE = gql`
//   mutation UpdateRecipe($id: ID!, $title: String!, $ingredients: [String!]!, $instructions: [String!]!, $category: String!, $date: String!) {
//     updateRecipe(id: $id, title: $title, ingredients: $ingredients, instructions: $instructions, category: $category, date: $date) {
//       id
//       title
//       ingredients
//       instructions
//       category
//       date
//       userId
//     }
//   }
// `;

// const GET_RECIPE = gql`
//   query GetRecipe($id: ID!) {
//     getRecipe(id: $id) {
//       id
//       title
//       ingredients
//       instructions
//       category
//       date
//     }
//   }
// `;

// const FormContainer = styled.div`
//   max-width: 600px;
//   margin: 0 auto;
//   padding: 20px;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const Input = styled.input`
//   margin-bottom: 10px;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
// `;

// const TextArea = styled.textarea`
//   margin-bottom: 10px;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   height: 100px;
// `;

// const Select = styled.select`
//   margin-bottom: 10px;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
// `;

// const Button = styled.button`
//   padding: 10px;
//   background-color: #4CAF50;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
// `;

// const RecipeForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [title, setTitle] = useState('');
//   const [ingredients, setIngredients] = useState('');
//   const [instructions, setInstructions] = useState('');
//   const [category, setCategory] = useState('');
//   const [date, setDate] = useState('');

//   const { loading: queryLoading, error: queryError, data } = useQuery(GET_RECIPE, {
//     fetchPolicy: 'network-only',
//     variables: { id },
//     skip: !id,
//   });

//   const [addRecipe] = useMutation(ADD_RECIPE, {
//     update(cache, { data: { addRecipe } }) {
//       const existingRecipes = cache.readQuery({ query: GET_RECIPES });
//       if (existingRecipes) {
//         cache.writeQuery({
//           query: GET_RECIPES,
//           data: { getRecipes: [...existingRecipes.getRecipes, addRecipe] },
//         });
//       } else {
//         cache.writeQuery({
//           query: GET_RECIPES,
//           data: { getRecipes: [addRecipe] },
//         });
//       }
//     },
//     onCompleted: () => {
//       navigate('/recipes');
//       window.location.reload();
//     },
   
//   });

//   const [updateRecipe] = useMutation(UPDATE_RECIPE, {
//     update(cache, { data: { updateRecipe } }) {
//       const existingRecipes = cache.readQuery({ query: GET_RECIPES });
//       if (existingRecipes) {
//         const newRecipes = existingRecipes.getRecipes.map(recipe =>
//           recipe.id === updateRecipe.id ? updateRecipe : recipe
//         );
//         cache.writeQuery({
//           query: GET_RECIPES,
//           data: { getRecipes: newRecipes },
//         });
//       }
//     },
//     onCompleted: () => navigate('/recipes'),
//   });

//   useEffect(() => {
//     if (data && data.getRecipe) {
//       const { title, ingredients, instructions, category, date } = data.getRecipe;
//       setTitle(title);
//       setIngredients(ingredients.join('\n'));
//       setInstructions(instructions.join('\n'));
//       setCategory(category);
//       setDate(date);
//     }
//   }, [data]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const recipeData = {
//       title,
//       ingredients: ingredients.split('\n'),
//       instructions: instructions.split('\n'),
//       category,
//       date,
//     };

//     if (id) {
//       updateRecipe({ variables: { id, ...recipeData } });
//     } else {
//       addRecipe({ variables: recipeData });
//     }
//   };

//   if (queryLoading) return <p>Loading...</p>;
//   if (queryError) return <p>Error: {queryError.message}</p>;

//   return (
//     <FormContainer>
//       <h2>{id ? 'Edit Recipe' : 'Add New Recipe'}</h2>
//       <Form onSubmit={handleSubmit}>
//         <Input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <TextArea
//           placeholder="Ingredients (one per line)"
//           value={ingredients}
//           onChange={(e) => setIngredients(e.target.value)}
//           required
//         />
//         <TextArea
//           placeholder="Instructions (one step per line)"
//           value={instructions}
//           onChange={(e) => setInstructions(e.target.value)}
//           required
//         />
//         <Select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           required
//         >
//           <option value="">Select Category</option>
//           <option value="Breakfast">Breakfast</option>
//           <option value="Lunch">Lunch</option>
//           <option value="Dinner">Dinner</option>
//           <option value="Snacks">Snacks</option>
//           <option value="Brunch">Brunch</option>
//         </Select>
//         <Input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           required
//         />
//         <Button type="submit">{id ? 'Update Recipe' : 'Add Recipe'}</Button>
//       </Form>
//     </FormContainer>
//   );
// };

// export default RecipeForm;

import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeForm.css';

const GET_RECIPES = gql`
  query GetRecipes {
    getRecipes {
      id
      title
      ingredients
      instructions
      category
      date
      userId
    }
  }
`;

const ADD_RECIPE = gql`
  mutation AddRecipe($title: String!, $ingredients: [String!]!, $instructions: [String!]!, $category: String!, $date: String!) {
    addRecipe(title: $title, ingredients: $ingredients, instructions: $instructions, category: $category, date: $date) {
      id
      title
      ingredients
      instructions
      category
      date
      userId
    }
  }
`;

const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($id: ID!, $title: String!, $ingredients: [String!]!, $instructions: [String!]!, $category: String!, $date: String!) {
    updateRecipe(id: $id, title: $title, ingredients: $ingredients, instructions: $instructions, category: $category, date: $date) {
      id
      title
      ingredients
      instructions
      category
      date
      userId
    }
  }
`;

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

const RecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const { loading: queryLoading, error: queryError, data } = useQuery(GET_RECIPE, {
    fetchPolicy: 'network-only',
    variables: { id },
    skip: !id,
  });

  const [addRecipe] = useMutation(ADD_RECIPE, {
    update(cache, { data: { addRecipe } }) {
      const existingRecipes = cache.readQuery({ query: GET_RECIPES });
      if (existingRecipes) {
        cache.writeQuery({
          query: GET_RECIPES,
          data: { getRecipes: [...existingRecipes.getRecipes, addRecipe] },
        });
      } else {
        cache.writeQuery({
          query: GET_RECIPES,
          data: { getRecipes: [addRecipe] },
        });
      }
    },
    onCompleted: () => {
      navigate('/recipes');
      window.location.reload();
    },
  });

  const [updateRecipe] = useMutation(UPDATE_RECIPE, {
    update(cache, { data: { updateRecipe } }) {
      const existingRecipes = cache.readQuery({ query: GET_RECIPES });
      if (existingRecipes) {
        const newRecipes = existingRecipes.getRecipes.map(recipe =>
          recipe.id === updateRecipe.id ? updateRecipe : recipe
        );
        cache.writeQuery({
          query: GET_RECIPES,
          data: { getRecipes: newRecipes },
        });
      }
    },
    onCompleted: () => navigate('/recipes'),
  });

  useEffect(() => {
    if (data && data.getRecipe) {
      const { title, ingredients, instructions, category, date } = data.getRecipe;
      setTitle(title);
      setIngredients(ingredients.join('\n'));
      setInstructions(instructions.join('\n'));
      setCategory(category);
      setDate(date);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipeData = {
      title,
      ingredients: ingredients.split('\n'),
      instructions: instructions.split('\n'),
      category,
      date,
    };

    if (id) {
      updateRecipe({ variables: { id, ...recipeData } });
    } else {
      addRecipe({ variables: recipeData });
    }
  };

  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error: {queryError.message}</p>;

  return (
    <div className="lform-container">
      <h2>{id ? 'Edit Recipe' : 'Add New Recipe'}</h2>
      <form className="lform" onSubmit={handleSubmit}>
        <input
          type="text"
          className="linput"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="ltextarea"
          placeholder="Ingredients (one per line)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
        <textarea
          className="ltextarea"
          placeholder="Instructions (one step per line)"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />
        <select
          className="lselect"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snacks">Snacks</option>
          <option value="Brunch">Brunch</option>
        </select>
        <input
          type="date"
          className="linput"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit" className="lbutton">{id ? 'Update Recipe' : 'Add Recipe'}</button>
      </form>
    </div>
  );
};

export default RecipeForm;

