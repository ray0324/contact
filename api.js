var express    = require('express'),    
    bodyParser = require('body-parser'),
    Bourne     = require('bourne'),
    db         =  new Bourne('data.json'),
    router     = express.Router();

router
    .use(function(req,res,next){
        if(!req.user) req.user = {id:1};
        next();
    })
    .use(bodyParser.json())
    .route('/contact')
        .get(function(req,res){
            db.find(function(err,data){
                 res.json(data);
            });
        })
        .post(function(req,res){
            var contact = req.body;
            contact.userId = req.user.id;

            db.insert(contact,function(err,data){
                 res.json(data);
            });
        });

router
    .param('id',function(req,res,next){
        req.dbQuery = {id:parseInt(req.params.id,10)}
    })
    .route('/contact/:id')
        .get(function(req,res){
            db.findOne(req.dbQuery,function(err,data){
                 res.json(data)
            });
        })
        .put(function(req,res){
            var contact = req.body;
            delete contact.$promise;
            delete contact.$resolved;
            db.update(req.dbQuery,function(err,data){
                 res.json(data[0]);
            });
        })
        .delete(function(req,res){
            db.delete(req.dbQuery,function(){
                 res.json(null);
            })
        });


module.exports = router;