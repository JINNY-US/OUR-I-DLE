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

$(document).ready(function () {
    writing();
});

/* 홈 화면 리스트 */
function writing() {
    fetch('/detail',)
    .then((res) => res.json())
    .then((data) => {
        let rows = data['result']
        $('#cards-box').empty()
        rows.forEach((m)=>{
            let name = m["name"]
            let image_url = m["image_url"];
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
                    <a href='javascript:void(0);' onclick="click_card('${name}','${role}');">
                        <img src="${image_url}" id="card-img-top" alt="image">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">${role}</p>
                        <p>${yourself}</p>
                    </div>
                    </a>
                 </div>
                </div>
            </div>
     `;
            $("#cards-box").append(temp_html);
        });
     
    });
}

//보류

function save_members() {
    let name = $('#name').val()
    let image_url = $("#thumbsInput").val()
    let role = $('#role').val()
    let mbti = $('#mbti').val()
    let yourself = $('#mbti').val()
    let tmi = $('#tmi').val()

    if (!name) {
        name = "익명";
    }
    if (!role) {
        role = "역할입니다";
    }
    if (!image_url) {
        image_url =
        "https://placehold.co/250x250/white/e9ecef/?text=Image&?font=Open+Sans";
    }
    if (!tmi) {
        tmi = "티엠아이입니다";
    }
    if (!yourself) {
        yourself = "자기소개입니다";
    }
    if (!mbti) {
        mbti = "엠비티아이입니다";
    }


    let formData = new FormData();
    formData.append("name_give", name);
    formData.append("image_url_give", image_url);
    formData.append("role_give", role);
    formData.append("mbti_give", mbti);
    formData.append("yourself_give", yourself);
    formData.append("tmi_give", tmi);

    fetch('/members', { method: "POST", body: formData }).
    then((res) => res.json()).then((data) => {
        alert(data["msg"]);
        window.location.reload();
    });
}


/* 상세페이지 */
/* ************************삭제하기 버튼***************************/ 


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
            $('#cards-box').empty();
            rows.forEach((m) => {
                // let image_url = m['image_url']
                let name = m["name"]
                let image_url = m["image_url"];
                let role = m["role"]
                let mbti = m["mbti"]

                let yourself = m["yourself"]
                let tmi = m["tmi"]

                let temp_html = `
                <div id="detail_page">
                    <div id="detail_image_page">
                        <img class="detail-image" src="${image_url}" alt="image"/>
                    </div>
                <div id ="detail_body">
                    <div class="role">${role}</div>
                    <h5 class="member_name">${name}</h5>
                    <div class="mbti">${mbti}</div>
                    <div class="yourself">${yourself}</div>
                    <div class="tmi">${tmi}</div>
                </div>
                </div>

                <div>
                    <form id = "delete-form">
                        <button id="del_button" class="btn btn-outline-secondary" onclick="delete_card('${name}','${role}')" >삭제하기</button>
                    </form>
                </div>
                `;
                
                $('#cards-box').append(temp_html);
            });
        });
}
// function delete_card(name, role) {
//     var name_selected = name;
//     var role_selected = role;


//     const formData = new FormData();
//     formData.append("name_give", name_selected);
//     formData.append("role_give", role_selected);


//     fetch('/delete_page', { method: "POST", body: formData })
//         .then((res) => res.json())
//         .then((data) => {
//             alert(data["msg"]);
//         });
// }

//<!--받은 멤버 정보를 파이썬으로 보내기-->

// function writing() {
//     let image = $("#modal_img").val();
//     let name = $("#modal_name").val();
//     let role = $("#modal_role").val();
//     let mbti = $("#modal_mbti").val();
//     let selfid = $("#modal_selfid").val();
//     let tmi = $("#modal_tmi").val();

//     let formData = new FormData();
//     formData.append("image_give", image);
//     formData.append("name_give", name);
//     formData.append("role_give", role);
//     formData.append("mbti_give", mbti);
//     formData.append("selfid_give", selfid);
//     formData.append("tmi_give", tmi);

//     fetch('/index/', { method: "POST", body: formData, }).then((res) => res.json()).then((data) => {
//         alert(data['msg']);
//         window.location.reload();
//     });
// }
// // 사이트 새로고침하면 파이썬에서 카드 자동으로 받아오기
// $(document).ready(function show_members() {
//     $("#card_list").empty();
//     fetch('/index/members', { method: "GET" }).then(res => res.json()).then(data => {
//         let members = data['members']
//         members.forEach((row) => {
//             let image = row["image"];
//             let name = row["name"];
//             let role = row["role"];

//             let members_html =
//             `<button class="col" type="button" onclick="move()">
//                 <div class="card h-100">
//                 <img src="${image}"
//                 class="card-img-top" alt="...">
//                     <div class="card-body">
//                     <p class="card-title">${name}</p>
//                     <h5 class="card-text">${role}</h5>
//                     </div>
//                 </div>
//             </button>`
//             $("#card_list").append(members_html);
//         });
//     })
// })
