const mysql = require('mysql2');  

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'user',   
  database: 'proj'
});

connection.connect((err) => {
  if (err) {
    console.error('Failed to connect to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

module.exports = connection;
