const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");
const { CashBack } = require("../src/Model/cashback");

const cashDbData = [
  {
    transactionId: 1,
    amount: 10,
  },
  {
    transactionId: 10,
    amount: 5,
  },
  {
    transactionId: 2,
    amount: 10,
  },
  {
    transactionId: 4,
    amount: 20,
  },
  {
    transactionId: 6,
    amount: 20,
  },
  {
    transactionId: 8,
    amount: 20,
  },
];

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

test("Get Cashback", async () => {
  beforeEach(async () => {
    await CashBack.insertMany(cashDbData);
  });

  afterEach(async () => {
    await clearDatabase();
  });

  await request(app)
    .get("/cashback") // get cashback route
    .expect(200); // expecting 200 as response
});
