const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');

const server = new grpc.Server();

const packageDefinition = protoLoader.loadSync(
    './helloworld.proto',
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);

const helloWorldProto = grpc.loadPackageDefinition(packageDefinition).helloworld;

const response = {
    message: 'hello',
}

function sayHello(call, callback) {
    callback(null, response)
}

server.addService(helloWorldProto.Greeter.service, {
    sayHello
});

server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();

console.log('🚀 GRPC server started');