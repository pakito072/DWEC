
$(document).ready(function(){
  $("#showRegister").click(function(event){
    event.preventDefault()
    $("#loginForm").addClass("visually-hidden")
    $("#registerForm").removeClass("visually-hidden")
  })

  $("#showLogin").click(function(show){
    show.preventDefault()
    $("#registerForm").addClass("visually-hidden")
    $("#loginForm").removeClass("visually-hidden")
  })

  $("registerForm").submit(function(event){
    event.preventDefault()

    const email = $("#registerEmail").val()
    const password = $("#registerPassword").val()
    const confirmPass = $("#registerConfirmPassword").val()

    function validateEmail (email){
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
      return emailPattern.test(email)
    }

    if (!validateEmail(email)){
      alert("El email no es válido")
      return
    }

    if (password !== confirmPass){
      alert("Las contraseñas no coinciden")
      return
    }

    const userData = {
      name: $("#registerName").val(),
      email: email,
      password: password
    }

    localStorage.setItem("userData", JSON.stringify(userData))
    alert("Usuario registrado correctamente")
    $("#registerForm").trigger("reset")
    $("#showLogin").click()
  })

  $("#loginForm").submit(function(event){
    event.preventDefault()

    const email = $("#loginEmail").val()
    const password = $("#loginPassword").val()

    const userData = JSON.parse(localStorage.getItem("userData"))

    if (userData.email === email && userData.password === password){
      alert("Usuario logueado correctamente")
      $("#loginForm").trigger("reset")
    } else {
      alert("Usuario o contraseña incorrectos")
    }
  })
})



//Este archivo ha sido creado por: Francisco Tejero Angel