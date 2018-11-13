//require statements
var template = require('../views/template-main'); 
var sqlitedal = require('../model/sqlite-dal');


exports.get = function(req, res) {  
  
  sqlitedal.getGames(function (err, games) {

    console.log("in call back");
    if (!err)
    {
      var html = "<p>The Games I have been playing recently are: ";
      html += "<ul>";

      games.forEach(game  => {
        html += "<li>" + game.Name + "</li>";
      });
      
      html += "</ul>";

      console.log("Got games:");
      console.log(games);
      console.log("Writing the HTML page using template...");
      res.write(template.build("Test web page on node.js", "Games I like", html));        
      res.end();
    }
    else {
      console.log("DB error!");
      res.write(template.build("There was an error connecting to the db"));
      res.end();
    }
  });
  
    
};