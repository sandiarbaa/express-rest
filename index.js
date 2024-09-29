const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

let users = [];

app
  .get("/", (req, res) => {
    res.send(users);
  })

  .post("/", (req, res) => {
    const data = req.body;
    users = [...users, data];
    res.send("user created");
  })

  .delete("/:name?", (req, res) => {
    const name = req.params.name;
    let deletedUser = users.filter((val) => val.name !== name);
    users = deletedUser;
    res.send("user deleted");
  })

  .put("/", (req, res) => {
    const { name, email } = req.body;
    users.map((val) => {
      if (val.email === email) {
        val.name = name;
      }
    });
    res.send(users);
  });

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
