import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

const app = express();

const PORT = Number(process.env.PORT) || 3001;

async function startServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
        type Query {
            hello: String
        }`,
        resolvers: {
            Query:{
                hello: () => 'Hello, World!',
            }
        }
    });

    await gqlServer.start();
    app.use(express.json());
    app.use('/graphql',expressMiddleware(gqlServer));
    app.listen(PORT, () => console.log('App listening on port  ', PORT));
}

startServer();


