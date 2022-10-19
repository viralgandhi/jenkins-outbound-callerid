const TokenValidator = require('twilio-flex-token-validator').functionValidator;

exports.handler = TokenValidator(function(context, event, callback) {
	let twiml = new Twilio.twiml.VoiceResponse();
	twiml.say("This call will be recorded for training and monitoring purposes");
	callback(null, twiml);
});
