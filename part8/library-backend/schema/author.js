const Book = require('../models/book')
const Author = require('../models/author')
const { validateUser } = require('../utils/validation')

const typeDefs = `
extend type Query {
  authorCount: Int!
  allAuthors: [Author!]!
}
type Author {
  name: String!
  born: Int
  id: ID!
  bookCount: Int!
}
extend type Mutation {
  editAuthor(
    name: String!
    setBornTo: Int!
  ): Author
}
`

const resolvers = {
  Query: {
    authorCount: async () => await Author.find({}).countDocuments(),
    allAuthors: async () => await Author.find({})
  },
  Mutation: {
    editAuthor: async (root, args, context) => {
      validateUser(context.currentUser)
      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      author.born = args.setBornTo
      author.save()

      return author
    }
  },
  Author: {
    bookCount: async (root) =>
      await Book.find({ author: root.id }).countDocuments()
  }
}

module.exports = {
  typeDefs,
  resolvers
}
