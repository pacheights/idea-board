const express = require('express');
const cors = require('cors');
const pg = require('pg');

const app = express();
const port = process.env.PORT || 3000;

const dbConnectionString = '';

app.use(express.json());
app.use(cors());

app.get('/ideas', (req, res) => {
  const database = new pg.Client(dbConnectionString);
  const getQuery = 'SELECT * FROM ideas';

  database.connect((err) => {
    if (err) {
      console.log(err);
    }
    database.query(getQuery, (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log(result.rows);
        res.json(result.rows);
        database.end();
      }
    });
  });
});

app.post('/ideas', (req, res) => {
  const database = new pg.Client(dbConnectionString);
  const idea = String(req.body.idea);
  const category = req.body.category;
  const postQuery = `INSERT INTO ideas(idea, category, postdate) VALUES(\'${idea}\', \'${category}\', current_date)`;
  
  database.connect((err) => {
    if (err) {
      console.log(err);
    }
    database.query(postQuery, (err) => {
      if (err) {
       console.log(err);
      }
      else {
        database.end();
      }
    });
  });

  res.send(idea);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});