require('xtconf')()
const Path = require('path')
const { ApolloServer } = require('apollo-server-hapi')
const Hapi = require('hapi')
const Manifest = require('./manifest')
const Types = require('./graphql/types')
const Resolvers = require('./graphql/resolvers')
let app

const start = async () => {
  try {
    const server = new ApolloServer({ typeDefs: Types, resolvers: Resolvers })
    app = Hapi.server({
      port: process.env.PORT,
      routes: {
        files: {
          relativeTo: Path.join(__dirname, 'public'),
        },
        cors: {
          origin: ['*'],
          additionalHeaders: ['x-media-server', 'content-type'],
        },
      },
    })
    await app.register(Manifest)
    await server.applyMiddleware({
      app,
    })

    await server.installSubscriptionHandlers(app.listener)

    await app.start()
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
  console.log('🚀 Server running')
}

process.on('SIGINT', async () => {
  console.log('stopping server')
  try {
    await app.stop({ timeout: 10000 })
    console.log('The server has stopped 🛑')
    process.exit(0)
  } catch (err) {
    console.error('shutdown server error', err)
    process.exit(1)
  }
})

start()
