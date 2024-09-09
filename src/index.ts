import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { prismaClient } from './lib/db';
const app = express();

const PORT = Number(process.env.PORT) || 3001;

async function startServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
        type Query {
            hello: String
            say(name: String): String
        }
        type Mutation{
            createUser(firstName: String, lastName: String, email: String,password: String):Boolean
        
        
        }
        `,
        resolvers: {
            Query:{
                hello: () => 'Hello, World!',
                say: (_,{name}:{name:string}) => `Hi ${name}! How are you`
            },
            Mutation:{
                createUser: async (_, {firstName, lastName, email, password}) => {
                    try {
                        await prismaClient.user.create({
                            data: {
                                firstName,
                                lastName,
                                email,
                                password,
                                salt: "salt"
                            }
                        });
                        return true;
                    } catch (error) {
                        console.error(error);
                        return false;
                    }
                }
            }
        }
    });

    await gqlServer.start();
    app.use(express.json());
    app.use('/graphql',expressMiddleware(gqlServer));
    app.listen(PORT, () => console.log('App listening on port  ', PORT));
}

startServer();


