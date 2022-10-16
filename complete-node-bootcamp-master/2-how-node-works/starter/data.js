const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

const getDataObject = () => {
    const dataObject = JSON.parse(data);
    return dataObject;
}

module.exports = {
    data,
    getDataObject
}