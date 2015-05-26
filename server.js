var express = require('express'),
api         = require('./api'),
app         = express();

app
    .use(express.static('./public'))
    .use('/api',api)
    .get('*', function(req, res) {
        res.sendFile(__dirname+'/public/main.html');
    })
    .listen(3000);
    console.log("服务器将在3000端口启动...");
