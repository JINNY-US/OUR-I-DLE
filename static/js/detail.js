//파이썬에서 정보 받기 
$(document).ready(function show_members_d() {
    $("#container").empty();
    fetch('/members/d', { method: "GET" }).then((res) => res.json()).then((data) => {
        let members_d = data['members_d']
        members_d.forEach((row) => {
            let image = row["image"];
            let name = row["name"];
            let role = row["role"];
            let mbti = row["mbti"];
            let selfid = row["selfid"];
            let tmi = row["tmi"];

            let members_d_html = `<div id="wrapper">
                                    <div id="myimg">
                                    <img
                                        src="https://images.pexels.com/photos/15871758/pexels-photo-15871758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        alt="My Image">
                                    </div>
                                </div>
                                <div class="edit_btn">
                                    <div class="modify_btn">
                                    <button id="modify_btn1" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">수정하기</button>
                                    </div>
                                    <button id="delete_btn" type="button" id="delete">삭제하기</button>
                                </div>
                                <div id="profile">
                                    <div id="selfi">
                                    <div id="names">
                                        <p id="role">${role}</p>
                                        <p id="name">${name}</p>
                                    </div>
                                    <div id="prs">
                                        <p id="mbti">${mbti}</p>
                                        <p id="pr">${selfid}</p>
                                        <p id="tmi">${tmi}</p>
                                    </div>
                                    </div>
                                </div>`
                                
            $("#container").append(members_d_html)
        });
    })
})

//삭제하기 버튼 누르면 삭제를 실행시키는 함수
function delete_info() {

}