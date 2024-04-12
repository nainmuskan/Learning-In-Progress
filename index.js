const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
//to parse form data below
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'app',
  password:  'Muskan@12345'
  // remember to remove the password when pushing to GitHub
});


let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
}

//Home Route
app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM user`;
  try {
      connection.query(q, (err, result) => {
        if(err) throw err;
        // console.log(result[0]["count(*)"]);
        let count = result[0]["count(*)"];
        res.render("home.ejs", {count});
        // res.send("success");
      });
    } catch (err) {
      console.log(err);
      res.send("some error in DB");
    }
  // res.send("Welcome to Home Page");
})

//Show Route
app.get("/user", (req, res) => {
  let q = `SELECT * FROM user`;
  try {
    connection.query(q, (err, users) => {
      if(err) {
        throw err;
      }
      res.render("showusers.ejs", {users});
      // console.log(result);
      // res.send(result);
    })
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
})

//Edit Route
app.get("/user/:id/edit", (req, res) => {
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if(err) {
        throw err;
      }
      let user = result[0];
      // console.log(result);
      res.render("edit.ejs", {user});
      // console.log(result);
      // res.send(result);
    })
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
  // console.log(id);
  // res.render("edit.ejs");
})

//UPDATE (DB) Route
app.patch("/user/:id", (req, res) => {
  let {id} = req.params;
  let q =`SELECT * FROM user WHERE id = '${id}'`;
  let {password: formPass, username: newUserName} = req.body;

  try {
    connection.query(q, (err, result) => {
      if(err) {
        throw err;
      }

      let user = result[0];
      if(formPass != user.password) {
        res.send("WRONG Password");
      } else {
        let q2 = `UPDATE user SET username='${newUserName}'WHERE id = '${id}'`;
        connection.query(q2, (err, result) => {
          if(err) {
            throw err;
          }
          res.redirect("/user");
          // res.send(result);
        })
      }
      // res.send(user);
      // res.send("edit.ejs", {user});
    })
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }

  // res.send("updated");
})

app.listen("8080", () => {
  console.log("server is listening at port 8080");
})



// try {
//   connection.query(q, [data], (err, result) => {
//     if(err) throw err;
//     console.log(result);
    
//   });
// } catch (err) {
//   console.log(err);
// }

// connection.end();





// let q = "INSERT INTO user (id, username, email, password) VALUES ?";

// let data = [];

// for(let i=1; i<=100; i++) {
//   data.push(getRandomUser());
// }



// let q = "SHOW TABLES";

//Inserting new data
// let q = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";

// let user = ["123", "123_newuser", "abc@gmail.com", "abc"];

// console.log(result.length);
// console.log(result[0]);
// console.log(result[1]);

// let users = [["123b", "123_newuserb", "abc@gmail.comb", "abcb"], ["123c", "123_newuserc", "abc@gmail.comc", "abcc"]];

// user

// let getRandomUser = () => {
//   return {
//     id: faker.string.uuid(),
//     username: faker.internet.userName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//   };
// }

// console.log(getRandomUser());