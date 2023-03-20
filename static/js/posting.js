function backhome(){window.location.href="/"} 
const thumbsInput = document.getElementById("thumbsInput");
const myForm = document.querySelector(".my-form");
console.log($("thumbsInput").val());

function onClickSubmit() {
  // 유저가 등록한 이미지 파일들을 읽어들이는 코드를 추가할 예정입니다. 확인을 위해 나머지 코드들은 주석 처리를 해놨습니다.
  let name = $("#memberNameInput").val()
  let image_url = $("#memberProfileInput").val()
  let role = $("#roleInput").val()
  let mbti = $("#mbtiInput").val()
  let yourself = $("#yourselfInput").val()
  let tmi = $("#tmiInput").val()

  let formData = new FormData();

formData.append("name_give", name);
formData.append("image_url_give", image_url);
formData.append("role_give", role);
formData.append("mbti_give", mbti);
formData.append("yourself_give", yourself);
formData.append("tmi_give", tmi);

  fetch("/members", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data["msg"]); // <----(3.9)변경
    });
}
// Form Event를 다루기 위한 함수
function onClickSubmitBtn(event) {

    event.preventDefault();
  
    if (event.submitter.id === "submitBtn") {
      // console.log("Submitted");
      onClickSubmit();
    }
    // (window.)location은 url 정보를 조작할 수 있습니다.
    window.location.replace(window.location.origin);
  }
  function onClickCancelBtn() {
    window.location.replace(window.location.origin);
  }
  myForm.addEventListener("submit", onClickSubmitBtn);