function signInButton() {
  const $error = $('#errorLogin');
  $('.sign-in').on('click', async(event) => {
    $error.hide({
      opacity: "toggle"
    });
    event.preventDefault();
    const username = $('input[type="username"]').val();
    const password = $('input[type="password"]').val();
    console.log(username, password);

    const status = await $.ajax('/login', { method: 'PUT', data: { username, password } })
    if (status) {
      $error.hide({
        opacity: "toggle"
      });
      document.location = '/';
    } else {
      $error.show({
        opacity: "toggle"
      });
      $error.text('Incorrect Username or Password');
    }
  });
}

function faded(e) {
  $('.login-dropdown').animate({ opacity: 1 }, { duration: 2500 })
  $('.login-header').animate({ opacity: 1 }, { duration: 1500 })
  $('.login-text').animate({ opacity: 1 }, { duration: 1500 })
}

function registerButtonHome() {
  $('.register').on('click', (event) => {
    event.preventDefault();
    document.location = '/'
  })
}


$(document).ready(function() {
  signInButton();
  faded();
  registerButtonHome();
});
