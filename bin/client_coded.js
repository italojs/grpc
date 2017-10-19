const grpc = require('grpc');
const fs = require('fs');

const protoPath = require('path').join(__dirname, '../', 'protos');
console.log(protoPath);
const proto = grpc.load({root: protoPath, file: 'datagRPC.proto' });

const url = "http://test-grpc.southcentralus.cloudapp.azure.com:80";
//const url = "localhost:3001";
//const url = "40.74.239.112:80";
const client = new proto.testgRPC.TestService(url, grpc.credentials.createInsecure());

function main() {  

    fs.readFile('../data-to-test.min.json', 'utf8', function (err,data) {
        if (err) {
            console.log("ERRO: ", err);
        }
        if(data.length > 0){
            console.log('has lines');
            //console.log(data);
        }
        console.log('Requesting ',url);
        client.testMethod({ lines: JSON.parse(data) }, function(err, response) {
            if(err){
                console.log('ERRO: ', err);
            }else{
                console.log('Greeting:', response); 
            }
            console.log('response: ', response);
        });
        console.log("finish.");
    });
   
  }
  
  main();
  