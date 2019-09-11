// берём Express
//var express = require('express');

// создаём Express-приложение
//var app = express();


//app.use(express.static(__dirname));
// создаём маршрут для главной страницы
// http://localhost:8080/
//app.get('/', function(req, res) {
//  res.sendFile('index.html');
//});

// запускаем сервер на порту 8080
//app.listen(8080);
// отправляем сообщение
//console.log('Сервер стартовал!');

var express = require('express'),
    app = express(),
    http = require("http").Server(app).listen(8080),
    upload = require("express-fileupload");
    mysql = require("mysql");
app.use(upload());

console.log("Server start");
const connection = mysql.createConnection({
  host: "localhost",
  user: "nodejs",
  database: "video",
  password: "1234"
});

getVideos();
let htmlVideos = '';

app.get("/", function(req, res) {
  res.sendFile(__dirname+'/index.html');
})

app.post("/video", function(req, res) {
  res.send(htmlVideos);
})

app.post("/", function(req, res) {
  if(req.files) {
    var file = req.files.filename;
    //file.name - перменная имени файла
    //file.data - значение файла в закодированном виде (юольшой размер)
    file.mv(setVideo(file.data), function(err) {
        err ? res.send("error: " + err) : res.send("Done");
    })
  }
})

function getVideos() {
  connection.connect(function(err) {
    err ? console.log("Ошибка: " + err.message) : console.log("Подключение к серверу MySQL успешно установлено");
    
    count = 2;
    for(i = 1; i <= count; i++) {
        //Изменить SELECT чтоб вытаскивал дату и имя
        sql = `SELECT http FROM video where id = `+i;
        connection.query(sql, function(err, results) {
          if(err) console.log(err);
          //Изменить вставку, будет что то типа ... <video>Данные видео</video> Имя видео </div>
          htmlVideos += "<div class=\"col\"><video><source src=\""+results[0].http+"\"></video></div>"
        });
    }
    connection.end();
  });
}

function setVideo(file) {
  connection.connect(function(err) {
    err ? console.log("Ошибка: " + err.message) : console.log("Подключение к серверу MySQL успешно установлено");
    //Закодировать или сжать данные видо и засунуть в бд, чтоб он туда поместиля и не выавал ошибок
    //Должно быть что то типа INSERT INTO video (name, data) VALUES (`+file.name+`,`+file.data+`);`
    //Советую создать новую таблицу, называтся она естестно должна по другому, типа videos хех...
    sql = `INSERT INTO video (http) VALUES (`+file+`);`;
    connection.query(sql, function(err, results) {
      if(err) console.log(err);
    });
    connection.end();
  });
}