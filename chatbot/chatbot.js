// 'use strict'
const dialogflow = require('dialogflow');
const config = require('../config/keys');
const structjson = require('./structjson');


// Create a new session
const projectID = config.googleProjectID;
const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
}

const sessionClient = new dialogflow.SessionsClient({ projectID, credentials });



module.exports = {

    textQuery: async function (text, userID, parameters ={}) {
        
        //Access other export module
        let self = module.exports;

         let sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID+userID);
        
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: text,
                    // The language used by the client (en-US)
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };

        
        
        let responses = await sessionClient.detectIntent(request);
        //this is to check it there is any action in the payload
        responses = await self.handleAction(responses); 
        return responses;
             
    },
    

    handleAction: function (responses) {
        return responses;
    },

    eventQuery: async function (event, userID, parameters) {
        
        //Access other export module
        let self = module.exports;

        let sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID + userID);
        
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters),
                    // The language used by the client (en-US)
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };
        


        let responses = await sessionClient.detectIntent(request);
        //this is to check it there is any action in the payload
        responses = await self.handleAction(responses);
        return responses;
    }
    
}