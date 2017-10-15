const grpc = require('grpc');
const fs = require('fs');

const protoPath = require('path').join(__dirname, '../', 'protos');
console.log(protoPath);
const proto = grpc.load({root: protoPath, file: 'datagRPC.proto' });

//const url = "http://test-grpc.azurewebsites.net";
//const url = "localhost:3000"
const url = "40.74.239.112:3001";
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
        console.log('Requesting...');
        client.testMethod({ lines: JSON.parse(data) }, function(err, response) {
            if(err){
                console.log('ERRO: ', err);
            }else{
                console.log('Greeting:', response); 
            }
            console.log(response);
        });
        console.log("oi");
    });
   
  }
  
  main();
  