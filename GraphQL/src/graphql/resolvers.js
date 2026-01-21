const products = require("../data/products");

const resolvers = {
    Query: {
        Products: () => products,
        Product: (_, { id }) => products.find((product) => product.id == id),
    },
    Mutation: {
        createProduct: (_, { title, category, inStock, price }) => {
            const newProduct = {
                id: String(products.length + 1),
                title,
                price,
                inStock,
                category,
            };
            products.push(newProduct);
            return newProduct;
        },

        deleteProduct: (_, { id }) => {
            const index = products.findIndex((product) => product.id == id);

            if (index == -1) return false;
            products.splice(index, 1);

            return true;
        },
        updateProduct: (_, { id, ...updates }) => {
            const index = products.findIndex((product) => product.id == id);

            if (index == null) return null;

            const updatedProduct = {
                ...products[index],
                ...updates,
            };

            products[index] = updatedProduct;

            return updatedProduct;
        },
    },
};

module.exports = resolvers;
