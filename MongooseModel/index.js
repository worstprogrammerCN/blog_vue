// connect database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog', require('./authentication.js'));

import FirstMenu from './FirstMenu.js'
import SecondMenu from './SecondMenu.js'
import Article from './Article.js'

export { FirstMenu, SecondMenu, Article }