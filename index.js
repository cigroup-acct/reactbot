const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({
        'name': 'John Odey'
    });
})

app.listen(5000);