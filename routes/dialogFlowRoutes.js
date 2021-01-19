const dialogflow = require('dialogflow');
const config = require('../config/keys');


// Create a new session
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);



module.exports = app => {
    app.get('/', (req, res) => {
        res.send({
            'name': 'John Odey'
        });
    });

    app.post('/api/df_text_query', async(req, res) => {
        // The text query request.
        try {
            const request = {
                session: sessionPath,
                queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: req.body.text,
                    // The language used by the client (en-US)
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
                },
            };
            let responses = await sessionClient.detectIntent(request);
            console.log(responses);
            
            res.send(responses[0].queryResult);
            
        }
        catch(err) {
            console.log(err);
        }
        

        
        


        // res.send({
        //     'do': 'text query'
        // });
    });

    app.post('/api/df_event_query', (req, res) => {
        res.send({
            'do': 'event query'
        });
    });
    
}
