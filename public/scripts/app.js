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
  const input = `<input class="new-todo-input" type="text" placeholder="Add TODO">`
  const $bodyCon = $("<div>").addClass("list-dropdown");
  for (let key in obj) {
    if (key !== "title") {
      const $body = $(`<div>
                      <h3>${key}</h3>
                    </div>`);
      const $list = $(`<ul class="cat"></ul>`)
      obj[key].forEach(item => $list.append(`<li><span class="delete"><i class="fas fa-times"></i></span>${item}</li>`));
      $body.append($list);
      $bodyCon.append($body);
    }
  }

  $todo.append(header);
  $todo.append(input);
  $todo.append($bodyCon);
  newTodoPlus();
  deleteTodo();
  addTodo();
  completed();
  listDropdown();

  return $todo;
}

function renderTDL(a) {
    a.forEach(x => $('.todos').append(createTDL(x)));
}


function signInButton (){
  $('.login-dropdown').on('submit', async (event) => {
    event.preventDefault();
    $('.login-dropdown').slideUp();
    await $.ajax('/test', {method: 'GET'});
    const data = await $.ajax('/lists/user_lists', {method: 'GET'});
    data.forEach(obj => {
      for (let key in obj) {
        $('section').append(createTDL(obj[key]));
      }
    });
    $('.login-nav').text("Logout");
    $('#new-list').css('opacity', '1');
    $('#new-list').css('display', 'block');
    $('.login-nav').addClass('logout');
    $('.login-nav').off('click');
    $('.login-nav').css("margin-top", "50px");

    $('input').val('');
    onLogout();
  });
}

function loginSlideDown () {
  $('.login-nav').on('click', (event) => {
    $('.login-dropdown').slideToggle();
  })
}

function onLogout () {
  $('.logout').on('click', (event) => {
    $('.logout').off('click')
    $('.login-nav').text("Login");
    $('.login-nav').css("margin-top", "28px");
    $('#new-list').css('opacity', '0');
    loginSlideDown();
    $('.login-nav').removeClass("logout");
    $('#new-list').css('display', 'none');
  })
}

function newListButton (){
    $("#new-list").click(function(){
    $(".new-list-input").fadeToggle();
  });
}

function newList () {
    $(".new-list-input").keypress(function(event){
    if(event.which === 13){
      $(".new-list-input").fadeToggle();
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
      const input = `<input class="new-todo-input" type="text" placeholder="Add TODO">`
      const $body = $(`<div><h3></h3></div>`);
      const $list = $(`<ul class="cat"></ul>`);
      const $bodyCon = $("<div>").addClass("list-dropdown");
      $body.append($list);
      $bodyCon.append($body);
      $todo.append(header);
      $todo.append(input);
      $todo.append($bodyCon);
      $(".todos").prepend($todo)
      newTodoPlus();
      deleteTodo();
      addTodo();
      completed();
      listDropdown();
    }
  });
}

function completed () {
    $("ul").on("click", "li", function(){
      $(this).toggleClass("completed");
  });
}

function newTodoPlus () {
  $('.fa-plus').on('click', (e) => {
    e.stopPropagation();
    $(e.target).parent().parent().next('.new-todo-input').fadeToggle();
  })
}

function addTodo (){
  $(".new-todo-input").keypress(function(event){
    if(event.which === 13){
      $(".new-todo-input").fadeOut();
      var todo = $(this).val();
      $.ajax('/lists', {method: 'POST', data: todo})
      $(this).val("");
      //create a new li and add to ul
      $(this).siblings().children('.watch').append(`<li><span class="delete"><i class="fas fa-times"></i></span>${todo}</li>`)
    }
  });
}

function deleteTodo () {
  $("ul").on("click", ".delete", function(event){
    $(this).parent().fadeOut(500,function(){
      $(this).remove();
    });
    event.stopPropagation();
  });
}

function listDropdown () {
  $('.list-title').on('click', (e) => {
    const $list = $(e.target).closest('.list-title').siblings('.list-dropdown')
    $list.slideToggle();
    //$('.list-dropdown').not($list).slideToggle();
  })
}

$(document).ready(function() {
  signInButton();
  newListButton();
  newList();
  loginSlideDown();
  completed();
  newTodoPlus();
  addTodo();
  deleteTodo();
  listDropdown();
});
