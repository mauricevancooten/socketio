const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const Twit = require('twit')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

http.listen(3000, () => {
  console.log('listening on http://localhost:3000')
})

const T = new Twit({
  consumer_key: '##############################',
  consumer_secret: '##############################',
  access_token: '##############################',
  access_token_secret: '##############################'
})

io.on('connection', (socket) => {

  console.log('Connected')

  const stream = T.stream('statuses/filter', { locations: '-180,-90,180,90' })

  stream.on('tweet', (tweet) => {

    if (tweet.coordinates) {
      if (tweet.coordinates !== null) {
        const outputPoint = { 'lat': tweet.coordinates.coordinates[0], 'lng': tweet.coordinates.coordinates[1] }
        socket.broadcast.emit('tweet', outputPoint)
        socket.emit('tweet', outputPoint)
        console.log(outputPoint)
      }
    }

  })
})
