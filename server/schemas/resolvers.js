const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async () => {
      const user = await User.findOne({  $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
       });

       if (!user) {
        return res.status(400).json({ message: 'Something is wrong!' });
      }
      const token = signToken(user);
      return 
    }
  },

  Mutation: {
    addUser: async (parent, { body }) => {
      return User.create({ body });
    },
    saveBook: async (parent, { user , body }) => {
      return User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      )
    },
    login: async (parent, {}) => {

    },
    removeBook: async () => {
      
    }
  },

};

module.exports = resolvers;