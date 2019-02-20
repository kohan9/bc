//(c) 2018. KoolJ@TesterPRO.org


var urlapi = "http://192.168.1.130/api.php/";
var urlall = urlapi+"retail2";
var gettable = "retail2";
var getid = "1";
var currentid = "";
var imgvar = "";
var namevar = "";
var pricevar = "";
var ethvar = "";
var ownernamevar = "";
var urlsimp = urlapi + gettable + "/" + getid;
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
                    console.log("-----------------------------"+i);
                    console.log(mydata[i]);
                    currentid = mydata[i].idt;
                    imgvar = mydata[i].img;
                    namevar = mydata[i].tit;
                    pricevar = mydata[i].pri;
                    ethvar = mydata[i].eth;

                    //get owner
                    urlsimp = urlapi + "/retact/" + mydata[i].ido;
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

var sampleContractABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "atransfer",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
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
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
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
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferfrom",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "remaining",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_addr",
                "type": "address"
            }
        ],
        "name": "balanceof",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalsupply",
        "outputs": [
            {
                "name": "_totalsupply",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

var sampleContract = web3.eth.contract(sampleContractABI);
var sampleContractInstance = sampleContract.at("0xaa46d529358243c59ea4c193faf0141cd7360353");

var fromAccount = "0xdfe946187a7a74eb796afecde0311337221ec929";
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

/*
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
*/
try {
    var mysym = sampleContractInstance.symbol();
    var myname = sampleContractInstance.name();
    //var mybala = sampleContractInstance.balanceof(fromAccount);
    //var mysupply = sampleContractInstance.totalsupply.call();
    //const purchaseStruct = await databroker.balanceof.call(step, { from: window.web3.eth.accounts[0] })

    $('#myname').append(mysym);
    $('#myname').append(myname);
    //$('#myname').append(mybala);
    //$('#myname').append(mysupply);
    /*
    sampleContractInstance.sendTransaction('totalsupply', transactionObject, (error, result) => {
        if (!error) {
            console.log(result);
            $('#myname').append(result);
        }
    });
    */

    web3.eth.getBalance(fromAccount, function (error, wei) {
        if (!error) {
            var balance = web3.fromWei(wei, 'ether')+"";
            $('#myname').append(balance.toString());
            document.getElementById("myname").innerHTML = balance + " ETH";
        }
    });



} catch (err) {
    document.getElementById("myname").innerHTML = err;
}


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
