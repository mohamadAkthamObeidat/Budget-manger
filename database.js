const mongoose = require("mongoose");
const User = require("./User");
const Expenses = require("./Expenses");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

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

const getUserExpenses = (user_id, callBack) => {
  User.findOne({ _id: user_id })
    .populate("expenses")
    .exec((err, user) => {
      err ? callBack(err) : callBack(user);
    });
};

const createExpenses = (data, cb) => {
  const newExpense = new Expenses(data);
  newExpense.save(err => {
    if (err) {
      return cb(err);
    }
    User.findOne({ _id: data.user_id })
      .populate("expenses")
      .exec((err, user) => {
        console.log("USER FROM CREATE EXPENSES", user);
        if (err) {
          return cb(err);
        }
        user.expenses.push(newExpense._id);
        if (user.balance >= data.value) user.balance -= data.value;
        else user.saving -= data.value;
        user.save(err => {
          if (err) return cb(err);
          getUserExpenses(data.user_id, cb);
        });
        // cb(user);
      });
  });
};

const addSalary = (user_id, cb) => {
  console.log(user_id);
  User.find({ _id: user_id }, (err, data) => {
    if (err) return cb(err);
    console.log("the balance value", data[0].balance);
    let income = data[0].income;
    let balance = data[0].balance;
    let saving = data[0].saving;
    let totalsaving = saving + balance;
    data[0].saving = totalsaving;
    data[0].balance = income;
    console.log("the new value", data[0].balance);
    // user.expenses.push(newExpens._id);
    data[0].save();
    console.log(data);
    cb(data);
  });
};

const deleteExpense = (expID, userID, cb) => {
  Expenses.findOneAndDelete({ _id: expID }, (err, data) => {
    if (err) return cb(err);
    console.log(data);
    User.findOne({ _id: userID }).exec((err, user) => {
      if (err) return cb(err);
      const delIndex = user.expenses.indexOf(expID);
      user.expenses.splice(delIndex, 1);
      user.balance += data.value;
      user.save(err => {
        if (err) return cb(err);
        getUserExpenses(userID, cb);
      });
    });
    // cb(data);
  });
};

const search = (data, cb) => {
  User.findOne({ _id: data.id })
    .populate("expenses")
    .exec((err, user) => {
      if (err) return cb(err);
      const filterArray = user.expenses.filter(exp => {
        let query = new RegExp(data.term, "g");
        return query.test(exp.title);
      });
      console.log(filterArray);
      cb(filterArray);
    });
};

const putSalary = (balance, cb) => {
  User.update({ _id: balance.id }, { $set: { balance } })
    .newBalance("balance")
    .exec((err, user) => {
      if (err) return cb(err);
    });
};

module.exports = {
  addUser,
  signIn,
  getUsers,
  createExpenses,
  getUserExpenses,
  putSalary,
  addSalary,
  deleteExpense,
  search
};
