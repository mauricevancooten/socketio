'use strict'

function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 30.2973286, lng: -104.0300831},
    zoom: 12,
    mapTypeId: 'terrain'
  })
  const liveTweets = new google.maps.MVCArray()
  const heatmap = new google.maps.visualization.HeatmapLayer({
    data: liveTweets,
    radius: 25,
    map: map
  })

  const socket = io()

  socket.on('tweet', (tweet) => {
    const tweetLocation = new google.maps.LatLng(tweet.lng, tweet.lat)
    liveTweets.push(tweetLocation)
    const marker = new google.maps.Marker({
      position: tweetLocation,
      map: map
    })
    setTimeout( () => {
      marker.setMap(null)
    }, 600)
  })
}
