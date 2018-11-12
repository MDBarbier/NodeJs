 
const sqlite3 = require('sqlite3').verbose();

//create db object
let db = new sqlite3.Database('./model/test.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to SQLite file test.db!');
  });
  
  var games = [];
  
//query db
let sql = "SELECT * FROM Games";
db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {    
    var currentGame = {};
    currentGame["Name"] = row.Name;
    currentGame["Price"] = row.Price;
    currentGame["Genre"] = row.Genre;
    games.push(currentGame);    
  });
  console.log(games);
});

//return the data
exports.getGames = function() {
    return games;
}

  
//close db connection
db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });