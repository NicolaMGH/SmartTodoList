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
                        </div>`

let CURRENTLIST = 0;

function createTDL(obj, id) {
  const $todo = $("<div>").addClass("lists");
  $todo.attr('id', id);
  const header = `<div class="list-title">
                    <div>
                      <span class="deleteButton"><i class="fas fa-trash"></i></span>
                      <span class="share"><i class="fas fa-share"></i></span>
                    </div>
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

const renderTDL = async() => {
  const data = await $.ajax('/lists/user_lists', { method: 'GET' });
  const ids = Object.keys(data);
  ids.forEach(id => {
    $('section').append(createTDL(data[id], id));
  });
}


function signInButton() {
  $('.sign-in').on('click', async(event) => {
    event.preventDefault();
    $('.login-dropdown').fadeToggle();
    await $.ajax('/test', { method: 'GET' });
    await renderTDL();
    $('.todos').animate({ opacity: 1 }, { duration: 2000 })
    $('.login-nav').text("Logout");
    $('#new-list').animate({ opacity: 1 }, { duration: 1500 })
    $('.background').animate({ opacity: 1 }, { duration: 1500 })
    // $('#new-list').css('opacity', '1');
    $('#new-list').css('display', 'block');
    $('.login-nav').addClass('logout');
    $('.login-nav').off('click');

    const $username = $('input[type="username"]').val();
    $('.name').text(`${$username}`)
    // $('input').val('');

    onLogout();
  });
}

function loginSlideDown() {
  $('.login-nav').on('click', (event) => {
    $('.login-dropdown').fadeToggle();
  })
}

function onLogout() {
  $('#logout').on('click', async(event) => {
    await $.ajax('/logout', { method: 'POST' });
    document.location = '/';
  })
}

function newListButton() {
  $("#new-list").click(function() {
    $(".new-list-input").fadeToggle();
    $(".new-list-input").focus();
  });
}

function newList() {
  $(".new-list-input").keypress(async function(event) {
    if (event.which === 13) {
      $(".new-list-input").fadeToggle();
      //grabbing new todo text from input
      var todoText = $(this).val();
      if (todoText) {
        const list = { title: todoText }
        const [id] = await $.ajax('/lists', { method: 'POST', data: list })
        $(this).val("");
        //create a new li and add to ul
        const $todo = $("<div>").addClass("lists");
        $todo.attr('id', id);
        const header = `<div class="list-title">
                          <div>
                            <span class="deleteButton"><i class="fas fa-trash"></i></span>
                            <span class="share"><i class="fas fa-share"></i></span>
                          </div>
                          <h2>${todoText}</h2>
                          <span class="plus"><i class="fas fa-plus"></i></span>
                        </div>`;
        const input = `<input class="new-todo-input" type="text" placeholder="Add TODO">`

        $todo.append(header);
        $todo.append(input);
        $todo.append(INNERTODOLISTS);
        // await sorted();
        $(".todos").prepend($todo)
      } else {
        console.log("err")
      }
    }
  });
}

function completed() {
  $(document).on("click", "li", function() {
    $(this).toggleClass("completed");
  });
}

function newTodoPlus() {
  $(document).on('click', '.fa-plus', (e) => {
    e.stopPropagation();
    $(e.target).parent().parent().next('.new-todo-input').fadeToggle();
    $('.new-todo-input').focus();
  })
}

function addTodo() {
  $(document).on("keypress", ".new-todo-input", async function(event) {
    if (event.which === 13) {
      $(".new-todo-input").fadeOut();
      const todo = $(this).val();
      const id = $(this).parent().attr("id")
      const cat = await $.ajax('/lists/item', { method: 'POST', data: { todo, id } })
      $(this).val("");
      console.log($(this).siblings().children())
      //create a new li and add to ul
      $(this).siblings().children(`.${cat}`).append(`<li class="highlight"><span class="delete"><i class="fas fa-times"></i></span>${todo}</li>`)
    }
  });
}

function deleteTodo() {
  $(document).on("click", ".delete", function(event) {
    $(this).parent().fadeOut(500, function() {
      const deletedItem = $(this).text();
      const listId = $(this).parent().parent().parent().attr('id');
      $.ajax('/lists/item', { method: 'DELETE', data: { deletedItem, listId } })
      $(this).remove();
    });
    event.stopPropagation();
  });
}

function deleteList() {
  $(document).on("click", ".deleteButton", function(event) {
    $(this).closest('.lists').fadeOut(500, function() {
      const listName = $(this).closest('.lists').children().children('h2').text();
      const listId = $(this).closest('.lists').attr('id');

      $.ajax('/lists', { method: 'DELETE', data: { listName, listId } })
      $(this).closest('.lists').remove();
    });
    event.stopPropagation();
  });
}

function listDropdown() {
  $(document).on('click', '.list-title', (e) => {
    const $list = $(e.target).closest('.list-title').siblings('.list-dropdown')
    $list.slideToggle();
  })
}

function sorted() {
  $(document).on("click", (event) => {
    $('ul').sortable({
      dropOnEmpty: true,
      connectWith: $('ul'),
      receive: function(event, ui) {
        const listItem = $(ui.item[0]).text();
        const catName = $(ui.item[0]).parent().prev().text();
        const listId = $(ui.item[0]).parent().parent().parent().attr('id')
        $.ajax('/lists', { method: 'PUT', data: { listItem, catName, listId } });
      }
    });
  })
}

function analytics() {
  $('#analytics').on('click', (event) => {
    document.location = '/analytics'
  })
}

function fadedHome() {
  $('.todos').animate({ opacity: 1 }, { duration: 1000 })
}

function shareList() {
  $(document).on("click", ".share", function(event) {
    $('.form-group').children().val('');
    $(".errorShare").hide({
      opacity: "toggle"
    });
    event.stopPropagation();
    const listId = $(this).closest('.lists').attr('id');
    CURRENTLIST = listId;
    $('.shareForm').fadeToggle();
    $('.form-group').children().focus();
  });
}

function shareForm() {
  const $error = $(".errorShare");
  $('.shareForm').on('submit', async(e) => {
    $error.hide({
      opacity: "toggle"
    });
    e.preventDefault();
    const username = $(e.target).children().children('input').val();

    const status = await $.ajax('/share', { method: 'PUT', data: { listid: CURRENTLIST, username } });
    if (status) {
      $('.shareForm').fadeOut();
      $error.hide({
        opacity: "toggle"
      });
      $(e.target).children().children('input').val('');
    } else {
      // invalid username;
      $error.show({
        opacity: "toggle"
      });
      $error.text('Invalid Username');
    }
  });
}

$(document).ready(function() {
  renderTDL();
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
  onLogout();
  analytics();
  fadedHome();
  shareList();
  shareForm();
});
