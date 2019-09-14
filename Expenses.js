var mongoose = require("mongoose");

var ExpensesSchema = new mongoose.Schema({
  date: String,
  title: String,
  value: Number
});

module.exports = mongoose.model("Expenses", ExpensesSchema);
