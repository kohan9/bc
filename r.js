//(c) 2018. KoolJ@TesterPRO.org


var urlapi = "http://localhost/api.php/";
var urlall = urlapi+"retail2";
var prodtable = "retail2";
var usertable = "retact";
var getid = "1";
var currentid = "";
var imgvar = "";
var namevar = "";
var pricevar = "";
var ethvar = "";
var ownernamevar = "";
var urlsimp = urlapi + prodtable + "/" + getid;
var html_product = "";
var mydata = [];


//get list book
async function listbooks(_url, _methodstr, _token) {
    fetch(_url, {
        method: _methodstr})
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            mydata = data;

            for (let i = 0, p = Promise.resolve(); i < data.length; i++)
            {
                p = p.then(_ => new Promise(resolve =>
                setTimeout(function () {
                    //console.log("-----------------------------"+i);
                    console.log(mydata[i]);
                    currentid = mydata[i].idt;
                    imgvar = mydata[i].img;
                    namevar = mydata[i].tit;
                    pricevar = mydata[i].pri;
                    ethvar = mydata[i].eth;

                    //get owner
                    urlsimp = urlapi + "retact/" + mydata[i].ido;
                    fetch(urlsimp, {
                        method: 'GET'})
                        .then(function(response) {
                            return response.json();
                        })
                        .then(function(data) {
                            console.log(data);
                            ownernamevar = data.usn;
                            html_product = '<div class="col-xs-12 col-md-6 bootstrap snippets">\
                                            <div class="product-content product-wrap clearfix">\
                                                <div class="row">\
                                                    <div class="col-md-5 col-sm-12 col-xs-12">\
                                                        <div class="product-image">\
                                                            <img src="' +  imgvar + '" class="img-responsive">\
                                                            <p class="price-container">\
                                                                <p> $' + pricevar + '</p>\
                                                                <p> ether&nbsp;:' + ethvar + '</p>\
                                                            </p>\
                                                            <span class="tag1"></span>\
                                                        </div>\
                                                        <div class="description">\
                                                            <a href="#">' +  namevar + ' </a>\
                                                            <p>Sách mới, chất lượng cao. </p>\
                                                            <p>Owner&nbsp;: ' +  ownernamevar + '</p>\
                                                        </div>\
                                                        <div class="product-info smart-form">\
                                                            <div class="row">\
                                                                <div class="col-md-6 col-sm-6 col-xs-6">\
                                                                    <a href="javascript:buythis(' + currentid + ');" class="btn btn-success">Mua sách này</a>\
                                                                </div>\
                                                                <div class="col-md-6 col-sm-6 col-xs-6">\
                                                                </div>\
                                                            </div>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                             </div>\
                                             </div>';
                        });

                resolve();

                //append info
                $(".container").append(html_product);
                }, Math.random() * 1000)
                ));

            }
        });
}

//choose thels book
function ownerthis(_idvar) {
    fetch(_idvar, {
        method: 'GET'})
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            return data.usn;
        });
}

//choose thels book
function buythis(_idvar) {
    fetch(urlall + "/"+ _idvar, {
        method: 'GET'})
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

        });
}

//first run
$(document).ready(function () {
  listbooks(urlall, "GET", "getall");

  var sampleContractABI = ([{"constant": false,
		"inputs": [],
		"name": "getAge",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "getName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newAge",
				"type": "uint256"
			}
		],
		"name": "setAge",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newName",
				"type": "string"
			}
		],
		"name": "setName",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]);

  web3.eth.defaultAccount = web3.eth.accounts[0];
  var sampleContract = web3.eth.contract(sampleContractABI);
  var sampleContractInstance = sampleContract.at("0x063fc656bdf2623b9c80874a2e0ccb701d7ce913");
  console.log(sampleContractInstance);

  var balance = web3.eth.getBalance("0xee409df19983cb7a925eb6df2c7b836197a0f6fb");
  console.log(balance.toNumber()+ " Wei");
  $('#myname').append(balance.toNumber()+ " Wei");
  var value1 = sampleContractInstance.getName();
  console.log(value1.toString(10));
  var value2 = sampleContractInstance.getAge();
  console.log(value2.toString(10));
  console.log(web3.utils.hexToUtf8(value2));
  console.log(web3.utils.hexToString(value1));



  var value3 = BigNumber('0x07373cd7246e7e5ebb065bdb47c322e665844f125f8a2efe9d98f6e46ffafd8e')
  console.log(value3);
  var value4 = BigNumber('0xa3c52f5e4d12c8175ea3607c40912a750d48198118092b1ed58d23bdb6e9734e')
  console.log(value4);

/*
  var fromAccount = "0x67d7f6426c101f613084ec2b9c5759d1ccd8e7ce";
  var gasLimit = "0X124F80";
  var gasPriceInWei = "0x9184e72a000";
  //"from": "0xdfe946187a7a74eb796afecde0311337221ec929",
  //"gas": "0X124F80",
  //"gasPrice": "0x9184e72a000",

  const transactionObject = {
    from: fromAccount,
    gas: gasLimit,
    gasPrice: gasPriceInWei
  };

9
sampleContractInstance.sendTransaction(name, transactionObject, (error, result) => {
    console.log(result);
    $('#myname').append(result);
});

var coinbase = web3.eth.coinbase;
var balance = web3.eth.getBalance(coinbase);

var myname = sampleContractInstance.name(); //web3.eth.name();
var myether = sampleContractInstance.totalsupply(); //web3.eth.totalsupply();
$('#myname').append(coinbase);
$('#myname').append(balance);

  try {
    //var mysym = sampleContractInstance.symbol().plus(21).toString(10);
    //var myname = sampleContractInstance.name().plus(21).toString(10);

    $('#myname').append("Hi KoolJ!");
    //$('#myname').append(mysym);
    //$('#myname').append(myname);
   document.getElementById("myname").innerHTML =  "KJ ETH";
    web3.eth.getBalance(fromAccount, function (error, wei) {
        if (!error) {
            //var balance = new BigNumber();
            var balance = web3.fromWei(wei, 'ether').toString(10)+"";

            $('#myname').append(balance.toString(10));
            //document.getElementById("myname").innerHTML =  "KJ ETH";
        }
    });



  } catch (err) {
    document.getElementById("myname").innerHTML = err;
  }
*/

});
/*
$(“#blockchain button.set”).click(function() {
    var value = $(“#blockchain input.text”).val();
    var params = {
            gas: 40000,
            from:
        };
    SimpleStorage.sendTransaction.set(value, params);
});

$(“#blockchain button.get”).click(function() {
    var value = SimpleStorage.get.call();
    $(“#blockchain .value”).html(value);
});

*/
