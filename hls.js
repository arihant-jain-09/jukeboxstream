const fs = require('fs');
const hls = require('hls-server');
module.exports = (server) => {
  new hls(server, {
    provider: {
      exists: (req, cb) => {
        const ext = req.url.split('.').pop();

        if (ext !== 'm3u8' && ext !== 'ts') {
          return cb(null, true);
        }
        console.log(req.url);
        fs.access(__dirname + req.url, fs.constants.F_OK, function (err) {
          if (err) {
            console.log('File not exist');
            return cb(null, false);
          }
          cb(null, true);
        });
      },
      getManifestStream: (req, cb) => {
        const stream = fs.createReadStream(__dirname + req.url);
        cb(null, stream);
      },
      getSegmentStream: (req, cb) => {
        const stream = fs.createReadStream(__dirname + req.url);
        cb(null, stream);
      },
    },
  });
};
