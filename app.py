from flask import Flask, render_template, request, jsonify, redirect, url_for
app = Flask(__name__)

import requests
from bs4 import BeautifulSoup

from pymongo import MongoClient
import certifi

ca = certifi.where()

client = MongoClient('mongodb+srv://sparta:test@cluster0.9rteaqz.mongodb.net/?retryWrites=true&w=majority', tlsCAFile =ca)
db = client.dbsparta


# 첫번째 페이지 들어가기
@app.route('/index')
def index():
   return render_template('index.html')

# 상세(두번째) 페이지 들어가기
@app.route('/detail', methods=["GET"])
def members_detail_card_get():
    detail_cards = list(db.members.find({}, {'_id':False}))
    return jsonify({'result':detail_cards})

#--------------------------------------------------------------------------------


@app.route('/write')
def member_cards_write():
    return render_template('posting.html')

@app.route("/members", methods=["POST"])
def save_members_post():
    name_receive = request.form['name_give']
    image_url_receive = request.form['image_url_give']
    role_receive = request.form['role_give']
    mbti_receive = request.form['mbti_give']
    yourself_receive = request.form['yourself_give']
    tmi_receive = request.form['tmi_give']
    
    doc = {
        'name':name_receive,
        'image_url':image_url_receive,
        'role':role_receive,
        'mbti':mbti_receive,
        'yourself':yourself_receive,
        'tmi':tmi_receive
    }
    db.members.insert_one(doc)
    
    return jsonify({'msg':'저장되었습니다.'})

@app.route("/detail",methods=["POST"]) # 글 링크 누르면 상세페이지로 이동
def detail_page():
    name = request.form["name_give"]
    role = request.form["role_give"]
    dp = list(db.members.find({'name':name},{'_id':False}))
    return jsonify({"result":dp})


@app.route("/delete_page",methods=["POST"]) # 글 링크 누르면 상세페이지로 이동
def delete_card():
    name = request.form["name_give"]
    
    db.members.delete_one({'name':name})
    return jsonify({'msg': '삭제되었습니다.'})  

if __name__ == '__main__':
    app.run('0.0.0.0', port=5501, debug=True)

#------------------------------------------------------------------------------------


# 추가된 멤버의 정보를 몽고db에 저장
# @app.route("/index", methods=['POST'])
# def web_members_post():
#     image_receive = request.form['image_give']
#     name_receive = request.form['name_give']
#     role_receive = request.form['role_give']
#     mbti_receive = request.form['mbti_give']
#     selfid_receive = request.form['selfid_give']
#     tmi_receive = request.form['tmi_give']
    
#     doc = {
#         'image':image_receive,
#         'name':name_receive,
#         'role':role_receive,
#         'mbti':mbti_receive,
#         'selfid':selfid_receive,
#         'tmi':tmi_receive
#     }
#     db.members.insert_one(doc)
    
#     return jsonify({'msg':'저장되었습니다.'})

# # index 페이지로 멤버 카드 보내기
# @app.route("/index/members", methods=["GET"])
# def member_cards_get():
#     cards_data = list(db.members.find({},{'_id':False}))
#     return jsonify({'members': cards_data})

# # detail 페이지로 멤버 카드 보내기
# @app.route("/members/d", methods=["GET"])
# def memberD_cards_get():
#     cardsD_data = list(db.members.find({},{'_id':False}))
#     return jsonify({'members_d': cardsD_data})

# # 삭제하기
# @app.route("/delete_page/",methods=["POST"]) 
# def delete_card():
#     name = request.form["name_give"]
    
#     db.members.delete_one({'name':name})
#     return jsonify({'msg': '삭제되었습니다.'})  

# if __name__ == '__main__':  
#    app.run('0.0.0.0',port=5501,debug=True)




#수정하기 1. 상세페이지에서 수정하기 누르면 작성창으로 가서 추가하기 누르면 db로 update되고 다시 사이트로 get
#삭제하기 1. 상세페이지에서 삭제하기 누르면 (비밀번호를 적고) db로 delete 요청.
# db.users.update_one({'name' : '영수'},{'$set':{'age':19}})
# db.users.delete_one({'name' : '영수'})





 