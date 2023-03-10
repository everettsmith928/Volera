// Server File
const mysql = require('mysql2');
const fs = require('fs');

// Database Connection
const con = (req, res) => {
  mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	port: process.env.PORT,
    ssl : {
        ca : fs.readFileSync('ca-certificate.crt'),
        rejectUnauthorized: false
    }
  })

  // Connect to DB
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
};

module.exports = {
  con
}