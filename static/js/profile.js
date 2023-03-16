// 몽고db에서 멤버정보 불러오기
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

            let members_d_html = `<div>
                                            <div id="header">
                                            </div>
                                            <div id="wrapper">
                                                <div id="myimg">
                                                    <img src="https://images.pexels.com/photos/15871758/pexels-photo-15871758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                                        alt="My Image">
                                                </div>
                                            </div>
                                             <!-- 수정하기 버튼 모달창 만들기 완료! -->
                                            <div class="edit_btn">
                                                <div class="modify_btn">
                                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                        data-bs-whatever="@mdo">수정하기</button>
                                                </div>
                                                <div class="delete_btn"><button type="button" class="btn btn-secondary btn-sm" id="delete">삭제하기</button>
                                                </div>
                                            </div>
                                             <!--프로필 수정하기 버튼 누르면 나오는 모달창 -->
                                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="form-div" id="form">
                                                            <br>
                                                            <h2 style="text-align:center;">프로필 수정하기</h2>
                                                            <hr>
                                                            <div class="form-floating mb-3">
                                                                <input type="url" class="form-control" id="url" required>
                                                                <label>이미지를 넣어주세요.</label>
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <span class="input-group-text">
                                                                    <div class="txtname">이름</div>
                                                                </span>
                                                                <input type="text" aria-label="title" class="form-control" id="name" required>
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <span class="input-group-text">
                                                                    <div class="txtname">역할</div>
                                                                </span>
                                                                <input type="text" aria-label="title" class="form-control" id="role" required>
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <span class="input-group-text">
                                                                    <div class="txtname">MBTI</div>
                                                                </span>
                                                                <input type="text" aria-label="title" class="form-control" placeholder="예)INFP" id="mbti"
                                                                    required>
                                                            </div>
                                                            <div class="input-group mb-3 ">
                                                                <span class="input-group-text">
                                                                    <div class="txtname">자기소개</div>
                                                                </span>
                                                                <textarea class="form-control" aria-label="comment" id="selfid" required></textarea>
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <span class="input-group-text">
                                                                    <div class="txtname">TMI</div>
                                                                </span>
                                                                <input type="text" aria-label="comment" class="form-control" id="TMI" required>
                                                            </div>
                                                            <br>
                                                            <div class="mybtns" style="display: inline-block; margin: 0 10px 20px; float: right">
                                                                <button onclick="modify()" type="button" class="btn btn-dark">수정하기</button>
                                                                <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">닫기</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- 수정하기 모달창 end -->
                                            <div id="profile">
                                                <div id="selfi">
                                                    <div id="names">
                                                        <p id="role">${role}</p>
                                                        <p id="name">${name}</p>
                                                    </div>
                                                    <div id="prs">
                                                        <p id="mbti">${mbti}</p>
                                                        <p id="selfid">${selfid}</p>
                                                        <p id="tmi">${tmi}</p>
                                                        </div>
                                                    </div>
                                             </div>
                                            </div>
                                        </div>`
            $("#container").append(members_d_html)
        });
    })
})