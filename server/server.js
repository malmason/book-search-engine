const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

// Setup to use apollo server on the back-end.
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');


let server;
async function startApolloServer() {
  server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  playground: true
})

  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer()


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);
// added for Graphql, will comment out app.use(routes) above once functionality has
// been tested. 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});
