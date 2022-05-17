const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app"); // Importing app
const Ruleset = require("../src/Model/rules"); // Importing Ruleset model

// Data to be inserted into database
const rules = {
  startDate: "2022-03-03",
  endDate: "2022-06-03",
  cashback: "2.00",
  redemptionLimit: "10",
  minTransactions: "5",
  budget: "1000.00",
};

// // Function to clear database
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

test("Post Ruleset", async () => {
  await request(app)
    .post("/ruleset") // post route for ruleset
    .send(rules) // sending rules to ruleset route
    .expect("OK") // expecting "OK" as a response
    .expect(201); // expecting 201 as statusCode

  const addedResultset = await Ruleset.find({
    startDate: rules.startDate,
    endDate: rules.endDate,
    cashback: rules.cashback,
    redemptionLimit: rules.redemptionLimit,
    minTransactions: rules.minTransactions,
    budget: rules.budget,
  });
  expect(addedResultset[0]).to.have.property("startDate"); // expecting to have property "startDate"
  expect(addedResultset[0]).to.have.property("endDate"); // expecting to have property "endDate"
  expect(addedResultset[0]).to.have.property("cashback"); // expecting to have property "cashback"
  expect(addedResultset[0]).to.have.property("redemptionLimit"); // expecting to have property "redemptionLimit"
  expect(addedResultset[0]).to.have.property("minTransactions"); // expecting to have property "minTransactions"
  expect(addedResultset[0]).to.have.property("budget"); // expecting to have property "budget"
});
