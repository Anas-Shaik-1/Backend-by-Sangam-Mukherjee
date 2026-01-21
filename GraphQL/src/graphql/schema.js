const { gql } = require("graphql-tag");

const typeDefs = gql`
    type Product {
        id: ID!
        title: String!
        price: Float!
        category: String!
        inStock: Boolean!
    }

    type Query {
        Products: [Product!]!
        Product(id: ID): Product
        Delete(id: ID): Product
    }

    type Mutation {
        createProduct(
            title: String!
            category: String!
            inStock: Boolean!
            price: Float!
        ): Product

        deleteProduct(id: ID): Boolean

        updateProduct(
            id: ID!
            title: String
            category: String
            inStock: Boolean
            price: Float
        ): Product
    }
`;

module.exports = typeDefs;
