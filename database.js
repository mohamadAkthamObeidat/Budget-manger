const mongoose = require("mongoose");

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

let moneySchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  income: Number,
  saving: Number,
  currency: String
});

let money = mongoose.model("money", moneySchema);

let getusers = async cb => {
  try {
    // console.log("1");
    let allUsers = await money.find({});
    // console.log("2");
    cb(allUsers);
    // console.log("3");
  } catch (error) {
    cb(error);
  }
};

let addUser = (user, cb) => {
  console.log("user", user);
  money.create(user, (err, data) => {
    if (err) {
      cb(err);
    } else {
      cb(data);
    }
  });
};

let signIn = (userSignIn, cb) => {

  console.log('user', userSignIn)
  money.find(userSignIn , (err, data) => {
    console.log('data', data)
    if (err) {
      cb(err);
    } else {
      console.log('DATA', data)
      cb(data);
    }
   
  });
};

module.exports = {
  addUser,

  signIn,

  getusers

};
