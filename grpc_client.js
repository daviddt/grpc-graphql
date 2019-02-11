const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
    './helloworld.proto',
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const ITERATIONS = 1000;
let current = 0;
const time = process.hrtime();

const helloWorldProto = grpc.loadPackageDefinition(packageDefinition).helloworld;

const client = new helloWorldProto.Greeter('localhost:50051', grpc.credentials.createInsecure());


const callServer = () => {
    client.sayHello({name: 'david'}, (err, response) => {
        current++;
        if (current < ITERATIONS) {
            callServer();
        } else {
            done();
        }
    });
}

console.log(callServer());

function done () {
    const diff = process.hrtime(time);
    console.log(`Benchmark took ${diff[0]} seconds and ${diff[1]} nanoseconds`);
}


