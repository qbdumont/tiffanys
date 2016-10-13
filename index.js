var express = require('express');
var app = express();
var config = require('./config.js');
var bodyParser = require('body-parser')

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json())

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var matrixTotal = config.rowsInMatrix * config.columnsInMatrix;
var highPercentage = config.highPercentage;
var mediumPercentage = config.mediumPercentage;
var lowPercentage = config.lowPercentage;

var immediateWin = [];
app.post('/addWinner/', function(req, res) {
    console.log(req.body);
    immediateWin.push(req.body);
    res.send("done");
})


console.log(highPercentage, mediumPercentage, lowPercentage, config.prizes)
app.get('/rigSpecificTab', function(req, res) {
    res.render('pages/rig', {
        matrixTotal: matrixTotal, prizes: config.prizes
    })
})
app.get('/:index', function(request, response) {
    if (request.params.index > matrixTotal) {
        response.send("not in your matrix");
    } else {
        response.render('pages/individual-matrix', {
            index: request.params.index, prizes: config.prizes
        })
    }
});

app.post('/riggedOnlyWinner/', function(req, res) {
    if (immediateWin.length) {
        for (var i = 0; i < immediateWin.length; i++) {
          if(immediateWin[i].nextTouch){
                var results = [{
                    immediateWin: true,
                    prizeName: immediateWin[i].prizeName,
                    prizeAsset: immediateWin[i].prizeAsset,
                    id: immediateWin[i].id
                }]
                console.log(results)
                immediateWin.splice(i, 1);
                res.send(results);
          }
        }
    } else {
        var results = [{
            immediateWin: false,
            prizeName: null,
            prizeAsset: null,
            id: null
        }]
        res.send(results)
    }
})

//app.post('/winner/:index', function(req, res) {
//    console.log(req.params.index)
//    if (immediateWin.length) {
//        for (var i = 0; i < immediateWin.length; i++) {
//            console.log("immediate win", immediateWin[i].nextTouch)
//            if (immediateWin[i].nextTouch === true){
//                var results = [{
//                    immediateWin: true,
//                    prizeName: immediateWin[i].prizeName,
//                    prizeAsset: immediateWin[i].prizeAsset,
//                    id: immediateWin[i].id
//                }]
//                                                console.log(results)
//
//                immediateWin.splice(i, 1);
//                    res.send(results);
//            }
//            else if (req.params.index === immediateWin[i].tablet && immediateWin[i].nextTouch !== true) {
//                var results = [{
//                    immediateWin: true,
//                    prizeName: immediateWin[i].prizeName,
//                    prizeAsset: immediateWin[i].prizeAsset,
//                    id: immediateWin[i].id
//                }]
//                                console.log(results)
//
//                immediateWin.splice(i, 1);
//                    res.send(results);
//
//            } else if (immediateWin[i].nextTouch !== true) {
//                      var r = Math.floor((Math.random() * 100) + 1);
//        console.log(r <= highPercentage, r <= mediumPercentage, r <= lowPercentage, "test", immediateWin);
//
//        var results = [{
//            immediateWin: false,
//            highPercentagePrize: r <= highPercentage,
//            winnerVideo: config.highPercentWinVid
//        }, {
//            immediateWin: false,
//            mediumPercentagePrize: r <= mediumPercentage,
//            winnerVideo: config.mediumPercentWinVid
//        }, {
//            immediateWin: false,
//            lowPercentagePrize: r <= lowPercentage,
//            winnerVideo: config.lowPercentWinVid
//        }]
//            res.send(results);  
//            }
//        }
//    } else {
//        var r = Math.floor((Math.random() * 100) + 1);
//        console.log(r <= highPercentage, r <= mediumPercentage, r <= lowPercentage, "test", immediateWin);
//
//        var results = [{
//            immediateWin: false,
//            highPercentagePrize: r <= highPercentage,
//            winnerVideo: config.highPercentWinVid
//        }, {
//            immediateWin: false,
//            mediumPercentagePrize: r <= mediumPercentage,
//            winnerVideo: config.mediumPercentWinVid
//        }, {
//            immediateWin: false,
//            lowPercentagePrize: r <= lowPercentage,
//            winnerVideo: config.lowPercentWinVid
//        }]
//            res.send(results);
//    }
//})


app.get('/', function(request, response) {
    response.render('pages/index');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});