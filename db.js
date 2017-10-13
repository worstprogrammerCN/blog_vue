var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog', require('./authentication.js'));


var ArticleSchema = mongoose.Schema({
    title: String,
    content: String
})

var Article = mongoose.model('Article', ArticleSchema)


var article = new Article({ title: 'aa', content: '# bb'})

article.save().then(article => {
  return Article.find({})
}).then((articles) => {
  console.log(articles)
}).catch((err) => {
  console.log('err', err)
})


/*
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 
// Connection URL
var url = 'mongodb://localhost:27017/blog';
// Use connect method to connect to the Server
MongoClient.connect(url).then(function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
 
  return db.admin().authenticate('worstCoder', 'jinqu31@#!').find({})
}).then((res) => {
  console.log(res)
}).catch((err) => {
  console.log(err)
})
*/


/*
db.createUser({
  user: 'worstCoder',
  pwd: 'jinqu31@#!',
  roles: [{role: 'dbOwner', db:'blog'}]
})

mongo --port 27017 -u "worstCoder" -p "jinqu31@#!" --authenticationDatabase "blog"
*/