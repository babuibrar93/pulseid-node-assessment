const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app"); // Importing app
const { Transaction } = require("../src/Model/transaction"); // Import Transaction model

// Data to be inserted into database
const transactionData = {
  date: "2022-05-09",
  id: "1",
  customerId: "2",
};

// Function to clear database
const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

// Runs afetr every test
afterEach(async () => {
  await clearDatabase();
});

test("Post Transaction", async () => {
  await request(app)
    .post("/transaction") // post route for transaction
    .send(transactionData) // sending transactionData to transaction route
    .expect("Ok") // expecting "OK" as a response
    .expect(201); // expecting 201 as statusCode

  const addedTransaction = await Transaction.findOne({ id: transactionData.id });

  expect(addedTransaction[0]).to.have.property("date"); // expecting to have property "date"
  expect(addedTransaction[0]).to.have.property("id"); // expecting to have property "id"
  expect(addedTransaction[0]).to.have.property("customerId"); // expecting to have property "customerId"
});
