const fs = require('fs');
const http = require('http');
const url = require('url');
const { getProductTemplate } = require('./utils/template-utils');

const overviewPage = fs.readFileSync(
    `${__dirname}/templates/overview.html`,
    'utf-8'
);
const cardPage = fs.readFileSync(
    `${__dirname}/templates/card.html`,
    'utf-8'
);
const productPage = fs.readFileSync(
    `${__dirname}/templates/product.html`,
    'utf-8'
);

const server = http.createServer((req, res) => {
    const {pathname, query} = url.parse(req.url, true);
    let output;
    const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
    const dataObject = JSON.parse(data);

    if (pathname === '/' || pathname === '/overview') {
        const productsList = dataObject.map(product => getProductTemplate(cardPage, product));
        output = overviewPage.replace('${PRODUCT_CARDS}', productsList);
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        res.end(output);
    }
    else if (pathname === '/products') {
        res.writeHead(200, {
            'content-type' : 'application/json'
        })
        res.end(data);
    }
    else if (pathname === '/product') {
        const product = dataObject[query.id];
        output = getProductTemplate(productPage, product);
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        res.end(output);
    }
    else {
        output = '<h1>Page nor found!</h1>';
        res.writeHead(404, {
            'content-type': 'text/html'
        });
        res.end(output);
    }
});
  
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});