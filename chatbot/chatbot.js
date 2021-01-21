// 'use strict'
const dialogflow = require('dialogflow');
const config = require('../config/keys');
const structjson = require('./structjson');


// Create a new session
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);

module.exports = {

    textQuery: async function (text, parameters ={}) {
        //Access other export module
        let self = module.exports;
        
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

    eventQuery: async function (event, parameters) {
        //Access other export module
        let self = module.exports;
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