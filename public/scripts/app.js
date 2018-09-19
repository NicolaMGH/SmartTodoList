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


function newListButton (){
    $("#new-list").click(function(){
    $("input[type='text']").fadeToggle();
  });
}

function newList () {
    $("input[type='text']").keypress(function(event){
    if(event.which === 13){
      //grabbing new todo text from input
      var todoText = $(this).val();
      $.ajax('/lists', {method: 'POST', data: todoText})
      $(this).val("");
      //create a new li and add to ul
      const $todo = $("<div>").addClass("lists");
      const header = `<div class="list-title">
                        <h2>${todoText}</h2>
                        <span id="plus"><i class="fas fa-plus"></i></span>
                      </div>`;
      const $body = $(`<div><h3></h3></div>`);
      const $list = $(`<ul class="cat"></ul>`);
      const $bodyCon = $("<div>");
      $body.append($list);
      $bodyCon.append($body);
      $todo.append(header);
      $todo.append($bodyCon);
      $(".todos").append($todo)

    }
  });
}







$(document).ready(function() {
  // $('section').append(createTDL(test));
  signInButton();
  newListButton();
  newList();
});
