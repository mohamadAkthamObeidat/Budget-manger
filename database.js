const mongoose = require("mongoose");
const User = require("./User");
const Expenses = require("./Expenses");

mongoose.connect(
  "mongodb+srv://alorayb:ah123456@cluster0-qektw.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
const db = mongoose.connection;

db.on("error", function() {
  console.log("mongoose connection error");
  console.log("____________________________");
});

db.once("open", function() {
  console.log("mongoose connected successfully");
  console.log("____________________________");
});

let getusers = async cb => {
  try {
    // console.log("1");
    let allUsers = await User.find({});
    // console.log("2");
    cb(allUsers);
    // console.log("3");
  } catch (error) {
    cb(error);
  }
};

let addUser = (user, cb) => {
  console.log("user", user);
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
  const newExpens = new Expenses(data);
  newExpens.save(err => {
    if (err) return cb(err);
    User.findOne({ _id: data.user_id }).exec((err, user) => {
      if (err) return cb(err);
      user.expenses.push(newExpens._id);
      user.save();
      cb(user);
    });
  });
};

const addSalary = (user_id, cb) => {
  console.log(user_id);
  User.find({ _id: user_id }, (err, data) => {
    if (err) return cb(err);
    console.log("the balance value", data[0].balance);
    let x = data[0].income;
    let y = data[0].balance;
    let c = x + y;
    data[0].balance = c;
    console.log("the new value", data[0].balance);
    // user.expenses.push(newExpens._id);
    data[0].save();
    console.log(data);
    cb(c);
  });

  // const newExpens = new Expenses(data);
  // newExpens.save(err => {
  //   if (err) return cb(err);
  //   User.findOne({ _id: data.user_id }).exec((err, user) => {
  //     if (err) return cb(err);
  //     user.expenses.push(newExpens._id);
  //     user.save();
  //     cb(user);
  //   });
  // });
};

const getUserExpenses = (user_id, cb) => {
  User.findOne({ _id: user_id })
    .populate("expenses")
    .exec((err, user) => {
      if (err) return cb(err);
      cb(user);
    });
};

module.exports = {
  addUser,
  signIn,
  getusers,
  createExpenses,
  getUserExpenses,
  addSalary
};
