const EventEmitter = require("events");

class SalesEmitter extends EventEmitter {
  constructor() {
    super();
  }

  withEvents() {
    // Define events for SalesEmitter
    this.on("newSale", () => {
      console.log("There was a new sale!");
    });

    this.on("newSale", (productName, stock) => {
      console.log(`There are now ${stock} ${productName} left in stock.`);
    });

    this.on("saleFailed", (productName) => {
      console.log(`There was an error selling ${productName}`);
    })
  }
}

module.exports = {
  SalesEmitter
}