const mongoose = require('mongoose');
const articleSchema = mongoose.Schema;
mongoose.connect('mongodb://localhost/simpleblog');
const Schema = new articleSchema({
	id:{
		type:String,
		require:true
	},
	intro:{
		type:String,
		require:true
	},
	type:{
		type:String,
		require:true
	}
,
	title:{
		type:String,
		require:true
	},
	nickName:{
		type: String,
		require: true 
	},
	avatar:{
		type: String,
	},
	body:{
		type: String,
		require: true 
	}
});
const simpleblog= mongoose.model('simpleblog', Schema);
module.exports.Constructor= simpleblog;
module.exports.remove=simpleblog.remove.bind(simpleblog);
module.exports.update=simpleblog.findByIdAndUpdate.bind(simpleblog);
module.exports.find=simpleblog.find.bind(simpleblog);