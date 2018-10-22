const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
let ideas = [];

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(ideas); 
});

app.post('/idea', (req, res) => {
  let idea = {
    idea: req.body.idea,
    category: req.body.category
  };
  ideas.push(idea);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});