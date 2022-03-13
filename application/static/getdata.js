function callGeolocation() {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
}

function successCallback(position) {
    const usr_lat = position.coords.latitude;
    const usr_lng = position.coords.longitude;
    alert("緯度: " + usr_lat + "\n" + 
    "経度: " + usr_lng);
}

function errorCallback(error) {
    alert(error);
}