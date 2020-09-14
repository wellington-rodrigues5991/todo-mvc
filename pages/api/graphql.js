import { ApolloServer, gql } from 'apollo-server-micro';
import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://test:minhasenhaforte@todomvc.gsrw3.mongodb.net/test?retryWrites=true&w=majority', {
  useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false
})

const data = require('../../src/Mongo/Todo');

const typeDefs = gql`
  type Todo{
    id: ID!
    text: String!
    completed: Boolean!
  }

  type Query{
    todos: [Todo!]!
    todo(id: ID!): Todo
  }

  type Mutation{
    createTodo(text: String!): Todo
    changeTodo(text: String!, id: ID!, completed: Boolean!): Todo
    clearCompleted: Boolean
    deleteTodo(id: ID!): Int
  }
`

const resolvers = {
  Query: {
    todos: () => data.find(),
    todo: (_, {id}) => data.findById(id),
  },
  Mutation: {
    createTodo: (_, {text}) => data.create({text, completed: false}),
    changeTodo: (_, {text, id, completed}) => data.findOneAndUpdate({_id:id}, {text, completed}, {new:true}),
    clearCompleted: () => data.deleteMany({completed: true}).then(result => result.n),
    deleteTodo: (_, {id}) => data.deleteOne({_id: id}).then(result => result.n)
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })
export default apolloServer.createHandler({ path: '/api/graphql' })