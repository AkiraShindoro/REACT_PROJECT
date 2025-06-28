const { MongoClient } = require("mongodb");

const uri = "mongodb://expenseuser:Yogesh%40132@ac-g0anblh-shard-00-00.9ijtsis.mongodb.net:27017,ac-g0anblh-shard-00-01.9ijtsis.mongodb.net:27017,ac-g0anblh-shard-00-02.9ijtsis.mongodb.net:27017/expenseDB?ssl=true&replicaSet=atlas-126xof-shard-0&authSource=admin&retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  tls: true,
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,
  serverApi: { version: '1' },
  minPoolSize: 1,
  maxPoolSize: 5
});
let db = null;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("expenseDB");
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}

function getDB() {
  if (!db) {
    console.error("❌ DB not initialized. Call connectDB() first.");
  }
  return db;
}

module.exports = { connectDB, getDB };
