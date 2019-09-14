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
      .exec((err, user) => {
        console.log('USER FROM CREATE EXPENSES', user);
        if (err) {
          return cb(err);
        }
        user.expenses.push(newExpense._id);
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


// const getExpenses = (expenseID, callBack) => {
//   Expenses.find({ _id: expenseID }, (error, result) => {
//     console.log('GET EXPENSES RESULT DB', result)
//     if (error) {
//       callBack(error);
//     } else {
//       callBack(result);
//     }
//   })
// };


const deleteExpense = (expenseID, callBack) => {
  Expenses.deleteOne({ _id: expenseID }, (error, response) => {
    console.log('RESPONSE FROM DELETE DB', response)
    if (error) {
      callBack(error);
    } else {
      callBack(response);
    }
  })
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
  deleteExpense
};
