from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def top():
    return render_template('top.html')

@app.route('/list')
def storelist():
    return render_template('list.html')

@app.route('/detail')
def storedetail():
    return render_template('detail.html')