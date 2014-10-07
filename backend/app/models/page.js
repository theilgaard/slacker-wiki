var mongoose 	= require('mongoose');
var Schema		= mongoose.Schema;

var PageSchema	= new Schema({
	title: String,
	content: String,
	author: String,
	lastModified: Date
});

module.exports = mongoose.model('Page', PageSchema);