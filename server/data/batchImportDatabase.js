"use strict";
const NFTStock = require("./NFTStock.json");

const {
  connectMongoDB,
  getCollections,
  closeMongoDB,
} = require("../configs/MongoDB");

// Import all the data
const batchImportDatabase = async () => {
  connectMongoDB()
    .then(async () => {
      const { NFTStockData } = getCollections(); // Get the collections

      // Insert the NFTData in MongoDB
      const NFTResult = await NFTStockData.insertMany(NFTStock);
      console.log({
        NFTInsertedCount: NFTResult.insertedCount,
      });
    })
    .then(() => {
      closeMongoDB();
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Call the batchImport
batchImportDatabase();
