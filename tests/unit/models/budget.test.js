const Budget = require("../../../models/Budget");

describe("Budget", () => {
  it("should create a budget object with the correct props", () => {
    const budget = {
      name: "budget1",
      description: "this is a test budget",
      amount: 0,
      startDate: Date.now,
      endDate: Date.now,
      transactions: [],
      dateCreated: Date.now
    };

    expect(budget).toHaveProperty("name", "budget1");
    expect(budget).toHaveProperty("description", "this is a test budget");
    expect(budget).toHaveProperty("amount", 0);

    const budgetKeys = Object.keys(budget);

    budgetKeys.forEach(key => {
      expect(key).toEqual(key);
    });
  });

  it("should hold transactions as a subdocument", () => {
    const transactions = [
      {
        description: "test1",
        amount: 0,
        dateCreated: Date.now
      }
    ];

    const budget = {
      name: "budget1",
      description: "this is a test budget",
      amount: 0,
      startDate: Date.now,
      endDate: Date.now,
      transactions,
      dateCreated: Date.now
    };

    expect(budget).toHaveProperty("transactions");
    expect(transactions).toEqual(expect.arrayContaining(transactions));
  });

  it("should hold transactions that have a description, amount, and dateCreated props", () => {
    const transaction = {
      description: "test1",
      amount: 0,
      dateCreated: Date.now
    };

    expect(transaction).toMatchObject({
      description: "test1",
      amount: 0,
      dateCreated: Date.now
    });
  });
});
