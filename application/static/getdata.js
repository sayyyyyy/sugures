const APPLICATION_URL = 'http://127.0.0.1:5000/'

function callGeolocation() {
    loading('start');
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
}

function successCallback(position) {
    const usr_lat = position.coords.latitude;
    const usr_lng = position.coords.longitude;
    const usr_range = document.getElementById("search-distance").value;
    getliststoredata(usr_lat, usr_lng, usr_range);
    loading('stop');
}

function errorCallback(error) {
    alert(error);
}

function transition_list(lat, lng, range) {
    const url = APPLICATION_URL + 'list/' + 'lat=' + lat + 'lng=' + lng + 'range=' + range;
    window.location.href = url;
}

function transition_detail(store_id) {
    const url = APPLICATION_URL + 'get_detail_store_data/' + 'id=' + store_id;
    fetch(url)
    .then((response) => {
        if(!response.ok) {
            console.log("データの取得に失敗しました。")
        }
        return response.json(data)
    })
    .then((json) => console.log(json))
    .catch((error) => console.log(error))
}

// function transition(data) {
//     const url = APPLICATION_URL + 'transition/' + data;
//     fetch(url)
//     .then((response) => {
//         if(!response.ok) {
//             console.log("データの取得に失敗しました。")
//         }
//         return response.json()
//     })
//     .then(function (json) {
//         const body = $("#result-body");
//         body.html()
//     })
//     .catch((error) => console.log(error))
// }

function loading(isload) {
    const loading_page = document.getElementById('loading');
    if (isload == "start") {
        loading_page.classList.remove('hidden');
    } else {
        loading_page.classList.add('hidden');
    }
}

async function transition_test(data) {
    // console.log(data);
    // const body = $("#result-body");
    
    window.location.href = APPLICATION_URL + 'list';
    return data
        // for (let i in data) {
            // let container = $("<div class='box'</div>");
            // container.append("<p>" + data[i] + "</p>");
            // body.append(container);
            // console.log(data[i]['name']);
        // }
}
