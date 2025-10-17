// connectDB.js
const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const dbName = "AGSS_BV";

let dbInstance = null;

async function connectDB() {
    if (dbInstance) return dbInstance;

    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    console.log("Connected to MongoDB");

    dbInstance = client.db(dbName);
    return dbInstance;
}

module.exports = connectDB;
