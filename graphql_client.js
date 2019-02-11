const request = require("request");

const ITERATIONS = 1000;
let current = 0;
const time = process.hrtime();

const callServer = () => {
    request.post({
        headers: {'Content-Type' : 'application/json'},
        url:     'http://localhost:1234',
        body:    '{"query": "{ data { message } }" }'
    }, function(error, response, body){
        current++;
        if (current < ITERATIONS) {
            callServer();
        } else {
            done();
        }
    });
}

callServer()

function done () {
    const diff = process.hrtime(time);
    console.log(`Benchmark took ${diff[0]} seconds and ${diff[1]} nanoseconds`);
}