const { startStandaloneServer } = require("@apollo/server/standalone");
const { ApolloServer } = require("@apollo/server");

const typeDefs = require("./src/graphql/schema");
const resolvers = require("./src/graphql/resolvers");

startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    const { url } = await startStandaloneServer(server, {
        listen: { port: 3000 },
    });

    console.log("URL: ", url);
};

startServer();
