const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');

router.get('/', verify, async (req, res) => {
  const user = await User.findOne({_id: req.user._id});
  const money = {
    income:[...user.income],
    expenses:[...user.expenses]
  }
  res.status(200).send(money)
})

router.post('/add', verify, async (req, res) => {
  const {account, title, desc, amount, currency, type, id, date} = req.body;
  //Find user from jwt token
  const user = await User.findOne({_id: req.user._id})
  const newPost = {id, account, title, desc, amount, currency, type, date}
  if (account === 'income') {
    user.income = [...user.income, newPost]
  }
  if (account === 'expense') {
    user.expenses = [...user.expenses, newPost]
  }
  user.save();
  res.status(200).send(`New post added to user ${account}-account`)
})

router.post('/delete', verify, async (req, res) => {
  const {id, account} = req.body;
  //Find user from jwt token
  const user = await User.findOne({_id: req.user._id})
  if (account === 'income') {
    const updatedArray = user.income.filter((entry) => {
      return entry.id !== id
    });
    user.income = updatedArray
  }
  if (account === 'expense') {
    const updatedArray = user.expenses.filter((entry) => {
      return entry.id !== id
    });
    user.expenses = updatedArray
  }
  user.save();
  res.status(200).send(`Post with ID ${id} deleted`)
})

module.exports = router;
