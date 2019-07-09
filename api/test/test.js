const { assert } = require('chai');
	request = require('supertest'),
	app = require('../server.js'),
	agent = request.agent(app);

describe('Contact API CRUD testing', function () {

	describe('Get all contacts', function () {

		before(function(done){
			var params = { 
				name: {first: "joe", last: "smith"},
				address: {street: "123 main st", city: "Durham", state: "North Carolina", zip: "27703"},
				phone: {type: "home", number: "919-919-9191"},
				email: "joesmith@gmail.com"
			};
			agent
			.post('/contacts')
			.send(params)
			.end(function(err, result){
				id = result.body._id;
				done();
			})
		})

		it('Should get status equal success and array of contacts', function (done) {
			agent
			.get('/contacts')
			.expect(200)
			.end(function(err, results){
				assert.isArray(results.body);
				done();
			});
		});
		
	});
	
	describe('Post a contact', function () {
		it('Should post a contact and return created message', function (done) {
            let params = { 
                name: {first: "liz", last: "fletcher"},
                address: {street: "4212 Fiesta Rd", city: "Durham", state: "North Carolina", zip: "27703"},
                phone: {type: "cell", number: "919-688-3950"},
                email: "lizfletcher@nc.rr.com"
			};
			let createdMessage = 'Contact created successfully';
			agent
			.post('/contacts')
			.send(params)
			.expect(201)
			.end(function(err, results){
				assert.isString(results.body.message)
				assert.strictEqual(results.body.message, createdMessage)
				done();
			});
		});
	});
	
	describe('Delete a contact', function () {
		var id;
		before(function (done) {
			agent
			.get('/contacts')
			.expect(200)
			.end(function(err, results){
				id =  results.body[0]._id
				done();
			});
		});

		it('Should delete the contact by id', function (done) {
			agent
			.delete('/contacts/'+id)
			.end(function(err, results){
				let deletedMessage = 'Contact successfully deleted';
				assert.isString(results.body.message)
				assert.strictEqual(results.body.message, deletedMessage)
				done();
			})
			
		});
	});

	describe('Update a contact', function () {
		var id;
		before(function (done) {
			var params = { 
                name: {first: "chuck", last: "fletcher"},
                address: {street: "3033 Holloway St", city: "Durham", state: "North Carolina", zip: "27703"},
                phone: {type: "work", number: "919-596-8113"},
                email: "chuck.fletcher@nc.rr.com"
            };
			agent
			.post('/contacts')
			.send(params)
			.end(function(err){
				if(err)console.log(err);
			})
			agent
			.get('/contacts')
			.expect(200)
			.end(function(err, results){
				let resultsArray = results.body
				resultsArray.forEach(element => {
					if(element.name.first == "chuck"){
						id =  results.body[0]._id
					}
				});
				done();
			});

		});

		it('Should update contact by id', function (done) {
			var params = {
				_id : id,
                name: {first: "abby", last: "fletcher"},
                address: {street: "5011 Evergreen Forest Way", city: "Wake Forest", state: "North Carolina", zip: "27587"},
                phone: {type: "cell", number: "919-824-4723"},
                email: "abbyfletcher@gmail.com"
            };
			agent
			.put('/contacts/'+id)
			.send(params)
			.end(function(err, result){
				assert.isObject(result.body)
				done();
			})
			
		});
	});

});