from flask import Flask, render_template, request, redirect, jsonify
from dotenv import load_dotenv
import os
import requests
import json
from pathlib import Path

app = Flask(__name__)
load_dotenv()

@app.route('/', methods=["GET", "POST"])
def top():
    if request.method == "GET":
        return render_template('top.html')
    
    # GET以外でのアクセスを排除
    else:
        return render_template('top.html'), 

@app.route('/list/lat=<usr_lat>lng=<usr_lng>range=<usr_range>', methods=["GET", "POST"])
def storelist(usr_lat, usr_lng, usr_range):
    if request.method == "GET":
        if (usr_lat and usr_lng and usr_range) == False:
            redirect("/top")

        restaurant_list = getliststoredata(usr_lat, usr_lng, usr_range)
        return render_template('list.html', restaurant_list=restaurant_list)

    # GET以外でのアクセスを排除  
    else:
        pass
        
@app.route('/detail/id=<store_id>', methods=["GET"])
def storedetail(store_id):
    if request.method == "GET":
        if store_id:
            restaurant_data = getdetailstoredata(store_id)
        return render_template('detail.html', store_data=restaurant_data[next(iter(restaurant_data))])
    
    else:
        pass

# 条件に基づく店舗データのリストを返す
def getliststoredata(usr_lat, usr_lng, usr_range):
    query = {
        'count': 100,
        'lat': usr_lat,
        'lng': usr_lng,   
        'range': usr_range,
    }

    store_data = accessHotpepperAPI(query)

    restaurant_list = {}

    for restaurant in store_data:
        restaurant_list[restaurant['name']] = {
            'id': restaurant['id'],
            'name': restaurant['name'],
            'access': restaurant['access'],
            'genre': restaurant['genre']['name'],
            'catch': restaurant['catch'],
            # 'logo': restaurant['logo_image']
            'logo': restaurant['photo']['pc']['s']
    }

    return restaurant_list

# 指定された店舗の詳細を返す
def getdetailstoredata(store_id):

    query = {
        'count': 1,
        'id': store_id,
    }

    store_data = accessHotpepperAPI(query)
    restaurant_data = {}

    for restaurant in store_data:
        restaurant_data[restaurant['name']] = {
            'id': restaurant['name'],
            'name': restaurant['name'],
            'open': restaurant['open'],
            'address': restaurant['address'],
            'access': restaurant['access'],
            'genre': restaurant['genre']['name'],
            'catch': restaurant['catch'],
            'logo': restaurant['photo']['pc']['l'],
            'station': restaurant['station_name'],
            'url': restaurant['urls']['pc'],
            'close': restaurant['close'],
            'child': restaurant['child'],
            'midnight': restaurant['midnight'],
            'parking': restaurant['parking'],
            'non_smoking': restaurant['non_smoking'],
            'free_food': restaurant['free_food'],
            'private_room': restaurant['private_room'],
        }

    return restaurant_data

# グルメAPIにアクセスして店舗データを返す
def accessHotpepperAPI(unique_query):

    hotpepper_api_url = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/"
    hotpepper_api_key = os.getenv('HOTPEPPER_API_KEY')

    query = {
        'key': hotpepper_api_key,
        'order': 1,
        'start': 1,
        'count': 100,
        'format': 'json'
    }

    # ↑の条件と異なる場合、条件を変更する
    for key in unique_query:
        query[key] = unique_query[key]

    store_raw_data = requests.get(hotpepper_api_url, query)
    store_data = json.loads(store_raw_data.text)['results']['shop']

    # データが見つからなかった場合
    if len(store_data) == 0:
        return 0

    return store_data
