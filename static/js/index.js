//수정하기
function move(){window.location.href="/detail";
} 
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

//<!--받은 멤버 정보를 파이썬으로 보내기-->

function writing() {
    let image = $("#modal_img").val();
    let name = $("#modal_name").val();
    let role = $("#modal_role").val();
    let mbti = $("#modal_mbti").val();
    let selfid = $("#modal_selfid").val();
    let tmi = $("#modal_tmi").val();

    let formData = new FormData();
    formData.append("image_give", image);
    formData.append("name_give", name);
    formData.append("role_give", role);
    formData.append("mbti_give", mbti);
    formData.append("selfid_give", selfid);
    formData.append("tmi_give", tmi);

    fetch('/index/', { method: "POST", body: formData, }).then((res) => res.json()).then((data) => {
        alert(data['msg']);
        window.location.reload();
    });
}
// 사이트 새로고침하면 파이썬에서 카드 자동으로 받아오기
$(document).ready(function show_members() {
    $("#card_list").empty();
    fetch('/index/members', { method: "GET" }).then(res => res.json()).then(data => {
        let members = data['members']
        members.forEach((row) => {
            let image = row["image"];
            let name = row["name"];
            let role = row["role"];

            let members_html =
            `<button class="col" type="button" onclick="move()">
                <div class="card h-100">
                <img src="${image}"
                class="card-img-top" alt="...">
                    <div class="card-body">
                    <p class="card-title">${name}</p>
                    <h5 class="card-text">${role}</h5>
                    </div>
                </div>
            </button>`
            $("#card_list").append(members_html);
        });
    })
})
