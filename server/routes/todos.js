var express = require("express");
var router = express.Router();
var mysql = require("mysql");
const app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sydpro",
  connectionLimit: 10,
});

router.get("/list", function (req, res, next) {
  //res.send('todo');
  con.connect(function (err) {
    con.query("SELECT * FROM sydtodo", function (err, result, fields) {
      if (result) {
        //        console.log(result);
        res.send(result);
      } else {
        console.log("Something Error!!" + err);
      }
      //console.log(result);
    });
  });
});

router.post("/addTodo", function (req, res) {
  const todoName = req.body.todoName;
  const todoStatus = req.body.todoStatus;

  con.connect(function (err) {
    con.query(
      "INSERT INTO sydtodo (taskName, statusOfTask) VALUES (?, ?)",
      [todoName, todoStatus],
      function (err, result, fields) {
        if (result) {
          //          console.log(result);
          res.send(result);
          return;
        } else {
          console.log("Something Error!!" + err);
          return;
        }
        //console.log(result);
      }
    );
  });
});

router.post("/editTodo", function (req, res) {
  const todoId = req.body.todoId;
  const todoName = req.body.todoName;
  const todoStatus = req.body.todoStatus;

  con.connect(function (err) {
    con.query(
      "UPDATE sydtodo SET taskName = ?, statusOfTask = ? WHERE id = ?",
      [todoName, todoStatus, todoId],
      function (err, result, fields) {
        if (result) {
   //       console.log(result);
          res.send(result);
          return;
        } else {
          console.log("Something Error!!" + err);
          return;
        }
        //console.log(result);
      }
    );
  });
});

router.post("/deleteTodo", (req, res) => {
  const deleteId = req.body.deleteId;

  con.connect(function (err) {
    con.query(
      "DELETE FROM sydtodo WHERE id = ?",
      [deleteId],
      function (err, result, fields) {
        if (result) {
    //      console.log(result);
          res.send(result);
          return;
        } else {
          console.log("Something Error!!" + err);
          return;
        }
        //console.log(result);
      }
    );
  });
});

// router.post('/', function(req, res, next) {
//     const username = req.body.username;
//     const password = req.body.password;

//     res.send(console.log("something here"));

// });

module.exports = router;
