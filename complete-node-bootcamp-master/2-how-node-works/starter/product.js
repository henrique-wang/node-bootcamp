const url = require('url');
const slugify = require('slugify');

const { getDataObject } = require('./data');
const { SalesEmitter } = require('./salesEmitter');

// Set Sales Events Emmiter
const salesEmitter = new SalesEmitter();
salesEmitter.withEvents();

// Load all Products
var productList;
setImmediate(() => {
    console.log("Loading productList")
    productList = getDataObject()
});

const getProduct = (req, res) => {
    const productPath = req.url.match(/(?<=\/product\/).*$/g);
    const { pathname, query } = url.parse(productPath[0], true);
    const product = getProductPerName(pathname);

    return product;
}

const buyProduct = (req, res) => {
    const productPath = req.url.match(/(?<=\/buy-product\/).*$/g);
    const { pathname, query } = url.parse(productPath[0], true);
    const units = query.units;
    let product = getProductPerName(pathname);
    if (product.available_units >= units) {
        product.available_units -= units;
        salesEmitter.emit("newSale", product.productName, product.available_units);
        return productList;
    }
    salesEmitter.emit("saleFailed", product.productName);
    throw new Error(`Unavailable ${product.available_units} ${product.productName}. Current available units: ${product.available_units}`);
}

const getProductPerName = (productName) => {
    for (product of productList) {
        const prodName = slugify(product.productName, { lower: true });
        if (prodName === productName) {
            return product;
        }
    }
    throw new Error(`Product ${productName} not found`);
}

module.exports = {
    getProduct,
    buyProduct
}