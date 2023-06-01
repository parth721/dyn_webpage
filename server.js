const express = require('express');
var path = './index.html/';
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb')
const app = express();

app.get('/', function(req, res)  {
    res.sendFile('./index.html', {root : __dirname});
    console.log('get request');

    
    MongoClient.connect('mongodb://admin:password@localhost:27017', function(err,client){
        if(err) throw err;

        var db = client.db('user-account');
        var query = {userid: 1};
        db.collection('users').findOne(query, function(err, result){
            if(err) throw err;
            client.close();
            response.send(result);
        });
    });
});


app.listen(4000, function(){
    console.log('app listening on port 4000');
});

app.post('/', function(req, res){
    var userObj = req.body;
    var response = res;

    console.log('connectting to the db...');

    MongoClient.connect('mongo://admin:password@localhost:27017', function(err, client){
         if(err) throw err;

         var db = client.db('user-account');
         userObj['userid'] = 1;
         var query = { userid : 1};
         var newValues = {$set : userObj};

         console.log('sucessfully conected to the user-account db');

         db.collection('users').updateOne(query, newValues, {upset : true}, function(err, res){
            if(err) throw err;

            console.log('successfully updated');
            client.close();
            response.send(userObj);
         });
    });
});

