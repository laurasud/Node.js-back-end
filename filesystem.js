var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
const routes = require('express').Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


var jsonStr = '[{"id": 1, "comment": "comment number 1"},{"id": 2, "comment": "comment number 2"},{"id": 3, "comment": "comment number 3"}]';


var obj = JSON.parse(jsonStr);
obj.push({"id":"5","comment":"comment number 5"});


for (var i=0; i<obj.length; i++){
        if (obj[i].id == 5)
        {
            obj[i].id = 4;
            obj[i].comment = "changed comment";
        }
    }

jsonStr = JSON.stringify(obj);

fs.writeFile('C:/Users/LauraPC/Documents/Projects/20170609/test2/src/assets/data/posts.txt', jsonStr, function (err) {
    if (err) throw err;
    console.log('posts.json created!');
});


app.use('/', routes);

app.listen(8080, function() {
    console.log('Server running at http://127.0.0.1:8080/');
});

app.post('/myaction', function (req, res) {
    var user_id = req.query.input1;
    res.send(user_id);
});