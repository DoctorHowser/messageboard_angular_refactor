/**
 * Created by danesmith on 11/6/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');


var connectionString = process.env.DATABASE_URL + "?ssl=true" || 'postgres://localhost:5432/toastoffice';

router.route('/submit')
    .get(function(req, res){
        var results = [];

        pg.connect(connectionString, function(err, client, done){
            var query = client.query("SELECT * FROM posts ORDER BY id DESC");


            query.on('row', function(row){
                results.push(row);
            });

            query.on('end', function(){
                client.end();
                return res.json(results);
            });

            if(err){
            console.log(err);
            res.send(false);
            }
        })

    })

    .post(function(req, res){
        //console.log(req);

        var toPost = {
            name: req.body.name,
            post: req.body.message
        };
        pg.connect(connectionString, function(err, client){
            if(err){
                console.log(err);
                res.send(false);
            }

            client.query("INSERT INTO posts (name, post) VALUES ($1, $2)", [toPost.name, toPost.post], function(err, result){
                if(err){
                    console.log('Error inserting into database :', err);
                    res.send(false);
                }

                res.send(true);
            });

        });

    });




router.get('/*', function(req, res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "../public", file))
});

module.exports = router;