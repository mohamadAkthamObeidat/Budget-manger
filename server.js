const express = require("express");
const cors = require("cors");
const mongo = require("./database");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/all", (req, res) => {
  mongo.getIniRepos(result => {
    res.json(result);
  });
});
// post the data entered by the user during signup to the data base
app.post("/signUp", (req, res) => {
  const user = req.body;
  mongo.addUser(user, result => {
    res.json(result);
  });
});
// post the data entered by the user during the sining in to the data base
app.post("/ss", (req, res) => {
  const userSignIn = req.body;
  mongo.signIn(userSignIn, result => {
    if (result.length < 1) res.json("password and email does not match");
    res.json(result);
  });
});
// expenses are sent to the database after being entered by the user
app.post("/expenses", (req, res) => {
  mongo.createExpenses(req.body, result => {
    res.send(result);
  });
});

app.post("/salary", (req, res) => {
  // console.log(req.body);
  mongo.addSalary(req.body.id, result => {
    console.log("server result", result);
    res.json(result);
  });
});
// ?? OBIEDAT
app.get("/expenses/:id", (req, res) => {
  const userId = req.params.id;
  mongo.getUserExpenses(userId, result => {
    res.json(result);
  });
});

app.delete("/delete/:expid/:userid", (req, res) => {
  let expenseID = req.params.expid;
  let userID = req.params.userid;
  console.log("expenseID", expenseID);
  console.log("userID", userID);
  res.send("HI");
  // mongo.deleteExpense(expenseID, result => {
  //   res.json(result);
  // });
});

// app.put("/update/:id", (req, res) => {

//   let expenseID = req.params.id;
//   mongo.updateExpense(expenseID, req.body,result => {
//     res.json(result);
//   });
// });

// app.delete("/delete/:id", function(req, res) {
//   let expenseID = req.params.id;
//   mongo.deleteExpense(expenseID, result => {
//     res.json(result);
//   });
// });

//   let repo = req.params.id;
//   // console.log(repo);
//   mongo.updateRepo(repo, result => {
//     res.json(result);
//   });
// });

// app.delete("/delete/:id", function(req, res) {
//   let repoId = req.params.id;
//   // console.log(repoId);
//   mongo.deleteRepo(repoId, result => {
//     res.json(result);
//   });
// });

const path = require("path");
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "front-end/build")));
// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/front-end/build/index.html"));
});

app.post("/settings", (req, res) => {
  mongo.putSalare(req.body, result => {
    res.json(result);
  });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server listening to ${PORT}`));
