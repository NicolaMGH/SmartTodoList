// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

function createTDL(obj) {
  const $todo = $("<div>").addClass("lists");
  const header = `<div class="list-title">
                    <h2>${obj.title}</h2>
                    <span id="plus"><i class="fas fa-plus"></i></span>
                  </div>`;
  const $bodyCon = $("<div>");
  for (let key in obj) {
    if (key !== "title") {
      const $body = $(`<div>
                      <h3>${key}</h3>
                    </div>`);
      const $list = $(`<ul class="cat"></ul>`)
      obj[key].forEach(item => $list.append(`<li>${item}</li>`));
      $body.append($list);
      $bodyCon.append($body);
    }
  }

  $todo.append(header);
  $todo.append($bodyCon);

  return $todo;
}

function renderTDL(a) {
    a.forEach(x => $('.todos').append(createTDL(x)))
}


function signInButton (){
  $('.login-dropdown').on('submit', (event) => {
    event.preventDefault();
    $.ajax('/api/lists/user_lists', {method: 'GET'})
      .then((data) => {
        data.forEach(obj => {
          for (let key in obj) {
            $('section').append(createTDL(obj[key]));
          }
        })

      })
  });
}


// const test = JSON.parse('{"title":"foring list","book":["angers","man"]}');









$(document).ready(function() {
  // $('section').append(createTDL(test));
  signInButton();
});
