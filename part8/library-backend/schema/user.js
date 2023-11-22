const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
const config = require('../utils/config')

const typeDefs = `
  extend type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
      password: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  extend type Query {
    me: User
  }

  type Token {
    value: String!
  }

  type User {
    username: String!
    favoriteGenre: String!
    passwordHash: String!
    id: ID!
  }
`

const resolvers = {
  Query: {
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    createUser: async (root, args) => {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(args.password, saltRounds)
      const user = new User({
        username: args.username,
        passwordHash,
        favoriteGenre: args.favoriteGenre
      })

      try {
        await user.save()
      } catch (error) {
        throw new GraphQLError('Saving user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      const passwordCorrect =
        user === null
          ? false
          : await bcrypt.compare(args.password, user.passwordHash)

      if (!(user && passwordCorrect))
        throw new GraphQLError('Invalid username or password')

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}
