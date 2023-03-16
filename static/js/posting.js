


const thumbsInput = document.getElementById("thumbsInput");

const myForm = document.querySelector(".my-form");


console.log($("thumbsInput").val());

function onClickSubmit() {
  // 유저가 등록한 이미지 파일들을 읽어들이는 코드를 추가할 예정입니다. 확인을 위해 나머지 코드들은 주석 처리를 해놨습니다.
  let name = $("#name").val()
  let image_url = $("#thumbsInput").val()
  let role = $("#role").val()
  let mbti = $("#mbti").val()
  let yourself = $("#mbti").val()
  let tmi = $("#tmi").val()



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
    // 기본적으로 Form은 Submit 되면, 새로고침되어 해당 페이지를 다시 보여줍니다. 즉, 새로고침이 Form의 기본 event입니다.
    // "등록"이나 "취소" 버튼을 눌러, 홈으로 이동하게끔 하려면 새로고침되는 것을 막아야 하는데, 이때 event.preventDefault()가 기본 event의 작동을 막습니다. 즉, 새로고침되지 않습니다.
    // 새로고침되지 않게 설정한 뒤에, 서버로 유저가 작성한 데이터를 보내주고, 홈으로 가는 코드를 작성하여, 버튼이 의도대로 기능하게 바꿨습니다.
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