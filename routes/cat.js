// routes for cats
var Cat = require('../models/cat')

// TESTER: showing all the cats
exports.list = function(req, res){
	// get the list of cats
	var cats = Cat.find({}).sort('age').exec(function (err, docs){
		if(err)
			return console.log("error with getting cats", cats);
		// send it back
		res.render('cats', {cats: docs, title: 'All of the Cats'});
	});
};

// listing cats by age & color
exports.by_color = function(req, res){
	// get the list of cats w/ a certain color
	var colored_cats = Cat.find({'colors': req.params.color}).sort('age').exec(function (err, docs){
		if(err)
			return console.log("error with returning cats of that color", cats);
		res.render('cats', {cats: docs, title: 'Cats by Color'});
	});
};

// creating a new cat
exports.create = function(req, res){
	// render form 
	res.render('create_cat', {title: 'Create a New Cat'});
};

exports.create_post = function(req, res){
	// grab form information for db entry

	// save the cat in the database
	var newCat = new Cat({name: req.body.name, age: req.body.age, colors: req.body.colors});
	newCat.save(function (err){
		if (err)
			return console.log("error we couldn't save your new cat");
		// redirect to the list of users
		res.redirect('/cats');
	});
};

// deleting an inputted cat
exports.remove = function(req, res){
	// render list of cats to delete
	res.render('remove_cat', {title: 'Remove a Cat'});
};

exports.remove_post = function(req, res){
	// grab user-entered name and remove appropriate cat from db
	var toRemove = req.body.name;
	// NOTE TO SELF: Cat = the mongooseModel db
	Cat.remove({'name': toRemove}, function (err) {
		if (err)
			return console.log("error we couldn't delete your cat");
		res.redirect('/cats');
	});
};

exports.remove_oldest = function(req, res){
	// get the list of cats, sorted by age
	var cats = Cat.find({}).sort('age').exec(function (err, docs){
		if(err)
			console.error("error with getting cats", cats);
			return;
	});
	// remove last element of the array (ie. the oldest cat)
	var oldest_age = cats.pop().age;
	Cat.remove({'age': oldest_age}, function (err){
		if (err)
			return console.log("error, we couldn't delete your old cat");
		res.redirect('/cats');
	});
};






