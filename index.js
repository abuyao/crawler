var Crawler = require("crawler");
var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log(res);
        }
        done();
    }
});

c.queue([{
    html: '<p>This is a <strong>test</strong></p>'
}]);