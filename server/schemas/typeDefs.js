const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String
    password: String
    bookCount: Int
    savedBooks[String]
  }

  type Auth {
    token: ID!
    profile: Profile
  }
  
  type Query {
    me(username: username): User 
  }

  type Book {
    bookId: String
    authors[String]
    description: String
    title: String
    image: String
    link: String
  }

  type Mutation {
    login(username: String, email: String!, password: String!): Auth
    addUser(username: String!,email: String!, password: String!): Auth
    saveBook(username: String!, savedBooks: String!): User
    removeBook(savedBooks: String!): User
  }
`;

module.exports = typeDefs;