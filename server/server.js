const Koa = require("koa") //gerencia requisiçoes
const http = require("http")

const socket = require("socket.io")

const app = new Koa()

//retorna um metodo para lidar com requisiçoes
const server = http.createServer(app.callback())

//o socket vai ouvir o server
const io = socket(server, {
    cors: {
        origin: '*',
    }
})

const SERVER_HOST = "localhost"
const SERVER_PORT = 8080

io.on("connection", (socket) => {
    console.log("[IO] Connection => Server has a new connection")

    //quando o evento for disparado pelo cliente no front end
    socket.on("chat.message", (data) => {
        console.log(`[SOCKET] Chat.message =>`, data)

        // o servidor vai emitir esse mesmo evento para todos
        io.emit("chat.message", data)
    })

    socket.on("disconnect", () => {
        console.log("[SOCKET] Disconnect => A users connection was closed")
    })
})

server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`[HTTP] Listen => Server is running at http://${SERVER_HOST}:${SERVER_PORT}`)
    console.log(`[HTTP] Listen => Press CTRL + C to stop it`)
})