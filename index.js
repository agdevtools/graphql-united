const { ApolloServer, gql } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest')
const express = require('express')
const path = require('path')
const fetch = require('node-fetch');
const baseURL = `https://go-united.herokuapp.com/api`


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields: 'title' and 'author'.
  type Player {
    player_id: String
    player_name: String
    player_position: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    players: [Player]
  }
`;


const resolvers = {
  Query: {
    players: () => {
      return fetch(`${baseURL}/team`).then(res => res.json())
    }
},
};


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(`🚀 Server ready at port ${process.env.PORT || 4000}`)
});
