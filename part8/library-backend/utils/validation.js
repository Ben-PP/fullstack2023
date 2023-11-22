const validateUser = (user) => {
  if (!user) {
    throw new GraphQLError('not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED'
      }
    })
  }
}

module.exports = {
  validateUser
}
