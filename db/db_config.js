const db = require('mysql2');

const conn = db.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'seren_hotel'
});

conn.connect((err) => {
  if (err) {
    console.error('Error connecting to db: ', err);
    return;
  }
  console.log('connected to db');
});

module.exports = conn;
