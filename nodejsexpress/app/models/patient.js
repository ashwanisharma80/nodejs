
//app/models/user.js
//load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Db = require('mongodb').Db,
    ObjectID = require('mongodb').ObjectID;
  
// Create a new ObjectID
var objectId = new ObjectID();
console.log(objectId);

//define the schema for our user model
var patientSchema = mongoose.Schema({	
	_id:{ type: Number, default: 1 },
	message: String,
	mail: String,
	status: String,
	created_date: Date,
	updated_date: Date,
	active_hash: String,
	objectId:{type:String,default:objectId}
});


//methods ======================

//create the model for users and expose it to our app
module.exports = mongoose.model('patients', patientSchema);