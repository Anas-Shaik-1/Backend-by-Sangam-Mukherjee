const { gql } = require("graphql-tag");

const typeDefs = gql`
    type Product {
        id: ID!
        title: String!
        category: String!
        inStock: Boolean!
        price: Float!
    }

    type Query {
        Products: [Product!]!
        Product(id: ID!): Product
    }

    type Mutation {
        createProduct(
            title: String!
            category: String!
            inStock: Boolean!
            price: Float!
        ): Product!

        updateProduct(
            id: ID
            title: String
            category: String
            inStock: Boolean
            price: Float
        ): Product

        deleteProduct(id: ID): Product
    }
`;

module.exports = typeDefs;
