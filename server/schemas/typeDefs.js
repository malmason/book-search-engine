const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String
    bookCount: Int
    savedBooks[String]
  }

  type Book {
    bookId: Int
    authors[String]
    description: String
    title: String
    image: String
    link: String

  }

  type Auth {
    token: String
    user(username): User 
  }

  type Query {
    me(username: username): User 
  }

  type Mutation {

  }
`;

module.exports = typeDefs;