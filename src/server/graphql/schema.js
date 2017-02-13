import { graphql } from 'graphql'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import Collection from './collection'

const RootQuery = `
  type RootQuery {
    collections: [Collection]
  }
`
// Fill this in with the schema string
// const schemaString = `...`

// Make a GraphQL schema with no resolvers
// const schema = makeExecutableSchema({ typeDefs: schemaString });

// Add mocks, modifies schema in place
// addMockFunctionsToSchema({ schema });

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`
export default makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, Collection],
  resolvers: {},
  logger: { log: (e) => console.log(e) }, // optional
})
