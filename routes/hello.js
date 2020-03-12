var express = require('express');
var router = express.Router();

// This is middleware called for all routes.
// Middleware takes three parameters.
router.use((req, res, next) => {
    // console.log(req.method);
    // console.log(req.path);
    // console.log("*hello!*");
    next();
});

router.get('/', function(req, res, next) {
    const data = {
        data: {
            msg: "Hello World_hello1"
        }
    };

    res.json(data);
});


router.get("/:msg", (req, res) => {
    const data = {
        data: {
            msg: req.params.msg
        }
    };

    res.json(data);
});

module.exports = router;
