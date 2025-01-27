const express = require('express')
const routes = express.Router()
const productController = require('./productsController')

routes.get('/', (req, res) => {
  try {
    productController.getProducts((err, results) => {
      if (err) {
        return res.status(400).send(err)
      }
      return res.status(200).send({ STATUS: 'OK', data: results })
    });
  } catch (err) {
    return res.status(500).send('Unexpected system error; try again later.')
  }
});

routes.get('/:productId', (req, res) => {
  try {
    const productId = req.params.productId
    productController.getProductById(productId, (err, results) => {
      if (err) {
        return res.status(400).send(err)
      }
      return res.status(200).send({ STATUS: 'OK', data: results})
    });

  } catch (err) {
    return res.status(500).send('Unexpected system error; try again later.')
  }
});

routes.post('/', (req, res) => {
  try {
    const productDetails = req.body;

    productController.saveProductDetails(productDetails, (err, results) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(201).send({ STATUS: 'OK', data: results });
    });

  } catch (err) {
    return res.status(500).send('Unexpected system error; try again later.');
  }
});

routes.delete("/:productId", (req, res) => {
  try {
    const productId = req.params.productId
    productController.deleteProductById(productId, (err, results) => {
      if (err) {
        return res.status(400).send(err)
      }
      return res.status(200).send({ STATUS: 'OK', data: results })
    });
  } catch (err) {
    return res.status(500).send('Unexpected system error; please try again later.')
  }
});

module.exports = routes;
