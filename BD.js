const mysql = require("mysql");
  
const connection = mysql.createConnection({
  host: "localhost",
  user: "nodejs",
  database: "video",
  password: "1234"
});


 connection.connect(function(err){
    if (err) {
      return console.error("Ошибка: " + err.message);
    }
    else{
      console.log("Подключение к серверу MySQL успешно установлено");
    }
    
    const sql = `SELECT * FROM video`;
 
    connection.query(sql, function(err, results) {
    if(err) console.log(err);
    console.log(results);

  });
 });