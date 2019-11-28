// const express = require("express");
// const router = express.Router();
// const options = require("../knexfile.js");
// const knex = require("knex")(options);
// var moment = require("moment");
// var jwt = require("jwt-simple");
// const checkToken = require("../middleware/checkToken.js");
// const searchMiddleware = require("../middleware/searchMiddleware.js");
// const loginMiddleware = require("../middleware/loginMiddleware.js");
// const registerMiddleware = require("../middleware/registerMiddleware.js");
// //const app = require('../app.js');
// var app = express();
// app.set(
//   "jwtTokenSecret",
//   "VyJ2xZ8GhgNL3hA0wSotdEVePGWEDMIHZL9lbxv1sUusXiSQclNvgiLQIAPWrFI"
// );
// router.use((req,res, next) => {
//   req.db = knex;
//   next();
// });

// /* GET home page. */

// router.get("/", function(req, res, next) {
//   res.render("index", { title: "QLD CRIME STATS" });
// });

// // /**
// //  * Route to login
// //  * Validates user and generates JWT token
// //  */
// // router.post("/api/login",loginMiddleware );

// // /**
// //  * Route to Register
// //  * Creates new user if they don't already exist
// //  */
// // router.post("/api/register",registerMiddleware );

// // /**
// //  * Search Route
// //  * Queries database based on offence and filters sent
// //  */

// // router.get("/search?", checkToken,searchMiddleware );

// /**
//  * Helper Route
//  */
// // router.get("/api/offences", function(req, res, next) {
// //   req.db
// //     .from("offence_columns")
// //     .select("pretty")
// //     .then(rows => {
// //       let arr = new Array(rows.length);
// //       for (let i = 0; i < rows.length; i++) {
// //         arr[i] = rows[i].pretty;
// //       }
// //       res.json({ Offences: arr });
// //     })
// //     .catch(err => {
// //       console.log(err);
// //       res.json({ Error: true, Message: "Error in MySQL query" });
// //     });
// // });

// // /**
// //  * Helper Route
// //  */

// // router.get("/api/areas", function(req, res, next) {
// //   req.db
// //     .from("areas")
// //     .select("area")
// //     .then(rows => {
// //       let arr = new Array(rows.length);
// //       for (let i = 0; i < rows.length; i++) {
// //         arr[i] = rows[i].area;
// //       }
// //       res.json({ areas: arr });
// //     })
// //     .catch(err => {
// //       console.log(err);
// //       res.json({ Error: true, Message: "Error in MySQL query" });
// //     });
// // });

// // /**
// //  * Helper Route
// //  */
// // router.get("/api/ages", function(req, res, next) {
// //   req.db
// //     .from("offences")
// //     .distinct("age")
// //     .then(rows => {
// //       let arr = new Array(rows.length);
// //       for (let i = 0; i < rows.length; i++) {
// //         arr[i] = rows[i].age;
// //       }
// //       res.json({ ages: arr });
// //     })
// //     .catch(err => {
// //       console.log(err);
// //       res.json({ Error: true, Message: "Error in MySQL query" });
// //     });
// // });

// // /**
// //  * Helper Route
// //  */

// // router.get("/api/years", function(req, res, next) {
// //   req.db
// //     .from("offences")
// //     .distinct("year")
// //     .then(rows => {
// //       let arr = new Array(rows.length);
// //       for (let i = 0; i < rows.length; i++) {
// //         arr[i] = rows[i].year;
// //       }
// //       res.json({ years: arr });
// //     })
// //     .catch(err => {
// //       console.log(err);
// //       res.json({ Error: true, Message: "Error in MySQL query" });
// //     });
// // });

// // /**
// //  * Helper Route
// //  */
// // router.get("/api/genders", function(req, res, next) {
// //   req.db
// //     .from("offences")
// //     .distinct("gender")
// //     .then(rows => {
// //       let arr = new Array(rows.length);
// //       for (let i = 0; i < rows.length; i++) {
// //         arr[i] = rows[i].gender;
// //       }
// //       res.json({ ages: arr });
// //     })
// //     .catch(err => {
// //       console.log(err);
// //       res.json({ Error: true, Message: "Error in MySQL query" });
// //     });
// // });

//module.exports = router;
