var express = require('express');
var router = express.Router();
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



router.get("/week/:id", (req, res) => {
    // console.log(req.params.id);

    db.each("SELECT * FROM reports WHERE week = ?",
    req.params.id,(err, row) => {
  	if (err) {
  		// console.log(err);
      res.sendStatus(403);
  	} else {
      // console.log(row);
      const data = {
              title: row.title,
              text: row.text
      };
      res.json(data);
  	}
    });
});

// router.get("/week/:id", (req, res) => {
//     // console.log(req.params.id);
//
//     db.each("SELECT * FROM reports WHERE week = ?",
//     req.params.id,(err, row) => {
//   	if (err) {
//   		console.log(err);
//       res.sendStatus(403);
//   	} else {
//       console.log(row);
//       const data = {
//               title: row.title,
//               text: row.text
//       };
//       res.json(data);
//   	}
//     });
// });


// Add a route
router.post("/", (req, res) => {
  // console.log("----------------");
	// console.log("*create_update*");
  // console.log(req.body);
  // console.log("----------------");
	db.each("SELECT COUNT(*) AS total FROM reports WHERE week = ?",
  req.body.week,(err, row) => {
	if (row.total == 1) {
		console.log("week exist");
    db.run("UPDATE reports SET text = ? WHERE week = ?",
        req.body.text,req.body.week, (err) => {
        if (err) {
          res.json({
              data: {
                  msg: "POST report NOT updated"
              }
          });
        }
        res.json({
            data: {
                msg: "POST user updated"
            }
        });
    });
	} else {
    console.log("does not exist");
		db.run("INSERT INTO reports (week, text) VALUES (?, ?)",
				req.body.week,req.body.text, (err) => {
				if (err) {
					res.json({
							data: {
									msg: "POST report NOT created"
							}
					});
				}
				res.json({
						data: {
								msg: "POST user created"
						}
				});
		});
	}
  });
});

















//****************
//post
//****************
router.post("/yo", (req, res) => {
    //Sparar i databasen
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./db/texts.sqlite');

    db.run("INSERT INTO users (email, password) VALUES (?, ?)",
      "user@example.com",
      "superlonghashedpasswordthatwewillseehowtohashinthenextsection", (err) => {
      if (err) {
          res.json({
              data: {
                  msg: "un-successfully"
              }
          });
      }

      res.json({
          data: {
              msg: "successfully"
          }
      });
    });

});


router.post("/spara", (req, res) => {
  //Krypterar lösen
  const bcrypt = require('bcryptjs');
  const saltRounds = 10;
  const myPlaintextPassword = 'longandhardP4$$w0rD';

  bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // spara lösenord i databasen.
  });

    //Sparar i databasen
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./db/texts.sqlite');

    db.run("INSERT INTO users (email, password) VALUES (?, ?)",
      "user@example.com",
      "superlonghashedpasswordthatwewillseehowtohashinthenextsection", (err) => {
      if (err) {
          res.json({
              data: {
                  msg: "un-successfully"
              }
          });
      }

      res.json({
          data: {
              msg: "successfully"
          }
      });
    });

});








router.get('/test', function(req, res) {
  var string = encodeURIComponent('something that would break');
      res.params.test = "test1";
      req.params.test = "test2";

  res.redirect('/reports');
});



router.get('/', function(req, res) {
  var passedVariable = req.query.valid;
    // console.log(req);
    console.log(req.params);
});


module.exports = router;
