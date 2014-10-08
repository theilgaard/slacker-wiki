var express		= require('express');
var app			= express();
var bodyParser 	= require('body-parser');
var mongoose 	= require('mongoose');
var syscmds 	= require('./app/syscmds');

// Models
var Page 		= require('./app/models/page');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



var dbport = 27017;
var port = process.env.PORT || 8080;
var router = express.Router();

// Mongo db 
mongoose.connect('mongodb://86.52.78.30:27017/slacker-wiki');

// Router middleware, handles all routes.
router.use(function(req,res,next){
	// do logging
  	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	console.log("something happened");
	next();
})
router.get('/', function(req, res){
	res.json({ message: "root route! ah yah!"});
});
// Do more routes...
router.get('/sysinfo/cpu', function(req, res){
	var cpustat = syscmds.getCpu(function(stdout){
		//console.log("stdout was: "+stdout);
		res.json({ cpu: stdout.replace(/\n$/,'') });
	});
});

router.route('/pages')
	// Create a page on POST at /api/pages
	.post(function(req, res){
		var page = new Page();
		page.title = req.body.title;
		page.content = req.body.content;
		page.author = req.body.author;
		page.lastModified = new Date();

		page.save(function(err){
			if(err)
				res.send(err);
			res.json({message: 'Page created!'});
		});
	})
	.get(function(req, res){
		Page.find(function(err, pages){
			if(err)
				res.send(err);

			res.json(pages);
		});
	});
router.route('/pages/:page_id')
	// Get a specific page
	.get(function(req, res){
		Page.findById(req.params.page_id, function(err, page){
			if (err)
				res.send(err);

			res.json(page);
		});
	})
	// Update a specific page
	.put(function(req, res){
		Page.findById(req.params.page_id, function(err, page){
			if(err)
				res.send(err);
			page.title = req.body.title;
			page.content = req.body.content;
			page.author = req.body.author;
			page.lastModified = new Date();

			page.save(function(err){
				if(err)
					res.send(err);

				res.json({message: 'Page updated!'});
			});

		});
	})
	// Delete a specific page
	.delete(function(req, res){
		Page.remove({
			_id: req.params.page_id
		}, function(err, page){
			if(err)
				res.send(err);

			res.json({message: 'Successfully deleted!'});
		});
	});



app.use('/api', router);


// Starting server
app.listen(port);
console.log('Server started on port: '+port);

