var express = require("express");
var router = express.Router();
var mysql = require("mysql");
const app = express();
var cookieParser = require("cookie-parser");
const session = require("express-session");
var path = require("path");

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sydpro",
});

app.use(cookieParser());

// app.configure(function() {
//   app.use(express.cookieParser('keyboard cat'));
//   app.use(express.session({ cookie: { maxAge: 60000 }}));
//   app.use(flash());
// });

var sess;

//authenticate user
router.post("/", function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  con.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    function (err, result,rows, fields) {
      if (err) throw err;
      if (result.length >= 1) {
         // console.log(result);
          res.send('found');
          
          
        } else {
          console.log("No User Found" + result)
          res.send('nope');
        }
    }
  );
});

// router.get('/todo',(req,res) => {
//   res.send("Alhamdulillah");
// });

// app.listen(process.env.PORT || 3000,() => {
//   console.log(`App Started on PORT ${process.env.PORT || 9000}`);
// });

module.exports = router;
