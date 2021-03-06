//INSTALL NPM'S
const express		= require("express"),
	  bodyParser	= require("body-parser"),
	  fs		= require("fs"),
	  BitlyClient 	= require('bitly').BitlyClient,
	  bitly 	= new BitlyClient(process.env.BITLYKEY),
	  app= express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

//ROUTES
app.get("/", (req, res)=>{
	res.redirect("/url/new");
});

app.get("/url/new", (req, res)=>{
	res.render("new");
});

app.post("/url", (req, res)=>{
	
	//Here goes Bitly API works
	bitly
	  .shorten(req.body.url)
	  .then(function(result) {
		res.render("show", {result:result});
		console.log(result);
		let timeStamp= new Date().toLocaleString();
		
		// LOG TO FILE LOG.TXT
		try {
		  	fs.appendFileSync("./tmp/logs.txt", timeStamp+"-\t"+req.body.url+" \t"+result.url+"\n");
		  	console.log("Logged");
		} catch (err) {
		  	console.log(err);
		}
	  })
	  .catch(function(error) {
		console.error(error);
	  });
});

//SHOW CREATED BITLY LINK
app.get("/url", (req, res)=>{
	res.render("show");
});

app.listen(3000, ()=>{
	console.log("The app has started!");
});
