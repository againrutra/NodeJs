const mysql = require("./node_modules/mysql");

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
    
    count = 2;
    for(i = 1; i < count; i++) {
        result = getVideo(i);
        val = "<video><source src=\""+result+"\"></video>"
        $("#videos").val(val);
    }
});

function getVideo(id) {
  const sql = `SELECT http FROM video where id = `+id;

  return connection.query(sql, function(err, results) {
    if(err) console.log(err);
    return results;
  });
}