const app = require('../server.js');
const supertest = require('supertest');
let agent = supertest.agent(app)

describe("POST /people", function() {

    it("post one user", function(done) {
        agent.post("/people")
            .expect('Content-Type', /json/)
            .type('form')
            .send({name: "pedro", age: 22})
            .expect((res) => { if (res.body.name !== "pedro") {throw new Error("Saved Wrong Name") }} )
            .end(function(err, res) {
                if(err) return done.fail(err)
                done()
            })
    })


    it("User name should be unique", function(done) {
        // Test that the user will not be samved if the user already exists in the db
    });

    
    it("Age should be required", function(done) {
        // Test that the user will not be samved if we do not provide an age
    })


});

// implement test for the index action that shows all the created users

// implement test for the delete action that deletes one user by name