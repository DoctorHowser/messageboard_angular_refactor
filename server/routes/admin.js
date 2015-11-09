/**
 * Created by danesmith on 11/7/15.
 */
var express = require('express');
var adminRouter = express.Router();
var path = require('path');
var pg = require('pg');
var bodyParser = require('body-parser');

adminRouter.use(bodyParser.json());
adminRouter.use(bodyParser.urlencoded({expanded: true}));


var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/toastoffice';


adminRouter.post('/', function(req, res){
    console.log(req);
    var id = req.body.id;
    pg.connect(connectionString, function(err, client){
        if(err){
            console.log(err);
            res.send(false);
        }

        client.query("DELETE FROM posts WHERE id = $1", [id], function(err, result){
            if(err){
                console.log('Error inserting into database :', err);
                res.send(false);
            }

            res.send(true);
        });

    });
});

adminRouter.get('/*', function(req, res){
    var file = req.params[0] || "views/admin.html";
    res.sendFile(path.join(__dirname, "../public/", file))
});



module.exports = adminRouter;