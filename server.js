var TwitterStream = require('twitter-stream-api'),
fs = require('fs');

var keys = {
consumer_key : "gwQPYqh2LxJZ1HJMwRe5ttUYA",
consumer_secret : "VBjpoIuWK8lX3sojGzXyJmQM2kOmhJqhzz7W8uDmfKgl1daVm8",
token : "879908468143996928-aDIxvbqTqI8l9LtmD3Ynrz97C8pPhOX",
token_secret : "MJcDD9ffMz7T966sFsyad9YF7kowESoyMyf9zV8AIrzb2"
};

var Twitter = new TwitterStream(keys, false);
Twitter.stream('statuses/filter', {
track: '#thisisathingnow'
});

var parseLatestText = function() {
    fs.readFile('tweets.json', function read(err, data) {
        if (err) {
            throw err;
        }
        dataarr = String(data).split("}{");
        if (dataarr.length > 1) {
            dataarr[dataarr.length - 1] = "{" + dataarr[dataarr.length - 1];
        }
        var obj = JSON.parse(dataarr[dataarr.length - 1]);
        console.log(obj.text);
    });
}

fs.truncate('tweets.json', 0, function(){console.log('done')})

Twitter.on('connection success', function (uri) {
    console.log('connection success', uri);
});

Twitter.on('connection aborted', function () {
    console.log('connection aborted');
});

Twitter.on('connection error network', function (error) {
    console.log('connection error network', error);
});

Twitter.on('data', function (obj) {
    parseLatestText();
});

Twitter.pipe(fs.createWriteStream('tweets.json'));