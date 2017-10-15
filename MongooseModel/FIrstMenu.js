var mongoose = require('mongoose');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

var FirstMenuSchema = Schema({
    name: String,
    secondMenuList: [{
      type: ObjectId,
      ref: 'SecondMenu'
    }]
})

export default mongoose.model('FirstMenu', FirstMenuSchema)