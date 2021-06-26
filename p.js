//(c) 2018. KoolJ@TesterPRO.org
// COng hoa
//set the backend api
var urlapi = "http://192.168.1.130/api.php/";
var urlall = urlapi+"retail2";
var prodtable = "retail2";
var usertable = "retact";

//when page is ready
$(document).ready(function () {
//define RSA
var PassPhrase = "my passwords";
var Bits = 512;
//$("#profile").append("My passphrase: " + PassPhrase + "<br>");
var MyRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);
var MyPublicKeyString = cryptico.publicKeyString(MyRSAkey);   

//$("#profile").append("My public key string: " + MyPublicKeyString + "<br>");

//RSA encrypt
function enrsa(input, pubkey){
  var output = "";
  $("#profile").append( "The message: " + input + "<br>");
  EncryptionResult = cryptico.encrypt(input, pubkey);
  $("#profile").append("The encrypted message:" + EncryptionResult.cipher + "<br>");
  output = EncryptionResult.cipher;
  return output;
}

//RSA decrypt
function dersa(input){
  var output = "";
  var DecryptionResult = cryptico.decrypt(input, MyRSAkey);  
  $("#profile").append("The decrypted message: " + DecryptionResult.plaintext);
  //print("DecryptionResult.signature: " + DecryptionResult.signature);
  output = DecryptionResult.plaintext;
  return output;      
}

//init contract abi
var getagenameContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"getName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAge","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newName","type":"string"}],"name":"setName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newAge","type":"uint256"}],"name":"setAge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"nameVar","type":"string"}],"name":"logsetname","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"ageVar","type":"uint256"}],"name":"logsetage","type":"event"}]);

//create a contract
var getagename = getagenameContract.new(
   {
     from: web3.eth.accounts[0], 
     data: '0x608060405234801561001057600080fd5b50610494806100206000396000f300608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806317d7de7c14610067578063967e6e65146100f7578063c47f002714610122578063d5dcf1271461018b575b600080fd5b34801561007357600080fd5b5061007c6101b8565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100bc5780820151818401526020810190506100a1565b50505050905090810190601f1680156100e95780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561010357600080fd5b5061010c61025a565b6040518082815260200191505060405180910390f35b34801561012e57600080fd5b50610189600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610264565b005b34801561019757600080fd5b506101b66004803603810190808035906020019092919050505061034e565b005b606060008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102505780601f1061022557610100808354040283529160200191610250565b820191906000526020600020905b81548152906001019060200180831161023357829003601f168201915b5050505050905090565b6000600154905090565b806000908051906020019061027a9291906103c3565b507f8ee8f6eaa09526d3d21e6a4c2589e63b655ebc1378cd55cad75b3701926aed773382604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825283818151815260200191508051906020019080838360005b838110156103105780820151818401526020810190506102f5565b50505050905090810190601f16801561033d5780820380516001836020036101000a031916815260200191505b50935050505060405180910390a150565b806001819055507fe7ec2b84a5f1ef77643cab63c0810d657f20f3b605b458c0ff2aa99f59b8d6773382604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a150565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061040457805160ff1916838001178555610432565b82800160010185558215610432579182015b82811115610431578251825591602001919060010190610416565b5b50905061043f9190610443565b5090565b61046591905b80821115610461576000816000905550600101610449565b5090565b905600a165627a7a723058208ca5b1f8bae807c12e28fafe712b708ff819a1a5c1138981f9cb1b4e70d216de0029', 
     gas: '4700000'
   }, function (e, contract){
    $('#mywei').html("Creating contract....")
    $("#loader").show();
    if (typeof contract.address !== 'undefined') {
      $("#loader").hide();
      //view just-created contract
      console.log(contract);

      //get Wei
      var acct = web3.eth.accounts[0];
      var balance = web3.eth.getBalance(acct);
      console.log(balance.toString(10)+ " Wei");
      $('#mywei').append(balance.toString(10)+ " Wei" + "<br />");

      //define transaction fee
      var fromAccount = acct;
      var contractadd = contract.address;
      var gasLimit = "0x1255F0";
      var gasPriceInWei = "0x322a000";
      const transactionObject = {
        from: acct,
        gas: gasLimit,
        gasPrice: gasPriceInWei,
        address: contractadd
      };

      //log event getName
      var event1 = contract.logsetage({}, {fromBlock: 0, toBlock: 'latest'});

      //log event getName
      var event2 = contract.logsetname({}, {fromBlock: 0, toBlock: 'latest'});

    
      //define clicking button
      $("#updateperson").click(function(){
        //show loader & empty the appended results
        var input1 = enrsa($("#name").val().toString(), MyPublicKeyString).toString();
        $("#loader").show();

        //start to watch events
        event1.watch(function(error, logs){
          console.log("SET AGE WATCH: -------" + "\n" + logs);
        });
        event2.watch(function(error, logs){
          if(!error)
          {
            console.log("SET NAME WATCH: -------" + "\n" + JSON.stringify(logs));
            //$("#profile").append(logs.args.nameVar);
            $("#loader").hide();
            dersa(logs.args.nameVar);
          }  
        });

        //call setName
        contract.setName.sendTransaction(input1 ,transactionObject, function(error, result){
          if(!error) { 
            console.log('setname hash: ' + JSON.stringify(result));

            //simulate getName for 3 seconds
            //setTimeout (function(){  
              
            //}, 3000);

          }else{
            console.log('err on SET: ---------------------' );
            console.log(error);
          } 

        }); //setName

      }); //click update button
    } //if it has address
 }); //func contract

}); //document ready
