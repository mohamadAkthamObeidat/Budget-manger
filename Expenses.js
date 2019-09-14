var mongoose = require("mongoose");

var ExpensesSchema = new mongoose.Schema({
  date: Date,
  title: String,
  value: Number
});

module.exports = mongoose.model("Expenses", ExpensesSchema);
