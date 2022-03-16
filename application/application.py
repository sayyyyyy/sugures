from flask import Flask, render_template, request, redirect, jsonify
from dotenv import load_dotenv
import os
import requests
import json

app = Flask(__name__)
load_dotenv()

@app.route('/', methods=["GET", "POST"])
def top():
    if request.method == "POST":
        if request.form.get("random-search") != None:
            search_method = "random"
        else:
            search_method = "search"
            search_range = request.form.get('search-distance')
        
        getstoredata(10, 10 ,300)
        return redirect("/list")
    else:
        return render_template('top.html')

@app.route('/list', methods=["GET", "POST"])
def storelist():
    if request.method == "POST":
        pass
    else:
        return render_template('list.html')

@app.route('/detail', methods=["GET", "POST"])
def storedetail():
    if request.method == "POST":
        pass
    else:
        return render_template('detail.html')


@app.route('/get_list_store_data/lat=<usr_lat>lng=<usr_lng>range=<usr_range>', methods=["GET"])
def getliststoredata(usr_lat, usr_lng, usr_range):
  
    query = {
        'key': hotpepper_api_key,
        'order': 1,
        'start': search_start,
        'count': max_ammount,
        'lat': usr_lat,
        'lng': usr_lng,   
        'range': usr_range,
        'format': 'json'
    }

    store_data = accessHotpeperAPI(query)

    restaurant_list = {}

    for restaurant in store_data:
        restaurant_list[restaurant['name']] = {
            'id': restaurant['name'],
            'name': restaurant['name'],
            'access': restaurant['access'],
            'genre': restaurant['genre']['name'],
            'catch': restaurant['catch'],
            'logo': restaurant['logo_image']
        }

    return jsonify(restaurant_list)



@app.route('/get_detail_store_data/id=<store_id>')
def getdetailstoredata(store_id):

    query = {
        'key': hotpepper_api_key,
        'order': 1,
        'start': 1,
        'count': 1,
        'id': store_id,
        'format': 'json'
    }

    store_data = accessHotpeperAPI(query)
    restaurant_list = {}

    for restaurant in store_data:
        restaurant_list[restaurant['name']] = {
            'id': restaurant['name'],
            'name': restaurant['name'],
            'access': restaurant['access'],
            'genre': restaurant['genre']['name'],
            'catch': restaurant['catch'],
            'logo': restaurant['logo_image']
        }

    return jsonify(restaurant_list)

def accessHotpepperAPI(query) {
    # API必要データ準備
    hotpepper_api_url = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/"
    hotpepper_api_key = os.getenv('HOTPEPPER_API_KEY')

    store_raw_data = requests.get(hotpepper_api_url, query)
    store_data = json.loads(store_raw_data.text)['results']['shop']

    if len(store_data) == 0:
        print("データがありません")
        return 0

    return store_data
}