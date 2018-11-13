 
const sqlite3 = require('sqlite3').verbose();
 

//return the data
exports.getGames = function(callback) {   

    let db = createConnection();

    var games = [];    
    
    //query db
    let sql = "SELECT * FROM Games";
    db.all(sql, [], (err, rows) => {

        if (err) {          
          onErr(err, callback, db);
        }

        rows.forEach((row) => {    
          var currentGame = {};
          currentGame["Name"] = row.Name;
          currentGame["Price"] = row.Price;
          currentGame["Genre"] = row.Genre;
          games.push(currentGame);    
        });                

        closeDb(db);

        callback("", games);
    });
}; //end getGames

var closeDb = function(db) {
    //close db connection    
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Close the database connection.');
    });
};

var createConnection = function() {
    //create a connection to sqlite    
    let db = new sqlite3.Database('./model/test.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to SQLite file test.db!');
    });

    return db;
};

var onErr = function(err, callback, db) {  
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
  callback(err);
};