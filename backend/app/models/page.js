var mongoose 	= require('mongoose');
var Schema		= mongoose.Schema;

var PageSchema	= new Schema({
	name: String;
});

module.exports = mongoose.model('Page', PageSchema);