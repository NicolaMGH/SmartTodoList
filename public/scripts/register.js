function register() {
  const $error = $('#errorRegister');
  $('.login-dropdown').on('submit', async(event) => {
    $error.hide({
      opacity: "toggle"
    });
    event.preventDefault();
    const username = $('input[type="username"]').val();
    const email = $('input[type="email"]').val();
    const password = $('input[type="password"]').val();

    const status = await $.ajax('/users', { method: 'POST', data: { username, email, password } })
    if (status) {
      $error.hide({
        opacity: "toggle"
      });
      document.location = '/';
    } else {
      $error.show({
        opacity: "toggle"
      });
      $error.text('Please enter a valid Username, E-mail, and Password');
    }
  });
}

function faded(e) {
  $('.login-dropdown').animate({ opacity: 1 }, { duration: 2500 })
  $('.login-header').animate({ opacity: 1 }, { duration: 1500 })
  $('.login-text').animate({ opacity: 1 }, { duration: 1500 })
}

function signIn () {
  $('.sign-in-register').on('click', () => {
    document.location = '/';
  })
}

$(document).ready(function() {
  register();
  faded();
  signIn();
});
