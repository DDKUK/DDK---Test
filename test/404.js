var app = require("../app"),
	request = require("supertest"),
	assert = require("assert");

describe("Test 404 page", function(){
	
	it("Should return a 404 when loading /unknown", function( done ){
		request(app).get("/unknown").expect(404).end(function(err, result){
			//check returned arguments
			assert( !err, err );
			assert( result );
			//no additional tests - it returns a 404 which is addequate
			done();
		});
	});
	
});