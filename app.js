//INSTALL NPM'S
const express		= require("express"),
	  bodyParser	= require("body-parser"),
	  fs			= require("fs"),
	  BitlyClient 	= require('bitly').BitlyClient,
	  bitly 		= new BitlyClient('b31d0dbb14ef6b899b33ab6006a56aaad5a47a8f'),
	  app= express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));


//ROUTES
app.get("/", (req, res)=>{
	res.redirect("/url/new");
});

app.get("/url/new", (req, res)=>{
	res.render("home");
});

app.post("/url", (req, res)=>{
	bitly
	  .shorten(req.body.url)
	  .then(function(result) {
		res.render("show", {result:result});
		console.log(result);
		
		timeStamp= new Date().toLocaleString();
		try {
		  fs.appendFileSync("./tmp/logs.txt", timeStamp+"-\t"+req.body.url+" \t"+result.url+"\n");
		  console.log('The "data to append" was appended to file!');
		} catch (err) {
		  console.log(err);
		}
	  })
	  .catch(function(error) {
		console.error(error);
	  });
});

app.get("/url", (req, res)=>{
	res.render("show");
});

app.listen(3000, ()=>{
	console.log("Yelp Camp app has started!");
});