function signInButton (){
  $('.login-dropdown').on('submit', async (event) => {
    event.preventDefault();
    const username = $('input[type="username"]').val();
    const password = $('input[type="password"]').val();
    await $.ajax('/login', {method: 'GET', data: username, password});
    document.location = '/'
  });
}



$(document).ready(function() {
  signInButton();
});
