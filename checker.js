var http = require('http')

http.get('http://localhost:3000/signup', function (response) {
  response.setEncoding('utf8')
  response.on('data', console.log)
  response.on('error', console.error)
})
/*
http.post('http://localhost:3000/', function (response) {
  response.setEncoding('utf8')
  response.on('data', console.log)
  response.on('error', console.error)
})*/
