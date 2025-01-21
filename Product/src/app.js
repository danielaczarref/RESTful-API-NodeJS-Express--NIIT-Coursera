const http = require('http');
const PORT = process.env.PORT || 5000;
const productsService = require("./productsService");
const getRequestData = require('./utils');
const { parse } = require('url');

const router = {
  GET: {},
  POST: {},
  PUT: {},
  DELETE: {},
};

const addRoute = (method, path, handler) => {
  const normalizedPath = path.replace(/\/$/, '');
  router[method][normalizedPath] = handler;
};

const notFoundHandler = (req, res) => {
  res.writeHead(404, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
};

const matchRoute = (method, path) => {
  const routes = router[method] || {};
  const normalizedPath = path.replace(/\/$/, '');
  for (const route in routes) {
    const routeRegex = new RegExp(`^${route.replace(/:\w+/g, '(\\w+)')}$`);
    const match = normalizedPath.match(routeRegex);
    if (match) {
      return { handler: routes[route], params: match.slice(1) };
    }
  }
  return { handler: notFoundHandler, params: [] };
};

const server = http.createServer(async (req, res) => {
  const { pathname } = parse(req.url);
  const { handler, params } = matchRoute(req.method, pathname);

  try {
    await handler(req, res, params);
  } catch (error) {
    res.writeHead(500, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error', details: error.message }));
  }
});

addRoute('GET', '/api/v1/products', async (req, res) => {
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(productsService.getProducts());
});

addRoute('GET', '/api/v1/products/:id', async (req, res, params) => {
  const [id] = params;
  productsService.getProductsById(id, (err, result) => {
    if (err) {
      res.writeHead(404, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ error: err }));
    } else {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(result);
    }
  });
});

addRoute('POST', '/api/v1/products', async (req, res) => {
  let reqBody = await getRequestData(req);
  productsService.saveProduct(JSON.parse(reqBody), (err, result) => {
    if (err) {
      res.writeHead(400, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ error: err }));
    } else {
      res.writeHead(201, { 'content-type': 'application/json' });
      res.end(result);
    }
  });
});

addRoute('PUT', '/api/v1/products/:id', async (req, res, params) => {
  const [id] = params;
  let reqBody = await getRequestData(req);
  productsService.updateProduct(id, JSON.parse(reqBody), (err, result) => {
    if (err) {
      res.writeHead(404, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ error: err }));
    } else {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(result);
    }
  });
});

addRoute('DELETE', '/api/v1/products/:id', async (req, res, params) => {
  const [id] = params;
  productsService.deleteProduct(id, (err, result) => {
    if (err) {
      res.writeHead(404, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ error: err }));
    } else {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(result);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
