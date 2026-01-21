const typeDefs = require("./schema");
const Product = require("../models/Product");

const resolvers = {
    Query: {
        Products: async () => {
            const products = await Product.find();

            return products;
        },
        Product: async (_, { id }) => {
            const product = await Product.findById(id);
            if (!product) return null;

            return product;
        },
    },
    Mutation: {
        // createProduct: async (_, args) => {
        createProduct: async (_, { title, category, inStock, price }) => {
            const product = await Product.create({
                title,
                category,
                inStock,
                price,
            });

            return product;
        },

        updateProduct: async (_, { id, ...args }) => {
            const product = await Product.findByIdAndUpdate(id, args, {
                new: true,
            });
            return product;
        },
        deleteProduct: async (_, { id }) => {
            const product = await Product.findByIdAndDelete(id);
            return product;
        },
    },
};

module.exports = resolvers;
