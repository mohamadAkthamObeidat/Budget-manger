const mongoose = require("mongoose");
const User = require("./User");
const Expenses = require("./Expenses");

mongoose.connect(
  "mongodb+srv://alorayb:ah123456@cluster0-qektw.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
const db = mongoose.connection;

db.on("error", function () {
  console.log("mongoose connection error");
  console.log("____________________________");
});

db.once("open", function () {
  console.log("mongoose connected successfully");
  console.log("____________________________");
});

// let moneySchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   income: Number,
//   saving: Number,
//   currency: String
// });

// let money = mongoose.model("money", moneySchema);

let getUsers = async cb => {
  try {
    let allUsers = await User.find({});
    cb(allUsers);
  } catch (error) {
    cb(error);
  }
};

let addUser = (user, cb) => {
  console.log("user", user);
  // money.create(user, (err, data) => {
  //   if (err) {
  //     cb(err);
  //   } else {
  //     cb(data);
  //   }
  // });
  let newUser = new User(user);
  newUser.save(err => {
    if (err) return console.log("error", err);
    console.log(newUser);
    return cb(newUser);
  });
};

let signIn = (userSignIn, cb) => {
  console.log("user", userSignIn);
  User.find(userSignIn, (err, data) => {
    console.log("data", data);
    if (err) {
      cb(err);
    } else {
      console.log("DATA", data);
      cb(data);
    }
  });
};

const createExpenses = (data, cb) => {
  const newExpense = new Expenses(data);
  newExpense.save(err => {
    if (err) return cb(err);
    User.findOne({ _id: data.user_id }).exec((err, user) => {
      if (err) return cb(err);
      user.expenses.push(newExpense._id);
      user.save();
      cb(user);
    });
  });
};

const getUserExpenses = (user_id, cb) => {
  User.findOne({ _id: user_id })
    .populate("expenses")
    .exec((err, user) => {
      if (err) return cb(err);
      cb(user);
    });
};

const updateExpense = (expenseID, callback) => {

}

const deleteExpense = (expenseID, callback) => {

}

module.exports = {
  addUser,
  signIn,
  getUsers,
  createExpenses,
  getUserExpenses
};
