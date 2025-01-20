
$(document).ready(function(){
  $("#showRegister").click(function(show){
    show.preventDefault()
    $("#loginForm").addClass("visually-hidden")
    $("#registerForm").removeClass("visually-hidden")
  })

  $("#showLogin").click(function(show){
    show.preventDefault()
    $("#registerForm").addClass("visually-hidden")
    $("#loginForm").removeClass("visually-hidden")
  })
})



//Este archivo ha sido creado por: Francisco Tejero Angel