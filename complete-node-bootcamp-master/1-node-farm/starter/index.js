const http = require('http');
const url = require('url');

const { getProductPage } = require('./routes/product');
const { getHomePage } = require('./routes/home-page');
const { getNotFoundPage } = require('./routes/not-found-page');

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url, true);

    if (pathname === '/' || pathname === '/overview') {
        getHomePage(req, res);
    }
    else if (pathname === '/product') {
        getProductPage(req, res);
    }
    else {
        getNotFoundPage(req, res);
    }
});
  
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});