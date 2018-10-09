var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
var patientmodel=require('../models/patient');

exports.add = function(req, res) {
	if (req.session.user) { // req.session.passport._id
        res.render('patient.ejs', {
            error : req.flash("error"),
            success: req.flash("success"),
            session:req.session,
        });
	} else {
		res.redirect('/login');
	
    }
}

exports.savePatient=function(req,res){
      if (req.session.user) { // req.session.passport._id
        
        console.log(req.body);
        //	next();
        //console.log(req.body.myname);
        //console.log(request.body.user.email);
        var email=req.body.email;
        var message=req.body.message;
        var newUser            = new patientmodel();
        var Db = require('mongodb').Db,
        ObjectID = require('mongodb').ObjectID;
  
// Create a new ObjectID
        var objectId = new ObjectID();
        patientmodel.findOne({ 'mail' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                console.log("Record Alread Exists");
                return null;
                //return done(null, false, req.flash('error', 'That email is already taken.'));
            } else {
                    // set the user's local credentials
                  
                    var day =dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss");
                    patientmodel.find().sort([['_id', 'descending']]).limit(1).exec(function(err, patientdata) {	

                    var active_code=bcrypt.hashSync(Math.floor((Math.random() * 99999999) *54), null, null);
                    newUser.mail    = email;
                    newUser.message = req.body.message;
                    newUser.created_date = day;
                    newUser.updated_date = day;
                    newUser.status = 'active'; //inactive for email actiavators
                    newUser.active_hash = active_code;
                    newUser._id =patientdata[0]._id+1;
                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        res.redirect('/list_patient');
                        //req.session.destroy();
                    
                    });
                });
            }   
             
        });
    
    
      
       } else {
        res.redirect('/login');
        }
    
}

exports.listPatient=function(req,res){
    if (req.session.user) { 
        patientmodel.find().sort([['_id', 'descending']]).exec(function(err, patientdata) {	
            console.log(patientdata);
            
            res.render('patientlist',{'patients':patientdata,'title':'Patient List'});
        });
        
    }else{
        res.redirect('/login');
    }
}