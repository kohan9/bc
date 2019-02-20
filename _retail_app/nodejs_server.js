const restify = require('restify');
//require plugins
require('restify').plugins;

//config arrango db
/*
var arangojs = require("arangojs");
const aqlQuery = arangojs.aqlQuery;
const db = new arangojs.Database('http://<your ip>');
db.useDatabase("abc");
db.useBasicAuth("dev", "xyz");
const V = db.collection('v');
const E = db.edgeCollection('e');
const Backups = db.collection('backups');
*/

//config log
var bunyan = require('bunyan');
var requestcount = 0;
var currentrequest = "";

//config cpu stats
var cpus = require('cpus');

//anti DDOS: config anti-ddos
//var Ddos = require('ddos');
//var ddos = new Ddos({burst:100,limit:4,testmode:true,whitelist:['10.11.11.182']});;

//create log
var log = bunyan.createLogger({
    name: 'log',
    streams: [{
    	type: 'rotating-file',
        path: './svrlogs/daily.log',
        period: '1d',   // daily rotation
        count: 3,        // keep 3 back copies
        level: 'trace'
    }]
});
log.on('error', function (err, stream) {
    // Handle stream write or create error here.
    console.log("Got error on log.... \n" + err + "\n On streaming log of: " + stream);
});

//create server
const server = restify.createServer({
    name: 'extension-server',
    version: '1.0.0',
    handleUncaughtExceptions: true
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());


//anti DDOS: limit request
//server.use(ddos);
server.use(restify.plugins.throttle({
  burst: 100,
  rate: 50,
  ip: true
}));
var rateLimit = restify.plugins.throttle({burst:100,rate:50,ip:true});

//counting request
var reqvar = "";
var reqip = "";
const requestIp = require('request-ip');
var randomnum = Math.floor(Math.random() * 100000000);
var currentip = "";
var clientIp = "";
//connect db sample
//var db2 = new arangojs.Database('http://10.11.11.182');
//db2.useDatabase("fb2phone");
////var mydb = db2.collection("testload");
//counting req func & state the memory
var starttime = 1;
var endtime = 1;
function reqcount(req){
	//rateLimit = restify.plugins.throttle({burst:100,rate:50,ip:true});

	var reqvarfirst = req.url;
    randomnum = Math.floor(Math.random() * 100000000);

	//get ip
	clientIp = requestIp.getClientIp(req); 
	reqip = req.headers['x-forwarded-for'] + "#" + req.connection.remoteAddress + "#" + req.ip + "#"+ clientIp;

	//get memory used
	var usedmem = process.memoryUsage().heapUsed / 1024 / 1024;
	//log.info(usedmem);
	var cpumem = cpus();
	if (usedmem > 15)
    {		
		usedmem = process.memoryUsage();
		var memstat = "WARNING: The script uses: ";
		for (key in usedmem) {
		  memstat = memstat +  `${key} ${Math.round(usedmem[key] / 1024 / 1024 * 100) / 100} MB --- `;
		  //log.info(`WARNING: The script uses: ${key} ${Math.round(usedmem[key] / 1024 / 1024 * 100) / 100} MB`);
		}
		memstat = memstat +  `${cpumem[0].model}; CPU current speed: ${cpumem[0].speed}; CPUusertime: ${cpumem[0].times.user}; CPUsystem time: ${cpumem[0].times.user}`;
	}

	if (requestcount == 0)
	{	
		starttime = Date.now();
		log.info("Comming new request....: "+ reqvarfirst + " --- at IP: "+ clientIp);
	}	
	if (currentrequest == reqvarfirst )
	{		
		endtime = Date.now() - starttime;
		if ( Math.floor(endtime/1000) < 15)
			requestcount++;
		//log.info(requestcount + " Elapsed: " +  Math.round(endtime - starttime));
	}
	else
	{		
		currentrequest = reqvarfirst;
	    log.info("TOTAL counts for request....: "+ reqvar + " --- #call: " + requestcount + " --- from IP: " + currentip + " --- " + memstat);
	    //res.send({ server_message: requestcount.toString() });
	    requestcount = 0;
	}  

	if (requestcount == 10) 
		log.info("WARNING: Above 10 hits, counts for request....: "+ reqvarfirst + " --- #call: " + requestcount + " --- from IP: " + reqip + " --- " + memstat);

	if (requestcount == 30)  
		log.info("WARNING: Above 30 hits, counts for request....: "+ reqvarfirst + " --- #call: " + requestcount + " --- from IP: " + reqip + " --- " + memstat);
	if (requestcount == 100)  
		log.info("WARNING: Above 100 hits, counts for request....: "+ reqvarfirst + " --- #call: " + requestcount + " --- from IP: " + reqip + " --- " + memstat);
	if (requestcount > 1000)  
		log.info("STOPPPPPP: Above 1000 hits, counts for request....: "+ reqvarfirst + " --- #call: " + requestcount + " --- from IP: " + reqip + " --- " + memstat);

	reqvar = req.url;
	currentip = reqip;
}

//handling internal error
function onerrorcb(err){
	log.info('Found INTERNAL ERROR: ');
	log.trace(err.stack);
}
server.on('InternalServer', function(req, res, err, onerrorcb) {
  err.handled = true;
  return onerrorcb();
});
server.on('restifyError', function(req, res, err, onerrorcb) {
	if (!err.handled) {
    	log.info(err.stack);
  }
  return onerrorcb();
});

//test some GETs
server.get('/', rateLimit, function (req, res, next) {
    reqcount(req);
    res.send('A KoolJ đẹp zoai !!! Tổng số lần khen trước đó: '+ requestcount);
    //if (requestcount > 50)
    	//res.send("Your IP " + clientIp + " is blocked!!!");
    return next();
});



server.listen(8181, function () {
    console.log('%s listening at %s', server.name, server.url);
});
