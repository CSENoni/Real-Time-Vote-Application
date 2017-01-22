var express = require('express'),
    router = express.Router(),
    Poll = require('../models/poll');
    
// root route: Show all polls 
router.get('/', function(req, res){
    Poll.find({}, function(err, allPolls){
        if(err){
            console.log(err)
        }else{
            res.render("homepage", {polls: allPolls});
        }
    });
});

// show a form to create a poll
router.get('/new', function(req, res){
    res.render('new');
});

// handle a poll creation
router.post('/', function(req, res){
    var title = req.body.title;
    var des = req.body.description;
    var label = req.body.label;
    var data = [];
    label.forEach(function(l){
        data.push(0);
    });
    Poll.create({
        title: title,
        description: des,
        label: label,
        data: data
    }, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    });
});

module.exports = router;