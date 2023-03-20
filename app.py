from flask import Flask, render_template, request, jsonify, url_for
app = Flask(__name__)

import requests
from bs4 import BeautifulSoup

from pymongo import MongoClient
import certifi

ca = certifi.where()

client = MongoClient('mongodb+srv://sparta:test@cluster0.9rteaqz.mongodb.net/?retryWrites=true&w=majority', tlsCAFile =ca)
db = client.dbsparta

# 첫번째 페이지 들어가기
@app.route('/')
def index():
   return render_template('index.html')

# 글 제출하기 누르면 다시 돌아옴
@app.route('/home')
def home():
    return render_template('index.html')

# 글작성 누르면 posting 페이지로 이동함
@app.route('/posting')
def member_cards_write():
    return render_template('posting.html')

# 카드 링크 누르면 상세페이지로 이동
@app.route("/detail_pages",methods=["POST"]) 
def detail_page():
    name = request.form["name_give"]
    role = request.form["role_give"]
    dp = list(db.members.find({'name':name},{'_id':False}))
    return jsonify({"result":dp})

# index 페이지로 멤버 카드 보내기
@app.route('/detail_page', methods=["GET"])
def members_detail_card_get():
    detail_cards = list(db.members.find({}, {'_id':False}))
    return jsonify({'result':detail_cards})

# 삭제하기
@app.route("/delete_page/",methods=["POST"]) 
def delete_card():
    name = request.form["name_give"]
    
    db.members.delete_one({'name':name})
    return jsonify({'msg': '삭제되었습니다.'})  

# 추가된 멤버의 정보를 몽고db에 저장
@app.route("/members", methods=['POST'])
def web_members_post():
    image_url_receive = request.form['image_url_give']
    name_receive = request.form['name_give']
    role_receive = request.form['role_give']
    mbti_receive = request.form['mbti_give']
    yourself_receive = request.form['yourself_give']
    tmi_receive = request.form['tmi_give']
    
    doc = {
        'image':image_url_receive,
        'name':name_receive,
        'role':role_receive,
        'mbti':mbti_receive,
        'yourself':yourself_receive,
        'tmi':tmi_receive
    }
    db.members.insert_one(doc)

    return jsonify({'msg':'저장되었습니다.'})

if __name__ == '__main__':  
   app.run('0.0.0.0',port=5001,debug=True)





 