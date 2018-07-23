const app = require('http').createServer()
const io  = require('socket.io')(app)

const PORT = process.env.PORT || 3231

const SocketManager = require('./SocketManager')

io.on('connection', SocketManager)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))

module.exports = io