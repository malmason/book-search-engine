const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
           return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user}
    },

    // Needs to be finished, look up creating an input type for Graphql ******
    saveBook: async (parent, { bookData }  , context) => {
      if (context.user) {
         const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $push: { savedBooks: bookData } },
        { new: true }
        )

        return updatedUser;
      }
    },
    login: async (parent, { email, password }) => {
      const user = User.findOne({ email });
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
    removeBook: async (parent, args , context) => {
      if (context.user) {
        const updatedUser= await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
        );

        return updatedUser;
      }
      throw new AuthenticationError('Unable to delete book!');

    }
  },
};

module.exports = resolvers;