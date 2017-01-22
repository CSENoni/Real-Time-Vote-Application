var express = require('express'),
    router = express.Router(),
    val = require('validator'),
    Poll = require('../models/poll');

// Show the detail of specific poll
router.get('/:id', function(req, res){
    if(val.isMongoId(req.params.id)){
        Poll.findById(req.params.id, function(err, poll){
            if(err){
                console.log(err);
                res.redirect('/');
            }else{
                if(req.cookies[req.params.id]){
                    res.render("./polls/show", {poll: poll});
                }else{
                    res.render("./polls/edit", {poll: poll});   
                }
                // Use this to test the real time process and comment the if-else above
                // res.render("./polls/show", {poll: poll});
            }
        });
    }
});

// Use this to test the real time process
// router.get('/:id/edit', function(req, res){
//     if(val.isMongoId(req.params.id)){
//         Poll.findById(req.params.id, function(err, poll){
//             if(err){
//                 console.log(err);
//                 res.redirect('/');
//             }else{
//                 res.render("./polls/edit", {poll: poll}); 
//             }
//         });
//     }
// });

// Edit(update) the data of polls when the event is triggered
router.put('/:id', function(req, res){
    if(val.isMongoId(req.params.id)){
        var op = parseInt(req.body.options);
        var data = JSON.parse(req.body.data);
        data[op]++;
        // Comment this cookie to test the real time process
        res.cookie(req.params.id, 1);
        Poll.findByIdAndUpdate(req.params.id, {$set: {data: data}}, function(err, updatedPoll){
            if(err){
                console.log(err);
            }else{
                res.redirect('/' + req.params.id);
            }
        });
    }
});

module.exports = router;