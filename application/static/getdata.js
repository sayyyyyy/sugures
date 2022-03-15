function callGeolocation() {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
}

function successCallback(position) {
    const usr_lat = position.coords.latitude;
    const usr_lng = position.coords.longitude;
    accessapi(usr_lat, usr_lng);
}

function errorCallback(error) {
    alert(error);
}

function accessapi(lat, lng) {
    const url = 'http://127.0.0.1:5000/get_store_data/' + lat + '/' + lng;
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