// 定数の設定
const APPLICATION_URL = 'http://127.0.0.1:5000/'

// 店舗リスト画面に遷移するまで
function callGeolocation() {
    loading('start');
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
}

function successCallback(position) {
    const usr_lat = position.coords.latitude;
    const usr_lng = position.coords.longitude;
    const usr_range = document.getElementById("search-distance").value;
    transition_list(usr_lat, usr_lng, usr_range, 1);
    loading('stop');
}

function errorCallback(error) {
    alert(error);
}

function transition_list(lat, lng, range, start) {
    const url = APPLICATION_URL + 'list/' + 'lat=' + lat + 'lng=' + lng + 'range=' + range + 'start=' + start;
    window.location.href = url;
}

function loading(isload) {
    const loading_page = document.getElementById('loading');
    if (isload == "start") {
        loading_page.classList.remove('hidden');
    } else {
        loading_page.classList.add('hidden');
    }
}

//

// 店舗詳細画面に遷移
function transition_detail(store_id) {
    const url = APPLICATION_URL + 'detail/' + 'id=' + store_id;
    window.location.href = url;
}
