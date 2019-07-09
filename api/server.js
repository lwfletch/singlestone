let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose')
const controller = require('./controllers/main')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/contacts', controller.getContacts)

app.post('/contacts', controller.postContact);

app.put('/contacts/:id', controller.putContact);

app.get('/contacts/:id', controller.getContactById);

app.delete('/contacts/:id', controller.deleteContact);

let server = app.listen(3000, function () {
   let port = server.address().port
   console.log("Listening at port %s", port)
})
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/singlestone',{ useNewUrlParser: true, poolSize: 5}).then(() => {
   console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

module.exports = app;