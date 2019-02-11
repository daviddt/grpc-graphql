const { ApolloServer, gql } = require('apollo-server');

const port = 1234;

const data = [
    {
        message: 'hello',
    }
];

const typeDefs = gql`
  type Data {
    message: String
  }
  type Query {
    data: [Data]
  }
`;

const resolvers = {
  Query: {
    data: () => data,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen( { port } ).then(() => {
    console.log('🚀 Apollo server started');
});