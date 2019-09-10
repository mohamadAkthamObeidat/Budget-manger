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

app.post("/signUp", (req, res) => {
  const user = req.body;
  console.log('user', user)
  mongo.addUser(user, result => {
    res.json(result);
  });
});
app.post("/ss", (req, res) => {
  const userSignIn = req.body;
  console.log('shakeruser', userSignIn)
  mongo.signIn(userSignIn, result => {
    if (result.length <1)
      res.json('password and email does not match');
    res.json(result);
  });
});

app.put("/update/:id", (req, res) => {
  let repo = req.params.id;
  // console.log(repo);
  mongo.updateRepo(repo, result => {
    res.json(result);
  });
});

app.delete("/delete/:id", function(req, res) {
  let repoId = req.params.id;
  // console.log(repoId);
  mongo.deleteRepo(repoId, result => {
    res.json(result);
  });
});

const path = require("path");
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "front-end/build")));
// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/front-end/build/index.html"));
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server listening to ${PORT}`));
