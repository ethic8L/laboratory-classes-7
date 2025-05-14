const { getDatabase } = require("../database");
const { ObjectId } = require("mongodb");

const COLLECTION_NAME = "products";

class Product {
  constructor(name, description, price) {
    this.name = name;
    this.description = description;
    this.price = price;
  }

  static async getAll() {
    const db = getDatabase();
    return await db.collection(COLLECTION_NAME).find().toArray();
  }

  async save() {
    const db = getDatabase();

    const existing = await db.collection(COLLECTION_NAME).findOne({ name: this.name });
    if (existing) {
      throw new Error("Product already exists");
    }
    await db.collection(COLLECTION_NAME).insertOne(this);
  }

  static async findByName(name) {
    const db = getDatabase();
    return await db.collection(COLLECTION_NAME).findOne({ name });
  }

  static async deleteByName(name) {
    const db = getDatabase();
    await db.collection(COLLECTION_NAME).deleteOne({ name });
  }

  static async getLast() {
    const db = getDatabase();
    return await db
      .collection(COLLECTION_NAME)
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .next(); 
  }
}

module.exports = Product;
