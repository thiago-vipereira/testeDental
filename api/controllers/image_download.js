var fs = require('fs'),
request = require('request'),
path = require('path');

function download (filename, callback) {
  request.head(filename, (err, res, body) => {
    var dir = __dirname.split('\\');
    dir.splice(dir.length-1, 1);
    dir.splice(dir.length-1, 1);
    request(dir.join('\\')+"/upload_image/"+filename+".jpg").pipe(fs.createWriteStream("/api/image/"+filename)).on('close', callback)
  });
};

module.exports = download;