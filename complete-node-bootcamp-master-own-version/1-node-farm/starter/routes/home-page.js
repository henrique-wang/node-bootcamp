const fs = require('fs');

const { getDataObject } = require('../data');
const { getProductTemplate } = require('../utils/template-utils');

// Home Page
const overviewPage = fs.readFileSync(
    './templates/overview.html',
    'utf-8'
);

const cardPage = fs.readFileSync(
    './templates/card.html',
    'utf-8'
);

const getHomePage = (req, res) => {
    const productsList = getDataObject().map(product => getProductTemplate(cardPage, product));
    const output = overviewPage.replace('${PRODUCT_CARDS}', productsList);
    res.writeHead(200, {
        'content-type': 'text/html'
    })
    res.end(output);
}

module.exports = {
    getHomePage
}