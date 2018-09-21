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

const INNERTODOLISTS = `<div class="list-dropdown">
                          <h3>Watch</h3>
                          <ul class="watch">
                          </ul>
                          <h3>Eat</h3>
                          <ul class="eat">
                          </ul>
                          <h3>Buy</h3>
                          <ul class="buy">
                          </ul>
                          <h3>Read</h3>
                          <ul class="read">
                          </ul>
                          <h3>Play</h3>
                          <ul class="play">
                          </ul>
                          <h3>Other</h3>
                            <ul class="other">
                          </ul>
                        </div>`

function createTDL(obj, id) {
  const $todo = $("<div>").addClass("lists");
  $todo.attr('id', id);
  const header = `<div class="list-title">
                    <span class="deleteButton"><i class="fas fa-trash"></i></span>
                    <h2>${obj.title}</h2>
                    <span class="plus"><i class="fas fa-plus"></i></span>
                  </div>`;
  const input = `<input class="new-todo-input" type="text" placeholder="Add TODO">`
  $todo.append(header);
  $todo.append(input);
  $todo.append(INNERTODOLISTS);
  for (let key in obj) {
    if (key !== 'title') {
      obj[key].forEach(item => $todo.children('.list-dropdown').children(`.${key}`).append(`<li><span class="delete"><i class="fas fa-times"></i></span>${item}</li>`));
    }
  }


  sorted();

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
    const ids = Object.keys(data);
    ids.forEach(id => {
      $('section').append(createTDL(data[id], id));
    });
    $('.login-nav').text("Logout");
    $('#new-list').css('opacity', '1');
    $('#new-list').css('display', 'block');
    $('.login-nav').addClass('logout');
    $('.login-nav').off('click');
    $('.login-nav').css("margin-top", "50px");

    const $username = $('input[type="username"]').val();
    $('.welcome').css('opacity', '1');
    $('.name').text(`${$username}`)
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
    $('.welcome').css('opacity', '0')
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
      if (todoText) {

        $(this).val("");
        //create a new li and add to ul
        const $todo = $("<div>").addClass("lists");
        const header = `<div class="list-title">
                          <span class="deleteButton"><i class="fas fa-trash"></i></span>
                          <h2>${todoText}</h2>
                          <span class="plus"><i class="fas fa-plus"></i></span>
                        </div>`;
        const input = `<input class="new-todo-input" type="text" placeholder="Add TODO">`

        $todo.append(header);
        $todo.append(input);
        $todo.append(INNERTODOLISTS);
        sorted();
        $(".todos").prepend($todo)
        const list = {title: todoText}
        $.ajax('/lists', { method: 'POST', data: list })
      } else {
        console.log("err")
      }
    }
  });
}

function completed () {
    $(document).on("click", "li", function(){
      $(this).toggleClass("completed");
  });
}

function newTodoPlus () {
  $(document).on('click', '.fa-plus', (e) => {
    e.stopPropagation();
    $(e.target).parent().parent().next('.new-todo-input').fadeToggle();
  })
}

function addTodo (){
  $(document).on("keypress", ".new-todo-input", function(event){
    if(event.which === 13){
      $(".new-todo-input").fadeOut();
      var todo = $(this).val();
      const id = $(this).parent().attr("id")
      $.ajax('/lists/item', {method: 'POST', data: {todo, id}})
      $(this).val("");
      //create a new li and add to ul
      $(this).siblings().children('.watch').append(`<li><span class="delete"><i class="fas fa-times"></i></span>${todo}</li>`)
    }
  });
}

function deleteTodo () {
  $(document).on("click", ".delete", function(event){
    $(this).parent().fadeOut(500,function(){
      const deletedItem = $(this).text();
      const delItemId = $(this).parent().parent().parent().attr('id');
      $.ajax('/lists/item', {method: 'DELETE', data: {deletedItem, delItemId}})
      $(this).remove();
    });
    event.stopPropagation();
  });
}

function deleteList () {
  $(document).on("click", ".deleteButton", function(event){
    $(this).closest('.lists').fadeOut(500,function(){
      const listName = $(this).closest('.lists').children().children('h2').text();
      const lId = $(this).closest('.lists').attr('id');
      $.ajax('/lists', {method: 'DELETE', data: {listName, lId}})
      $(this).closest('.lists').remove();
    });
    event.stopPropagation();
  });
}

function listDropdown () {
  $(document).on('click', '.list-title', (e) => {
    const $list = $(e.target).closest('.list-title').siblings('.list-dropdown')
    $list.slideToggle();
  })
}

function sorted () {
  $('ul').sortable({
    dropOnEmpty: true,
    connectWith: $('ul'),
    receive: function(event, ui) {
      const listItem = $(ui.item[0]).text();
      const catName = $(ui.item[0]).parent().prev().text();
      const listId = $(ui.item[0]).parent().parent().parent().attr('id')
      $.ajax('/lists', {method: 'PUT', data: { listItem, catName, listId }});
    }
  });
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
  deleteList();
  sorted();
});
