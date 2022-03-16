const APPLICATION_URL = 'http://127.0.0.1:5000/'

function callGeolocation() {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
}

function successCallback(position) {
    const usr_lat = position.coords.latitude;
    const usr_lng = position.coords.longitude;
    const usr_range = document.getElementById("search-distance");
    getliststoredata(usr_lat, usr_lng, usr_range);
}

function errorCallback(error) {
    alert(error);
}

function getliststoredata(lat, lng, range) {
    const url = APPLICATION_URL + 'get_list_store_data/' + 'lat=' + lat + 'lng=' + lng + 'range=' + range;
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

function getdetailstoredata(store_id) {
    const url = APPLICATION_URL + 'get_detail_store_data/' + 'id=' + store_id;
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

function transition() {
    const url = APPLICATION_URL + 'list';
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

function isLoading() {
    
}