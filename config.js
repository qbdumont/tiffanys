var config = {};

config.rowsInMatrix = 8;

config.columnsInMatrix = 4;

config.highPercentage = 60;
config.highPercentWinVid = "./assets/winner.mp4";

config.mediumPercentage = 60;
config.mediumPercentWinVid = "./assets/winner.mp4";

config.lowPercentage = 60;
config.lowPercentWinVid = "./assets/winner.mp4";

config.jackpotVideo = "./assets/winner.mp4";

config.prizes = [ {name: "Diamond Ring", asset: "/assets/winner.jpg", id:"diamond_ring"}, {name: "Diamond Necklace", asset: "/assets/winner.jpg", id:"diamond_necklace"},{name: "Watch", asset: "/assets/winner.jpg", id:"gold_watch"} ];

module.exports = config; 