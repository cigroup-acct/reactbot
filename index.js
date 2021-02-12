const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Add dialogflow routes and make app available in the file
require('./routes/dialogFlowRoutes')(app);


if (process.env.NODE_ENV === 'production') {
    //js and css file
    app.use(express.static('client/build'));

    //index.html for all pages route
    const path = require('path');
    app.get('*', (res, req) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}




const PORT = process.env.PORT || 5000;
app.listen(PORT);