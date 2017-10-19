const grpc = require('grpc');

const PROTO_PATH = require('path').join(__dirname, '../', 'protos/datagRPC.proto');

const test_proto = grpc.load(PROTO_PATH).testgRPC;

function processLines(data) {
  console.dir(data);

  let count = 0;
  if(data.lines != "undefined"){
      data.lines.forEach(function(element) {
          count++;
      }, this);
  }
  else{
      count = 0;
  }
  
  DataResponse = {
    message: count + " lines received!"
  };
  return DataResponse;
}

function testMethod(call, callback) {
  callback(null, processLines(call.request));
}

function main() {
  var server = new grpc.Server();
  server.addProtoService(test_proto.TestService.service,
                         {testMethod: testMethod});

  let serverUrl = '0.0.0.0:80'
  server.bind(serverUrl, grpc.ServerCredentials.createInsecure());
  server.start();
  console.log("Server running at port " + serverUrl)
}

main();


