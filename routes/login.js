require("dotenv").config();
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

// // *************** databas grejor ****************
// const sqlite3 = require('sqlite3').verbose();
// const path = require('path')
// const dbPath = path.resolve("db", 'texts.sqlite')
// let db = new sqlite3.Database(dbPath, (err) => {
// 	if(err) {
// 		return console.log(err.message);
// 	}
// 	// console.log("Connected to database!")
// });


const db = require("../db/database.js");

var globalToken = "";


// Add a route
router.post("/create_user", (req, res) => {
  // console.log("----------------");
	// console.log("*create_user PSOT2*");
  // console.log(req.body);
  // console.log("----------------");
	db.each("SELECT COUNT(*) AS total FROM users WHERE email = ?",
  req.body.email,(err, row) => {
	if (row.total == 1) {
		// console.log("user exist");
		//Kolla här
		res.json({
				data: {
						msg: "user exist"
				}
		});
	} else {
		db.run("INSERT INTO users (name, email, password, year, month, day) VALUES (?, ?, ?, ?, ?, ?)",
				req.body.name,req.body.email,req.body.password,req.body.year,req.body.month,req.body.day, (err) => {
				if (err) {
					// console.log("error");
					res.json({
							data: {
									msg: "POST user NOT created"
							}
					});
				}
				// console.log("no error");
				res.json({
						data: {
								msg: "POST user created"
						}
				});
		});
	}
  });
});



// Add a route
router.post("/login_user", (req, res) => {
  // console.log("----------------");
	// console.log("*login_user PSOT2*");
  // console.log(req.body);
  // console.log("----------------");

	db.each("SELECT COUNT(*) AS total FROM users WHERE (email, password) = (?,?)",
  req.body.email,req.body.password,(err, row) => {
	if (row.total == 1) {
		// console.log("yes, user exist");
		const user = {
			email: req.body.email,
			password: req.body.password
		}
		jwt.sign({user}, "secretkeye8600f5a58e83c4398e83d582137e83798789864276c35dff374f3d365e4d4cb", (err, token) => {
			// console.log("token1");
			// console.log(token);
			// console.log("token1");
			globalToken = token;
			res.json({
				token
			});
		});
	} else {
		// console.log("user does NOT exist");
		res.json({
			msg: "erro"
		});
	}
  });
});




// Add a route
router.get("/test_user", verifyToken, (req, res) => {
	// console.log("----------------");
	// console.log("*testing.....*");
  // console.log(req.token);
	// console.log(globalToken);
  // console.log("----------------");
	jwt.verify(req.token, "secretkeye8600f5a58e83c4398e83d582137e83798789864276c35dff374f3d365e4d4cb", (err, authData) => {
		if (err) {
			console.log("errror auth");
			res.json({
					data: {
							msg: "forbidden auth"
					}
			});
		} else {
				// Gör ngt... visa rätt?
				res.json({
					token: globalToken,
					text: "text test",
					msg: "verified",
					authData
				});
			}
	});

});

//verify verifyToken
function verifyToken(req, res, next) {
	//get auth header val
	// const bearerHeader = req.headers["authorization"];
	const bearerHeader = globalToken;
	// console.log("*bearerHeader*");
	// console.log(bearerHeader);
	// console.log("*bearerHeader*");
	// check berarer
	if (typeof bearerHeader !== "undefined") {
		req.token = bearerHeader;
		next();

	} else {
		//forbidden
		console.log("forbidden");
		// res.sendStatus(403);
		res.json({
				data: {
						msg: "forbidden"
				}
		});
	}

}


// Add a route
router.get("/create", (req, res) => {
    rand_val1 = Math.random()
    rand_val2 = Math.random()
    db.run("INSERT INTO users (email, password) VALUES (?, ?)",
        rand_val1,
        rand_val2, (err) => {
        if (err) {
          console.log("******");
          console.log(err.message);
          console.log("******");
          res.json({
              data: {
                  msg: "err0rz"
              }
          });
        }

        res.json({
            data: {
                msg: "GET user created"
            }
        });
    });
});


// Add a route
router.post("/create", (req, res) => {
    console.log(req.body);
    db.run("INSERT INTO users (email, password) VALUES (?, ?)",
        rand_val1,
        rand_val2, (err) => {
        if (err) {
          console.log(err.message);
          res.json({
              data: {
                  msg: "err0rz"
              }
          });
        }

        res.json({

            data: {
                msg: "POST user created"
            }
        });
    });
});




// // Add a route
// router.get("/login", (req, res) => {
//   console.log(req.body);
//
// 	res.json({
// 			data: {
// 					msg: "user found GET"
// 			}
// 	});
// });
//
//
// // Add a route
// router.post("/login", (req, res) => {
//   console.log(req.body);
//
//     res.json({
//         data: {
//             msg: "user found POST"
//         }
//     });
// });
//
//








module.exports = router;
