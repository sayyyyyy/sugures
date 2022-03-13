from flask import Flask, render_template, request, redirect
from dotenv import load_dotenv
import os
import requests
import json

app = Flask(__name__)
load_dotenv()

@app.route('/', methods=["GET", "POST"])
def top():
    if request.method == "POST":
        return redirect("/list")
    return render_template('top.html')

@app.route('/list')
def storelist():
    return render_template('list.html')

@app.route('/detail')
def storedetail():
    return render_template('detail.html')

def clickSearchBtn():
    getstoredata(10, 10 ,300)

def getstoredata(usr_lat, usr_lng, search_range):

    # API必要データ準備
    hotpepper_api_url = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/"
    hotpepper_api_key = os.getenv('HOTPEPPER_API_KEY')

    search_start = 1
    max_ammount = 100

    query = {
        'key': hotpepper_api_key,
        'order': 1,
        'start': search_start,
        'count': max_ammount,
        'lat': usr_lat,
        'lng': usr_lng,
        'range': search_range,
        'format': 'json'
    }

    store_raw_data = requests.get(hotpepper_api_url, query)
    store_data = json.loads(store_raw_data.text)['result']['shop']
    
    if len(store_data) == 0:
        print("データがありません")
        return 0
    
    print(store_data)