const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Add dialogflow routes and make app available in the file
require('./routes/dialogFlowRoutes')(app);




const PORT = process.env.PORT || 5000;
app.listen(PORT);