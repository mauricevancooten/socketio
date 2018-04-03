'use strict'

const socket = io()
const loveCounter = document.getElementById('love')
const hateCounter = document.getElementById('hate')

socket.on('tweet', function (tweet) {
  loveCounter.style.height = `${tweet.love}%`
  hateCounter.style.height = `${tweet.hate}%`
})
