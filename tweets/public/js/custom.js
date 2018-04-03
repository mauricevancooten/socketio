'use strict'

const socket = io()
const body = document.querySelector('.container')

socket.on('tweet', (tweet) => {
  const tweetText = document.createElement('p')
  tweetText.innerHTML = tweet.text
  body.appendChild(tweetText)
})
