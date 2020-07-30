const express = require('express');
const path = require('path');
const app = express();
 
const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
};
app.use(express.static('/dist/secret-box'));
 
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname,'/dist/secret-box/index.html'));
});
 
app.use(forceSSL());
 
app.listen(process.env.PORT || 8080);