// const dialogflow = require('dialogflow');
// const config = require('../config/keys');
const chatbot = require('../chatbot/chatbot');


// Create a new session
// const sessionClient = new dialogflow.SessionsClient();
// const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);



module.exports = app => {
    app.get('/', (req, res) => {
        res.send({
            'name': 'John Odey'
        });
    });

    app.post('/api/df_text_query', async(req, res) => {
        // The text query request.
        
            let response = await chatbot.textQuery(req.body.text, req.body.userID, req.body.parameters);
            res.send(response[0].queryResult);
    });

    app.post('/api/df_event_query', async(req, res) => {
        let response = await chatbot.eventQuery(req.body.event, req.body.userID, req.body.parameters);
        res.send(response[0].queryResult);
    });
    
}
