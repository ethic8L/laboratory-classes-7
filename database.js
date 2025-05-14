const { MongoClient } = require("mongodb");
const { DB_USER, DB_PASS } = require("./config");

let database;

const mongoConnect = (callback) => {
  const uri = `mongodb+srv://xtemalitv:ML5bOdV4MG4t18HM@lab7-db.h5lpefp.mongodb.net/?retryWrites=true&w=majority&appName=lab7-db`;

  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
      console.log("Connection to the database has been established.");
      database = client.db("shop");
      callback();
    })
    .catch(err => {
      console.error("Connection failed:", err);
      throw err;
    });
};

const getDatabase = () => {
  if (!database) {
    throw new Error("No database found.");
  }
  return database;
};

module.exports = {
  mongoConnect,
  getDatabase
};
