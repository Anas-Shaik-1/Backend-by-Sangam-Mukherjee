const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const resolvers = require("./src/graphql/resolvers");
const typeDefs = require("./src/graphql/schema");
require("dotenv").config({
    path: "../.env",
});

const connectToDB = require("./src/db/db");

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await connectToDB();

    const { url } = await startStandaloneServer(server, {
        listen: { port: process.env.PORT },
    });

    console.log("URL: ", url);
};

startServer();
