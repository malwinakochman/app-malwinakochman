window.onload = () => {
    'use strict';
  
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./service-worker.js');
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            // Inicjalizacja mapy Leaflet na pozycji użytkownika
            var map = L.map('map').setView([latitude, longitude], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Dodanie markera na pozycji użytkownika
            var marker = L.marker([latitude, longitude]).addTo(map);
            marker.bindPopup("Jesteś tutaj!").openPopup();

        }, function(error) {
            console.error("Error getting location: ", error);
            alert('Error getting location: ' + error.message);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});
