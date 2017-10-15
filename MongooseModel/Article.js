var mongoose = require('mongoose');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId
var ArticleSchema = new Schema({
  firstMenuId: {
    type: ObjectId,
    ref: 'FirstMenu'
  }
  ,
  secondMenuId: {
    type: ObjectId,
    ref: 'SecondMenu'
  },
  title: String,
  content: String
})

export default mongoose.model('Article', ArticleSchema)