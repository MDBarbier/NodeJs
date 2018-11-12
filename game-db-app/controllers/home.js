//require statements
var template = require('../views/template-main'); 
var sqlitedal = require('../model/sqlite-dal');


exports.get = function(req, res) {  

  //this is firing to quickly need to put it in a callback which only fires when the query is complete
  var games = sqlitedal.getGames();
  console.log("Got games:");
  console.log(games);
  
    console.log("Writing the HTML page using template...");
    res.write(template.build("Test web page on node.js", "Games I like", "<p>The Games I have been playing recently are: "));  
    res.end();
};