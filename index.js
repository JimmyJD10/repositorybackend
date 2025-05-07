const http= require('http')

function requestController(){
    console.log('Bienvenidos al curso')
}

const server=http.createServer(requestController)

server.listen(4000)