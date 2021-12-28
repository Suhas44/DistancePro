let map, infoWindow;


function initMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: pos.lat, lng: pos.lng },
            zoom: 1.60,
            streetViewControl: false,
            mapTypeControlOptions: {
              mapTypeIds: google.maps.MapTypeId.ROADMAP
            },
          });
          map.setCenter(pos);
          setRoutes(pos.lat, pos.lng, map);

        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
}


function setRoutes(lat, lng, map) {
  const origin = { lat: lat, lng: lng}

  const ParisPlanCoordinates = [
    origin,
    { lat: 48.8566, lng: 2.3522 },
  ];

  const RioPlanCoordinates = [
    origin,
    { lat: -22.9068, lng: -43.1729 },
  ];

  const TokyoPlanCoordinates = [
    origin,
    { lat: 35.6762, lng: 139.6503 },
  ];

  const NewYorkPlanCoordinates = [
    origin,
    { lat: 40.7128, lng: -74.0060 },
  ];

  const ParisFlightPath = new google.maps.Polyline({
    path: ParisPlanCoordinates,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
  ParisFlightPath.setMap(map);

  const RioFlightPath = new google.maps.Polyline({
    path: RioPlanCoordinates,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
  RioFlightPath.setMap(map);

  const TokyoFlightPath = new google.maps.Polyline({
    path: TokyoPlanCoordinates,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
  TokyoFlightPath.setMap(map);

  const NewYorkFlightPath = new google.maps.Polyline({
    path: NewYorkPlanCoordinates,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
  NewYorkFlightPath.setMap(map);

  let parismiles = Math.round(getDistance(ParisPlanCoordinates[1].lat, ParisPlanCoordinates[1].lng, origin.lat, origin.lng) * 0.621371) 
  let pariskm  = Math.round(parismiles * 1.60934) 
  
  let riomiles = Math.round(getDistance(RioPlanCoordinates[1].lat, RioPlanCoordinates[1].lng, origin.lat, origin.lng) * 0.621371)
  let riokm  = Math.round(riomiles * 1.60934)

  let tokyomiles = Math.round(getDistance(TokyoPlanCoordinates[1].lat, TokyoPlanCoordinates[1].lng, origin.lat, origin.lng) * 0.621371)
  let tokyokm  = Math.round(tokyomiles * 1.60934)

  let newyorkmiles = Math.round(getDistance(NewYorkPlanCoordinates[1].lat, NewYorkPlanCoordinates[1].lng, origin.lat, origin.lng) * 0.621371)
  let newyorkkm  = Math.round(newyorkmiles * 1.60934)

  document.getElementById("paristext").innerHTML = `${parismiles} miles from Paris<br>${pariskm} kilometers`;
  document.getElementById("riotext").innerHTML = `${riomiles} miles from Rio de Janeiro <br>${riokm} kilometers`;
  document.getElementById("tokyotext").innerHTML = `${tokyomiles} miles from Tokyo<br>${tokyokm} kilometers`;
  document.getElementById("newyorktext").innerHTML = `${newyorkmiles} miles from New York<br>${newyorkkm} kilometers`;
}


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
  return km;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

