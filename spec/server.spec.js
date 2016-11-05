const app = require('../server.js');
const supertest = require('supertest');
let agent = supertest.agent(app)


describe("POST /people", function() {

    it("tests that we post one user", function(done) {
        agent.post("/people")               // start creating your request
            .type('form')                   // mimic the action of submittin a request with a form
            .send({name: "pedro", age: 22}) // Request construction finished and send the information passed as an argument ex: {name: "pedro", age: 22}
            .expect( function(res){         // Check that the responce does or does not have the information necessary to make the test pass
                if (res.body.name !== "pedro") {
                    throw new Error("Saved Wrong Name")
                }
            })
            .end(function(err, res) {          // Allways add these lines when using Supertest with Jasmine
                if(err) return done.fail(err)
                done()
            })
    })


    it("tests that we user name should be unique", function(done) {
        agent.post("/people")
            .type('form')
            .send({name: "pedro", age: 22})
            .expect('Content-Type', /json/)
            .expect(function(res) {
                if (res.body.code !== 11000) {
                    throw new Error(res.body.errmsg)
                }
            })
            .end(function(err, res) {
                if(err) return done.fail(err)
                done()
            })
    });


    it("Age should be required", function(done) {
        agent.post("/people")
            .expect('Content-Type', /json/)
            .type('form')
            .send() // <--- FILL IN HERE 
            .expect((res) => { if(res.body.message === "people validation failed") throw new Error("Age showd be required") } )
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
            .expect((res) => { }) //<--- FIll Here
            .end(function(err, res) {
                if(err) return done.fail(err)
                done()
            })
    })
});

describe("POST /people/delete", function() {
    // Test that a person with a given name is deleted
    // Notes: Checkout the difference between res.body & res.text
});