const fs = require('fs')
const path = require('path');
const filePath = path.join(__dirname, 'products.json');

const getProducts = function(done){
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        return done('Encountered error while getting products details');
      }
      let productData = JSON.parse(fileContent)
      return done(undefined, productData)
    })
}

const getProductById = function(id,done){
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        return done('Encountered error while getting product detail')
      }
      let productData = JSON.parse(fileContent)
      const fetchProduct = productData.find(product => product.id == id)
      if (fetchProduct === undefined) {
        return done('No product found for requested id')
      }
      return done(undefined, fetchProduct)
    })
}


const saveProductDetails = function(productDetails, done) {
  fs.readFile(filePath, (err, fileContent) => {
      if (err) {
          return done('Encountered error while saving product details');
      }
      let productData = JSON.parse(fileContent);
      productData.push(productDetails);

      fs.writeFile(filePath, JSON.stringify(productData, null, 2), (writeErr) => {
          if (writeErr) {
              return done('Encountered error while writing product details to file');
          }
          return done(undefined, productDetails);
      });
  });
};

const deleteProductById = function(productId, done) {
  fs.readFile(filePath, (err, fileContent) => {
      if (err) {
          return done('Encountered error while deleting product');
      }
      let productData = JSON.parse(fileContent);
      const updatedProductData = productData.filter(product => product.id != productId);

      if (productData.length === updatedProductData.length) {
          return done('No product found for the requested id');
      }

      fs.writeFile(filePath, JSON.stringify(updatedProductData, null, 2), (writeErr) => {
          if (writeErr) {
              return done('Encountered error while writing updated product details to file');
          }
          return done(undefined, { deletedId: productId });
      });
  });
};

module.exports ={
    getProducts,
    getProductById,
    saveProductDetails,
    deleteProductById
}