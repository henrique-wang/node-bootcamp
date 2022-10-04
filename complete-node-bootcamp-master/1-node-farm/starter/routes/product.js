const fs = require('fs');
const url = require('url');

const { getDataObject } = require('../data');
const { getProductTemplate } = require('../utils/template-utils');

// Product Page
const productPage = fs.readFileSync(
    './templates/product.html',
    'utf-8'
);

const getProductPage = (req, res) => {
    const { query } = url.parse(req.url, true);
    const product = getDataObject()[query.id];

    const output = getProductTemplate(productPage, product);
    res.writeHead(200, {
        'content-type': 'text/html'
    })
    res.end(output);
}

module.exports = {
    getProductPage
}