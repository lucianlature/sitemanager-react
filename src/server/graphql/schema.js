import { graphql } from 'graphql'
import { makeExecutableSchema, addMockFunctionsToSchema, mockServer, MockList } from 'graphql-tools'
import casual from 'casual-browserify'

import Collection from './collection'

const RootQuery = `
  type RootQuery {
    collections: [Collection]
  }
`
const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`
// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ 
  typeDefs: [SchemaDefinition, RootQuery, Collection],
  resolvers: {},
})

// Mock functions are defined per type and return an
// object with some or all of the fields of that type.
// If a field on the object is a function, that function
// will be used to resolve the field if the query requests it.
let counter = 0;
const mocks = {
  RootQuery: () => ({
    collections: () => new MockList(12),
  }),
  String: () => 'collection ' + (counter ++),
  Collection: () => ({
    id: () => casual.integer(0,120),
    slug: casual.title.split(' ').join('-'),
    title: casual.title,
  }),
}

// Add mocks, modifies schema in place
addMockFunctionsToSchema({
  schema,
  mocks,
});

export default schema