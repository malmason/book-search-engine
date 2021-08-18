const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
           return User.findOne({  $or: [{ _id: user ? user._id : user.id }, { username: user.username }],
       });
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const newUser = await User.create({ username, email, password });
      const token = signToken(newUser);
    },

    // Needs to be finished, look up creating an input type for Graphql ******
    saveBook: async (parent, { username, book }, context) => {
      if (context.user) {
         return User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: book } },
        { new: true, runValidators: true }
        )
      }
    },
    login: async (parent, { username, email, password }) => {
      const user = User.findOne({ $or: [{ username: username}, { email: email }]});
      if(!user) {
        throw new AuthenticationError('No user found!')
      }

      const correctPw = await profile.isCorrectPassword(password);

      if(!correctPw) {
        throw new AuthenticationError('Invalid Password!')
      }

      const token = signToken(user);
      return { token, user };

    },
    removeBook: async (parent, { book }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: book } } },
        { new: true }
        );
      }
    }
  },
};

module.exports = resolvers;