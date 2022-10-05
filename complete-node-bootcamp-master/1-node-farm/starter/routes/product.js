const fs = require('fs');
const url = require('url');
const slugify = require('slugify');

const { getDataObject } = require('../data');
const { getProductTemplate } = require('../utils/template-utils');

// Product Page
const productPage = fs.readFileSync(
    './templates/product.html',
    'utf-8'
);

const getProductPage = (req, res) => {
    const productPath = req.url.match(/(?<=\/product\/).*$/g);
    const { pathname, query } = url.parse(productPath[0], true);
    const product = getProductPerName(pathname);

    const output = getProductTemplate(productPage, product);
    res.writeHead(200, {
        'content-type': 'text/html'
    })
    res.end(output);
}

const getProductPerName = (productName) => {
    const productList = getDataObject();
    for (product of productList) {
        const prodName = slugify(product.productName, {lower: true});
        if (prodName === productName) {
            return product;
        }
    }
    return null;
}

module.exports = {
    getProductPage
}