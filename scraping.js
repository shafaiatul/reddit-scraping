var request = require('request'),
	cheerio = require('cheerio'),
	fs = require('fs'),
	urls = [];


request('http://www.reddit.com/', function (err, res, body) {
	if(!err && res.statusCode ==  200) {
		var $ = cheerio.load(body);
		$('a.title', '#siteTable').each(function() {
			var url = $(this).attr('href');
			if(url.indexOf('i.imgur.com') !== -1){
				urls.push(url);
			}
		});
		console.log(urls);
		console.log(urls.length);
		//I will make additional request to the url I just saved to the urls array
		//once I get those urls from previous code, then I can write to the stream
		for (var i = 0; i < urls.length; i++) {
			request(urls[i]).pipe(fs.createWriteStream('img/' + i + '.jpg')); // readable stream = (urls[i]) 
		};
	}
})