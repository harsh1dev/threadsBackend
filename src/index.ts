import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import createApolloGraphqlServer from "./graphql";
const app = express();

const PORT = Number(process.env.PORT) || 3001;

async function startServer() {
    

    app.use(express.json());
    app.use('/graphql',expressMiddleware(await createApolloGraphqlServer()));
    app.listen(PORT, () => console.log('App listening on port  ', PORT));
}

startServer();


