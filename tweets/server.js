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
  consumer_key: 'ltw7U5zu2kxzJs5ALWvFlmIHj',
  consumer_secret: 'Cj8ooAlkFkHFj2otmo2x92nDbi1bh9538gh7G1SHOLrKyc8T2Q', access_token: '36042728-rwkfUzcNvOqxjv4J3v7OGZGDGG7kJ7qfSoB0UHP4v', access_token_secret: 'wobjeROxHvhqBorWKeN7gcD0DwnBmqVR5VZqvsgyN2cUi'
})

const watchList = ['javascript']

io.on('connection', function(socket) {

  console.log('Connected')

  const stream = T.stream('statuses/filter', {track: watchList})

  stream.on('tweet', (tweet) => {
    socket.emit('tweet', tweet)
    console.log(tweet.text)
  })

})
