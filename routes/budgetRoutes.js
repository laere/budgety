const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Budget = mongoose.model('budgets');

module.exports = app => {

  app.get('/api/budgets', requireLogin, async (req, res) => {
    const budgets = await Budget.find({ _user: req.user.id });

    res.send(budgets);
  });

  app.get('/api/budgets/:budgetId', requireLogin, async (req, res) => {
    const budget = await Budget.findById({ _id: req.params.budgetId });

    res.status(200).json(budget);
  });

  app.post('/api/budgets', requireLogin, async (req, res) => {
    const { title, description, amount, startDate, endDate, transactions } = req.body;

    const budget = new Budget({
      title,
      description,
      amount,
      startDate,
      endDate,
      transactions,
      _user: req.user.id,
      dateCreated: Date.now()
    });

    try {
      await budget.save();
      req.user.totalBalance += parseFloat(amount);
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err)
    }

  });


};
