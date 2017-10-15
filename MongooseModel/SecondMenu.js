var mongoose = require('mongoose');

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId

var SecondMenuSchema = Schema({
	firstMenuId: {
		type: ObjectId,
		ref: 'FirstMenu'
	},
	name: String,
	articles: [{
		type: ObjectId,
		ref: 'Article'
	}]
})

export default mongoose.model('SecondMenu', SecondMenuSchema)