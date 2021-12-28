let map;
let marker;
let geocoder;
let clicks = []
let coords = []

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 1.60,
    center: { lat: 30, lng: 0 },
    streetViewControl: false,
    mapTypeControlOptions: {
      mapTypeIds: google.maps.MapTypeId.ROADMAP
    }
  });
  geocoder = new google.maps.Geocoder();

  const inputText = document.createElement("input");

  inputText.type = "text";
  inputText.placeholder = "Enter a location";

  const submitButton = document.createElement("input");

  submitButton.type = "button";
  submitButton.value = "Enter";
  submitButton.classList.add("button", "button-primary");

  const clearButton = document.createElement("input");

  clearButton.type = "button";
  clearButton.value = "Clear";
  clearButton.classList.add("button", "button-secondary");


  map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);

  marker = new google.maps.Marker({
    map,
  });
  map.addListener("click", (e) => {
    geocode({ location: e.latLng });
  });
  submitButton.addEventListener("click", () =>
    geocode({ address: inputText.value })
  );
  clearButton.addEventListener("click", () => {
    clear();
  });
  clear();
  }


  function clear() {
    marker.setMap(null);
  }
  
  function geocode(request) {
    clear();
    geocoder
      .geocode(request)
      .then((result) => {
        const { results } = result;  
        marker.setPosition(results[0].geometry.location);
        marker.setMap(map);
        let wholeresponse = JSON.stringify(result, null, 2)
        let latindex = wholeresponse.indexOf("lat")
        let lngindex = wholeresponse.indexOf("lng")
        let lat = wholeresponse.substring(latindex + 6, latindex + 12)
        let lng = wholeresponse.substring(lngindex + 6, lngindex + 12)
        let latitude = parseFloat(lat)
        let longitude = parseFloat(lng)
        clicks[0] = latitude
        clicks[1] = longitude
        if (clicks.length == 2) {
          document.getElementById("First").style.visibility = "visible"
        }
        return results;
      })
      .catch((e) => {
        alert("Geocode was not successful, please try again ");
      });
  }

  
document.getElementById("First").addEventListener("click", function() {
  if (coords.length == 0) {
    coords.push(clicks[clicks.length-2])
    coords.push(clicks[clicks.length-1])
    document.getElementById("First").innerHTML = "Confirm Second Location"
  } else if (coords.length == 2) {
    coords.push(clicks[clicks.length-2])
    coords.push(clicks[clicks.length-1])
    document.getElementById("First").innerHTML = "Confirm First Location"
    let miles = Math.round(getDistance(coords[0], coords[1], coords[2], coords[3]))
    let km = Math.round(miles * 1.60934)
    if (isNaN(miles)) {
      document.getElementById("First").innerHTML = "Confirm First Location"
      document.getElementById("text").innerHTML = `0 miles<br>0 kilometers`
    } else {
      document.getElementById("First").innerHTML = "Confirm First Location"
      document.getElementById("text").innerHTML = `${miles} miles<br>${km} kilometers`
    }
    clicks = []
    coords = []
  }
}) 

function getDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var km = R * c; // Distance in km
  var miles = km * 0.621371;
  return miles;
}
function deg2rad(deg) {
  return deg * (Math.PI/180)
}