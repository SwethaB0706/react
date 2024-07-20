const { ApolloClient, InMemoryCache } = require("@apollo/client");

const graphqlApi = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});

export default graphqlApi;