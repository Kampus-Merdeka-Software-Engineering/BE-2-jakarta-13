const express = require('express');
const db = require('./db/db_config');
const conn = require('./db/db_config');

const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(cors());
app.use(express.json());

// //konfigurasi headers
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://kampus-merdeka-software-engineering.github.io'); // Ganti dengan domain atau port klien Anda
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// middleware untuk mengambil data review dari frontend
app.post('/sendReview', (req,res) => {
  const name = req.body.name;
  const email = req.body.email;
  const rating = parseInt(req.body.rating);
  const review = req.body.review;

  const dataToInsert = {
    name: name,
    email: email,
    rating: rating,
    review: review,
  };

  const sql = `INSERT INTO review SET ?`;

  conn.query(sql, dataToInsert, (err,result) => {
    if(err){
      console.error('Error inserting data:', err);
      return;
    }

    console.log('Data inserted successfully!!');
  });
  res.json('Data inserted successfully!!')
})

// middleware untuk mengirim data tabel ke frontend
app.get('/getReview', (req,res) => {
  const data = 'SELECT * FROM review';

  db.query(data, (err, result) => {
    if (err) {
      console.log("error querying database:", err);
      res.status(500).json("Internal server error!")
    }
    else{
      console.log("review sent!!")
      res.status(200).json({review: result});
    }
  });
});