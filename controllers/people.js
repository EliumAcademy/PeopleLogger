const router  = require('express').Router();
require("../models/people")
const mongoose = require("mongoose")

mongoose.model('people').find({}).remove().exec(
    function(){console.log(">>>All people reacords removed<<<")}
    )



router.post('/people', function(req, res){
    mongoose.model('people').
        create(req.body, function (err, records) {
            if (err) {return res.send(err)}
            res.json(records)
        })
})

module.exports = router
