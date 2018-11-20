const express = require('express');
const cors = require('cors');
const pg = require('pg');

const app = express();
const port = 443;
const dbConnectionString = '';

app.use(express.json());
app.use(cors());

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

const validatePassword = (submission) => {
  if (submission === '') {
    return true;
  }
  return false;
}

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
      res.json(result.rows);
      database.end();
    });
  });
});

app.post('/ideas', (req, res) => {
  const idea = String(req.body.idea);
  const category = req.body.category;
  const password = req.body.password;
  const postQuery = `INSERT INTO ideas(idea, category, postdate) VALUES(\'${idea}\', \'${category}\', current_date)`;
  
  if (validatePassword(password)) {
    dbQuery(postQuery);
  }
  res.send(idea);
});

app.put('/ideas', (req,res) => {
  const originalIdea = req.body.originalIdea;
  const editedIdea = req.body.editedIdea;
  const password = req.body.password;
  const updateQuery = `UPDATE ideas SET idea = '${editedIdea}' WHERE idea = '${originalIdea}'`;
  
  if (validatePassword(password)) {
    dbQuery(updateQuery);
  }
  res.send(editedIdea);
});

app.delete('/ideas', (req, res) => {
  const idea = req.body.idea;
  const password = req.body.password;
  const deleteQuery = `DELETE FROM ideas WHERE idea = '${idea}'`;

  if (validatePassword(password)) {
    dbQuery(deleteQuery);
  } 
  res.send(deleteQuery);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// clearDB()