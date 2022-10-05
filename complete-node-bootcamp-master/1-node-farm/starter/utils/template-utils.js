const slugify = require('slugify');

const getProductTemplate = (temp, product) => {
    let output = temp.replace(/\${PRODUCT_NAME}/g, product.productName);
    output = output.replace(/\${PRODUCT_IMAGE}/g, product.image);
    output = output.replace(/\${PRODUCT_PRICE}/g, product.price);
    output = output.replace(/\${PRODUCT_FROM}/g, product.from);
    output = output.replace(/\${PRODUCT_NUTRIENTS}/g, product.nutrients);
    output = output.replace(/\${PRODUCT_QUANTITY}/g, product.quantity);
    output = output.replace(/\${PRODUCT_DESCRIPTION}/g, product.description);
    output = output.replace(/\${PRODUCT_ID}/g, product.id);
    output = output.replace(/\${PRODUCT_NAME_URL}/g, slugify(product.productName, {lower: true}));

    if(!product.organic) output = output.replace(/\${ORGANIC_PRODUCT}/g, 'not-organic');
    return output;
}

module.exports = {
    getProductTemplate
}