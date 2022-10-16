// Node JavaScript - Event study
const http = require("http");
const url = require('url');

const { getProduct, buyProduct } = require('./product');

// ------------------------------------------------------------------------

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    if (pathname.includes('/product/')) {
        try {
            const product = getProduct(req, res);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            const output = JSON.stringify(product);
            res.end(output);
        }
        catch (error) {
            // Not found
            res.writeHead(404, {
                'Content-type': 'text'
            });
            res.end(error.message);
        }
    }
    else if (pathname.includes('/buy-product/')) {
        try {
            const product = buyProduct(req, res);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            const output = JSON.stringify(product);
            res.end(output);
        }
        catch (error) {
            // Not found
            res.writeHead(404, {
                'Content-type': 'text'
            });
            res.end(error.message);
        }
    }
    else {
        // Not found
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('<h1>Page not found!</h1>');
    }
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Waiting for requests...");
});