function signInButton (){
  $('.login-dropdown').on('submit', async (event) => {
    event.preventDefault();
    $('.login-dropdown').fadeToggle();
    await $.ajax('/login', {method: 'GET'});
    // $('input').val('');
    document.location = '/'
  });
}



$(document).ready(function() {
  signInButton();
});
