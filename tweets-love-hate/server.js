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

let love = 0
let hate = 0
let total = 0

const watchList = ['love', 'hate']

io.on('connection', (socket) => {

  console.log('Connected')

  const stream = T.stream('statuses/filter', { track: watchList })

  stream.on('tweet', (tweet) => {
      var text = tweet.text.toLowerCase();
      if (text.indexOf('love') !== -1 ) {
        love++
        total++
      }
      if (text.indexOf('hate') !== -1 ) {
        hate++
        total++
      }
      // console.log(total)
      // console.log(hate)
      // console.log(love)
      socket.emit('tweet', {
        text: tweet.text,
        love: (love / total) * 100,
        hate: (hate / total) * 100
      })
      console.log(tweet.text)
  })

})
