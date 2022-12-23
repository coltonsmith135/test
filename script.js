function initGoogle() {
    var location = {
         lat:40.000,
         lng: -79.000
    }
    var options = {
        center:location,
        zoom: 9
    }

    if(navigator.geolocation) {
        console.log('geolocation is here!');

        navigator.geolocation.getCurrentPosition((loc) => {
            location.lat = loc.coords.latitude;
            location.lng = loc.coords.longitude;

            map = new google.maps.map(document.getElementById("map"), options); 
        },
        (err) => {
            console.log('user clocked no lol');
            map = new google.maps.map(document.getElementById('map'), options);
        }
        )
    } else {
        console.log('geolocation is not supported :(');
        map = new google.maps.map(document.getElementById('map'), options);
    }

    autocomplete = new google.maps.places.Autocomplete(document.getElementById('input'), {
      
        componentRestriction: {'country': ['us']},
        fields: ['geometry', 'name'],
        types: ['establishment']
    });

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getplace();
        console.log(place);
        new google.maps.marker({
             position: place.geometry.location,
             title: place.name,
             map: map
        })
    });
}