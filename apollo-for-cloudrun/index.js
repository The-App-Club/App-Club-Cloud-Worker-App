const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');

// dummy data
const countries = [
  {
    code: 'IN',
    name: 'India',
  },
  {
    code: 'US',
    name: 'United States',
  },
];

// typeDefs
const typeDefs = gql`
  type Country {
    code: String!
    name: String!
  }
  type Query {
    countries: [Country!]!
  }
`;

// resolvers
const resolvers = {
  Query: {
    countries: () => countries,
  },
};

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });
  const port = process.env.PORT || 4000;
  await new Promise((resolve) => app.listen({ port }, resolve));
  console.log(`Apollo Server 3 listening on port ${port}`);
}

startApolloServer();