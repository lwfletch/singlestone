var utils = require('../util.js')
let mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID

const constactSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String
  },
  phone: {
    formType: String,
    number: String
  },
  email: String
});

const Contact = mongoose.model('Contact', constactSchema);

exports.getContacts = function(req, res){
  Contact.find({}, (err, contacts) => {
    if (err) res.status(500).send(error)
    res.status(200).json(contacts);
  });
}

exports.getContactById = function(req, res){
  Contact.findById(req.params.id, (err, contact) => {
    if (err) res.status(500).send(error)

    res.status(200).json(contact);
  });
}

exports.postContact = function(req, res) {
  utils.jsonvalidator(req.body, res)
  let contact = new Contact({
    name: {
      first: req.body.name.first,
      last: req.body.name.last
    },
    address: {
      street : req.body.address.street,
      city : req.body.address.city,
      state: req.body.address.state,
      zip: req.body.address.zip
    },
    phone: {
      number: req.body.phone.number,
      formType: req.body.phone.type
    },
    email: req.body.email,
  });
  contact.save(error => {
    if (error) res.status(500).send(error);
    res.status(201).json({
        message: 'Contact created successfully'
    });
  });
};


exports.putContact = function(req, res) {
  utils.jsonvalidator(req.body)
  let id = req.params.id
  Contact.findByIdAndUpdate({_id: ObjectID(id)}, {$set: {name: req.body.name, address: req.body.address, phone: req.body.phone, email: req.body.email}}, {new: true}, (err, doc) => {
    if (err) res.status(500).send(err);
    res.status(200).json({
      message: doc
    });
  });
};

exports.deleteContact = function(req, res){
  let id = req.params.id
  var deleteQuery = { _id: id };
  Contact.deleteOne(deleteQuery, function(err) {
    if (err) res.status(500).send(err);
    res.status(200).json({
      message: 'Contact successfully deleted'
    });
  });
}
