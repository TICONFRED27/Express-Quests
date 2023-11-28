require("dotenv").config();

const mysql = require("mysql2/promise");

const database = mysql.createPool({
  host: process.env.DB_HOST, // address of the server
  port: process.env.DB_PORT, // port of the DB server (mysql), not to be confused with the APP_PORT !
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//*essayer d'obtenir une première connexion depuis le pool pour vérifier que tout va bien :
//database
// .getConnection()
//.then(() => {
//console.log("Can reach database");
//})
//.catch((err) => {
//console.error(err);
//});

//*requete1
//database
//.query("select * from movies")
// .then((result) => {
// console.log(result);
//})
//.catch((err) => {
//console.error(err);
//});

//*requete2
// database
//   .query("select * from movies")
//   .then((result) => {
//     const movies = result[0];

//     console.log(movies);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
module.exports = database;
