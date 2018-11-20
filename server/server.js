const express = require('express');
const cors = require('cors');
const pg = require('pg');

const app = express();
const port = process.env.PORT || 3000;
const dbConnectionString = '';

const dbQuery = (query) => {
  const database = new pg.Client(dbConnectionString);

  database.connect((err) => {
    if (err) {
      console.log(err);
    }
    database.query(query, (err, result) => {
      if (err) {
        console.log(err);
      }
      database.end();
      return result.rows || 'success';
    });
  });
}

const clearDB = () => {
  const database = new pg.Client(dbConnectionString);
  const deleteQuery = 'DELETE FROM ideas';

  database.connect((err) => {
    if (err) {
      console.log(err);
    }
    database.query(deleteQuery, (err) => {
      if (err) {
       console.log(err);
      }
      database.end();
    });
  });
}

app.use(express.json());
app.use(cors());

app.get('/ideas', (req, res) => {
  const database = new pg.Client(dbConnectionString);
  const getQuery = 'SELECT * FROM ideas';
  res.json(dbQuery(getQuery));
});

app.post('/ideas', (req, res) => {
  const idea = String(req.body.idea);
  const category = req.body.category;
  const postQuery = `INSERT INTO ideas(idea, category, postdate) VALUES(\'${idea}\', \'${category}\', current_date)`;
  res.send(dbQuery(postQuery));
});

app.put('/ideas', (req,res) => {
  const originalIdea = req.body.originalIdea;
  const editedIdea = req.body.editedIdea;
  const updateQuery = `UPDATE ideas SET idea = '${editedIdea}' WHERE idea = '${originalIdea}'`;
  res.send(dbQuery(updateQuery));
});

app.delete('/ideas', (req, res) => {
  const idea = req.body.idea;
  const deleteQuery = `DELETE FROM ideas WHERE idea = '${idea}'`;
  res.send(dbQuery(deleteQuery));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// clearDB()