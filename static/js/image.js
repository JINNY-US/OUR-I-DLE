$(document).ready(function () {
    listing();
  });

function listing() {
    fetch("/members")
      .then((res) => res.json())
      .then((data) => {
        let rows = data["result"];
        $("#cards-box").empty();
        rows.forEach((m) => {
          let name = m["name"]; 
          let image_url = m["image_url"];
          if (!image_url) {
            image_url =
              "https://placehold.co/250x250/white/e9ecef/?text=Image&?font=Open+Sans";
          }
          let mbti = m["mbti"]; //내용
          let tmi = m["tmi"];
  
          let temp_html = `
                        <div class="col">
                          <div class="card h-100">
                            <a href='javascript:void(0);' onclick="click_card('${name}','${mbti}');">
                              <img src="${image_url}" class="card-img-top" alt="image"/>
                                <div class="card-body">
                                    <h5 class="card-title">${name}</h5>
                                    <p class="card-text"> ${mbti}</p>
                                    <p> ${tmi}</p>
                                </div>
                            </a>
                          </div>
                        </div>
                                  `;
  
          $("#cards-box").append(temp_html);
        });
      });
  }

  function save_members() {
    let name = $('#name').val()
    let image = $('#image').val()
    let role = $('#role').val()
    let mbti = $('#mbti').val()
    let yourself = $('#yourself').val()
    let tmi = $('#tmi').val()

    let formData = new FormData();
    formData.append("name_give", name);
    formData.append("image_give", image)
    formData.append("role_give", role);
    formData.append("mbti_give", mbti);
    formData.append("yourself_give", yourself);
    formData.append("tmi_give", tmi);

    fetch('/members', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
        alert(data["msg"]);
        window.location.reload();
    });
}