const { makeExecutableSchema } = require('@graphql-tools/schema')
const { merge } = require('lodash')
const { typeDefs: bookTypeDefs, resolvers: bookResolvers } = require('./book')
const {
  typeDefs: authorTypeDefs,
  resolvers: authorResolvers
} = require('./author')
const { typeDefs: userTypeDefs, resolvers: userResolvers } = require('./user')

const Query = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`

const resolvers = {}

const schema = makeExecutableSchema({
  typeDefs: [Query, bookTypeDefs, authorTypeDefs, userTypeDefs],
  resolvers: merge(resolvers, bookResolvers, authorResolvers, userResolvers)
})

module.exports = schema
