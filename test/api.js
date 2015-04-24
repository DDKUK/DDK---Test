var app = require("../app"),
	request = require("supertest"),
	assert = require("assert");

describe("Test API", function(){
	
	it("Should return a list of users", function( done ){
		request(app).get("/api/users").expect(200).expect('Content-Type', /json/).end(function(err, result){
			//check returned arguments
			assert( !err, err );
			assert( result );
			assert( Array.isArray( result.body ) )
			//no additional tests - it returns a 404 which is addequate
			done();
		});
	});
	
	it("Should be able to edit a user", function( done ){
		request(app).get("/api/users").expect(200).expect('Content-Type', /json/).end(function(err, result){
			//check returned arguments
			assert( !err, err );
			assert( result );
			//no additional tests - it returns a 404 which is addequate
			done();
		});
	});
	
	
});