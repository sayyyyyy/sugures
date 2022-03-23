// 定数の設定
// const APPLICATION_URL = 'https://sugures.herokuapp.com/';
const APPLICATION_URL = 'http://127.0.0.1:5000/';

// 店舗リスト画面に遷移するまで
function callGeolocation() {
    loading('start');
    if(navigator.geolocation) {
        console.log("現在地を取得できます");
    } else {
        console.log("現在地を取得できません");
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
}

function successCallback(position) {
    const usr_lat = position.coords.latitude;
    const usr_lng = position.coords.longitude;
    const usr_range = document.getElementById("search-distance").value;
    const selected_genre = document.getElementsByClassName("selected_genre");
    
    if (selected_genre.length != 0) {
        transition_list(usr_lat, usr_lng, usr_range, 1, selected_genre[0].id);
    } else {
        transition_list(usr_lat, usr_lng, usr_range, 1, "no_genre");
    }
    
    
    loading('stop');
}

function errorCallback(error) {
    if (error.code == 1) {
        alert("位置情報をオンにしていください");
    } else if (error.code == 2) {
        alert("デバイスの位置が判定できません");
    } else if (error.code == 3) {
        alert("タイムアウトしました");
    } else {
        alert("位置情報を取得できませんでした")
    }
    
    loading('stop');
    window.location.href = APPLICATION_URL;
}

function transition_list(lat, lng, range, start, genre) {
    const url = APPLICATION_URL + 'list/' + 'lat=' + lat + 'lng=' + lng + 'range=' + range + 'start=' + start + 'genre=' + genre;
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


// ジャンルを選択した時の処理
function selectGenre(genre_id) {
    const selected_genre = document.getElementsByClassName("selected_genre");
    if (selected_genre.length != 0) {
        for (let i = 0; i < selected_genre.length; i++) {
            if (selected_genre[0].id == genre_id) {
                selected_genre[i].classList.remove("selected_genre");
                return
            }

            selected_genre[i].classList.remove("selected_genre");
        }
    }

    
    const select_element = document.getElementById(genre_id);
    select_element.classList.add("selected_genre");
}


// トップに戻る
$(function(){
    var pagetop = $('#page-top');
    pagetop.hide();
    $(window).scroll(function () {
       if ($(this).scrollTop() > 100) {
            pagetop.fadeIn();
       } else {
            pagetop.fadeOut();
       }
    });
    pagetop.click(function () {
       $('body, html').animate({ scrollTop: 0 }, 50);
       return false;
    });
  });