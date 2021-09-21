var express = require('express');
var router = express.Router();



router.get("/login", function(req, res, next) {
    res.send('login');
});

router.get("/nouser", function(req, res, next) {
    res.send('nope');
});

// router.post('/', function(req, res, next) {
//     const username = req.body.username;
//     const password = req.body.password;

//     res.send(console.log("something here"));

// });

module.exports = router;