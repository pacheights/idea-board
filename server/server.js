const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let ideas = [];

app.get('/', (req, res) => {
   res.send('hello world'); 
});

app.post('/idea', (req, res) => {
    let idea = {
        idea: req.body.idea,
        category: req.body.category
    };
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});