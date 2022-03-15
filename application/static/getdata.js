function callGeolocation() {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
}

function successCallback(position) {
    const usr_lat = position.coords.latitude;
    const usr_lng = position.coords.longitude;
    const usr_range = document.getElementById("search-distance");
    accessapi(usr_lat, usr_lng, usr_range);
}

function errorCallback(error) {
    alert(error);
}

function accessapi(lat, lng, range) {
    const url = 'http://127.0.0.1:5000/get_store_data/' + 'lat=' + lat + 'lng=' + lng + 'range=' + range;
    fetch(url)
    .then((response) => {
        if(!response.ok) {
            console.log("データの取得に失敗しました。")
        }
        return response.json()
    })
    .then((json) => console.log(json))
    .catch((error) => console.log(error))
}