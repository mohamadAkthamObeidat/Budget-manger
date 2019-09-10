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

let addUser = (user, cb) => {
  console.log('user', user)
  money.create(user, (err, data) => {
    if (err) {
      cb(err);
    } else {
      cb(data);
    }
  });
};

module.exports = {
  addUser
};
