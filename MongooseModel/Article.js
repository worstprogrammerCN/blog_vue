var mongoose = require('mongoose');

var ArticleSchema = mongoose.Schema({
    title: String,
    content: String
})

var Article = mongoose.model('Article', ArticleSchema)