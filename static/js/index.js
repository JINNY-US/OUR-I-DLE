
function move(){window.location.href="/posting"} 
function back(){window.location.href="/"} 

//<!--실시간 서울의 기온,날씨-->
$(document).ready(function () {
    set_temp();
    set_weather();
});
function set_temp() {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=37.566536&lon=126.977966&appid=45804b403161f13f2e2f99d0c63db75b").then((res) => res.json()).then((data) => {

        let cel_feels = Math.round(data['main']['feels_like'] - 273)
        let weathers = data['weather'][0]['description']
        $("#temp").text(cel_feels)
        $("#weather").text(weathers)
    });
}
// 사이트 새로고침하면 파이썬에서 카드 자동으로 받아오기
$(document).ready(function () {
    writing();
});
function writing() {
    fetch('/detail_page')
    .then((res) => res.json())
    .then((data) => {
        let rows = data['result']
        $('#cards-box').empty()
        rows.forEach((m)=>{
            let name = m["name"]
            let image_url = m["image"];
                if (!image_url) {
                image_url =
                  "https://placehold.co/250x250/white/e9ecef/?text=Image&?font=Open+Sans";
            }
            let role = m["role"]
            let yourself = m["yourself"]
            let mbti = m["mbti"]
            let tmi = m["tmi"]
            let temp_html = `           
            <div class="col">
                <div class="card h-100">
                    <a href="#detail_box" target="_self" onclick="click_card('${name}','${role}');">
                        <div class="image-box">
                            <img class="image-thumbnail" src="${image_url}" id="card-img-top" alt="image">
                        </div>
                        <div class="card-body">
                            <p class="card-title">${name}</p>
                            <h5 class="card-text">${role}</h5>
                        </div>
                    </a>
                </div>
            </div>`;
            $("#cards-box").append(temp_html);
        });
    });
}
/* 카드 클릭시 /detail_pages로 정보 보내기 */
function click_card(name, role) {
    var name_selected = name;
    var role_selected = role;
    
    const formData = new FormData();
    formData.append("name_give", name_selected);
    formData.append("role_give", role_selected);

    fetch('/detail_pages', { method: "POST", body: formData })
        .then((res) => res.json())
        .then((data) => {
            let rows = data['result']
            $('#detail_box').empty();
            rows.forEach((m) => {
                          
                let name = m["name"]
                let image_url = m["image"];
                let role = m["role"]
                let mbti = m["mbti"]
                let yourself = m["yourself"]
                let tmi = m["tmi"]
                let temp_html = `
                <div id = "detail_page">
                <div class="nav">
                        <form id = "delete-form">
                          <button id="del_button" class="btn btn-outline-secondary" onclick="delete_card('${name}','${role}')" >
                          삭제하기</button>
                          <a href="#team_intro" id="pass" class="btn btn-outline-secondary">
                          돌아가기</a>
                        </form>
                </div>
                <div id = "detail-body">
                    <div class="detail-img">
                        <img class="detail-image image-thumbnail" src="${image_url}" alt="image">
                    </div>
                    <div class="detail-writing"> 
                        <div class="profile">
                            <div class="role">${role}</div>
                            <div class="name">${name}</div>
                            <div class="mbti">${mbti}</div>
                            <div class="yourself">${yourself}</div>
                            <div class="tmi">${tmi}</div>
                        </div>
                    </div>
                </div>
                `;
                $('#detail_box').append(temp_html);
            });
        });
}
//카드 삭제요청보내기
function delete_card(name, role) {
    var name_selected = name;
    var role_selected = role;

    const formData = new FormData();
    formData.append("name_give", name_selected);
    formData.append("role_give", role_selected);

    fetch('/delete_page', { method: "POST", body: formData })
        .then((res) => res.json())
        .then((data) => {
            alert(data["msg"]);
        });
    }
