const db = require('mysql2');

const conn = db.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'seren_hotel'
});

conn.connect((err) => {
  if(err){
    console.error('Error connecting to db: ', err);
    return;
  }
  console.log('connected to db');
});

module.exports = conn;