'use strict'

const socket = io()
const btn = document.querySelector('.button')
const message = document.querySelector('.message')
const chat = document.querySelector('.chat')

btn.addEventListener('click', () => {
  socket.emit('chat message', message.value)
})

socket.on('chat message', (msg) => {
  const chatItem = document.createElement('li')
  chatItem.innerHTML = msg
  chat.appendChild(chatItem)
})
