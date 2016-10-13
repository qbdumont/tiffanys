var config = {};

config.rowsInMatrix = 3;

config.columnsInMatrix = 3;

config.highPercentage = 60;
config.highPercentWinVid = "./assets/winner.mp4";

config.mediumPercentage = 60;
config.mediumPercentWinVid = "./assets/winner.mp4";

config.lowPercentage = 60;
config.lowPercentWinVid = "./assets/winner.mp4";

config.jackpotVideo = "./assets/winner.mp4";

config.prizes = [ {name: "Diamond Ring", asset: "/assets/prizes/ring.mp4", id:"diamond_ring"}, {name: "Diamond Necklace", asset: "/assets/prizes/necklace.mp4", id:"diamond_necklace"},{name: "Watch", asset: "/assets/prizes/watch.mp4", id:"gold_watch"} ];

module.exports = config; 