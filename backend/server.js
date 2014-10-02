var express		= require('express');
var app			= express();
var bodyParser 	= require('body-parser');
var mongoose 	= require('mongoose');
var syscmds 	= require('./app/syscmds');

// Models
var page 		= require('./app/models/page');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var dbport = 27017;
var port = process.env.PORT || 8080;
var router = express.Router();

// Mongo db 
mongoose.connect('mongodb://86.52.78.30:27017/slacker-wiki');

router.get('/', function(req, res){
	res.json({ message: "root route! ah yah!"});
});
router.get('/sysinfo/cpu', function(req, res){
	var cpustat = syscmds.getCpu(function(stdout){
		//console.log("stdout was: "+stdout);
		res.json({ cpu: stdout.replace(/\n$/,'') });
	});
});
// Do more routes...

app.use('/api', router);


// Starting server
app.listen(port);
console.log('Server started on port: '+port);

