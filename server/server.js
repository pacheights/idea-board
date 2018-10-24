const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
let ideas = [];

app.use(express.json());
app.use(cors());

app.get('/ideas', (req, res) => {
  res.json(ideas); 
});

app.post('/ideas', (req, res) => {
  let idea = {
    idea: req.body.idea,
    category: req.body.category
  };
  ideas.push(idea);
  res.send(idea);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});