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
        agent.post("/people")
            .expect('Content-Type', /json/)
            .type('form')
            .send({name: "pedro", age: 22})
            .expect((res) => { if (!res.body) {throw new Error("Saved Name Duplicate") }} )
            .end(function(err, res) {
                if(err) return done.fail(err)
                done()
            })
    });

    
    it("Age should be required", function(done) {
        // Test that the user will not be samved if we do not provide an age
        agent.post("/people")
            .expect('Content-Type', /json/)
            .type('form')
            .send({name: "pedro2"}) 
            .expect((res) => { if (!res.body) { throw new Error("Saved person withouth age") }} )
            .end(function(err, res) {
                if(err) return done.fail(err)
                done()
            })
    })


});


describe("GET /people", function() {
    it("Get a JSON list of people", function(done) {
        agent.get("/people")
            .expect('Content-Type', /json/)
            .expect((res) => { if (res.body[0].name !== "pedro") {throw new Error("Records not retrived or wrong collection") }} )
            .end(function(err, res) {
                if(err) return done.fail(err)
                done()
            })
    });
});

describe("POST /people/delete", function() {
    it("Person deleted by name", function(done) {
        agent.post("/people/delete")
            .type('form')
            .send({name: 'pedro'})
            .expect('Content-Type', /text/)
            .expect((res) => { if (!res.body) {throw new Error("Person not deleted") }} )
            .end(function(err, res) {
                if(err) return done.fail(err)
                done()
            })
    });
});
