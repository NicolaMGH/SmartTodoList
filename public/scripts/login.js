function signInButton (){
  $('.login-dropdown').on('submit', async (event) => {
    event.preventDefault();
    const username = $('input[type="username"]').val();
    const password = $('input[type="password"]').val();
    console.log(username, password);

    const status = await $.ajax('/login', {method: 'PUT', data: {username, password}})
    if (status) {
      document.location = '/';
    }
  });
}



$(document).ready(function() {
  signInButton();
});
