const lodash = require("lodash");
const productsList = require("./products.json").products;

const getProducts = () => {
  return JSON.stringify(productsList);
};

const getProductsById = (productId, done) => {
  const product = lodash.find(productsList, { id: parseInt(productId) });
  if (product) {
    return done(null, JSON.stringify(product));
  } else {
    return done("Requested product doesn't exist..!", null);
  }
};

const saveProduct = (newProduct, done) => {
  if (!newProduct.id || lodash.find(productsList, { id: newProduct.id })) {
    return done("Product already exists..!", null);
  }
  productsList.push(newProduct);
  return done(null, JSON.stringify(productsList));
};

const updateProduct = (productId, updateData, done) => {
  const index = lodash.findIndex(productsList, { id: parseInt(productId) });
  if (index === -1) {
    return done("Requested product doesn't exist..!", null);
  }
  const updatedProduct = lodash.merge(productsList[index], updateData);
  return done(null, JSON.stringify(productsList));
};

const deleteProduct = (productId, done) => {
  const index = lodash.findIndex(productsList, { id: parseInt(productId) });
  if (index === -1) {
    return done("Requested product doesn't exist..!", null);
  }
  const deletedProduct = productsList.splice(index, 1);
  return done(null, JSON.stringify(productsList));
};

module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct,
};
