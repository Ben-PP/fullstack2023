const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const {
  ApolloServerPluginDrainHttpServer
} = require('@apollo/server/plugin/drainHttpServer')
const express = require('express')
const cors = require('cors')
const http = require('http')
const mongoose = require('mongoose')
const config = require('./utils/config')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const schema = require('./schema/schema')

mongoose.set('strictQuery', false)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema: schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })
  await server.start()
  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET)
          const currentUser = await User.findById(decodedToken.id)
          return { currentUser }
        }
      }
    })
  )
  const PORT = config.PORT

  httpServer.listen({ port: PORT }, () => {
    console.log(`Server ready at http://localhost:${PORT}`)
  })
}
start()
