var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  income: Number,
  saving: Number,
  balance: Number,
  currency: String,
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expenses"
      
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
