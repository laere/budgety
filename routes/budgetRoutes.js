const mongoose = require('mongoose');
const Budget = mongoose.model('budgets');

module.exports = app => {
  // get budgets
  app.get('/api/budgets', async (req, res) => {

  });

  app.post('/api/budgets', async (req, res) => {
    const { title, description, amount, startDate, endDate, transactions } = req.body;

    const budget = new Budget({
      title,
      description,
      amount,
      startDate,
      endDate,
      transactions,
      _user: req.user.id,
      dateSent: Date.now()
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
