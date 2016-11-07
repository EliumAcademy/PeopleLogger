const router  = require('express').Router();
require("../models/people")
const mongoose = require("mongoose")


mongoose.model('people').find({}).remove().exec(
    function(){console.log("All people reacords removed")}
    )


// check if user is signedIn before showing message; else redirect to /signIn
router.get('/people', (req,res) => {
    mongoose.model('people').
        find({}).
        exec(function (err, records) {
            res.json(records)
        })
})

// check if user is signedIn before showing message; else redirect to /signIn
router.post('/people/update/:id', function(req, res){
    mongoose.model('people').
        findOneAndUpdate({_id: req.params.id}, {$set: req.body}).
        exec(function (err, res) {
            if (err) {return res.json(err)}
            res.json("Person Updated with params - " + res.body.age )
        })
})


router.post('/people/update/:id', function(req, res){
    mongoose.model('people').
        findOneAndUpdate({_id: req.params.id}, {$set: req.body}).
        exec(function (err, res) {
            if (err) {return res.text(err)}
            res.json("Person Updated with params - " + res.body.age )
        })
})

router.post('/people', function(req, res){
    mongoose.model('people').
        create(req.body, function (err, records) {
            if (err) {return res.send(err)}
            res.json(records)
        })
})


router.post('/people/delete', function(req, res){
    mongoose.model('people').remove({name: req.body.name}).
        exec(function (err, record) {
            if (err) {return res.json(err)}
            res.send(`Person with name - ${req.body.name} - deleted`)
        })
})

module.exports = router
