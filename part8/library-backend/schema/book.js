const { PubSub } = require('graphql-subscriptions')
const Book = require('../models/book')
const Author = require('../models/author')
const { GraphQLError } = require('graphql')
const { validateUser } = require('../utils/validation')

const pubsub = new PubSub()
const typeDefs = `
  extend type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
  }
  extend type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
  }
  extend type Subscription {
    bookAdded: Book!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
`

const resolvers = {
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  },
  Query: {
    bookCount: async () => await Book.find({}).countDocuments(),
    allBooks: async (root, args) => {
      const query = {}
      if (args.author)
        query.author = await Author.findOne({ name: args.author }).select('_id')
      if (args.genre) query.genres = args.genre
      return await Book.find(query).populate('author')
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      validateUser(context.currentUser)
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      }
      const book = new Book({ ...args, author: author })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    }
  },
  Book: {
    author: async (root) => await Author.findById(root.author)
  }
}

module.exports = {
  typeDefs,
  resolvers
}
