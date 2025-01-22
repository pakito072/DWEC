$(document).ready(function () {
  // Obtener usuarios del localStorage o inicializar un array vacío
  const users = JSON.parse(localStorage.getItem("users")) || []

  // Función para mostrar un mensaje en un toast
  function showToast(message) {
    $("#toastBody").text(message)
    $("#toast").toast("show")
  }

  // Mostrar formulario de registro y ocultar el de login
  $("#showRegister").click(function (event) {
    event.preventDefault()
    $("#loginForm").addClass("visually-hidden")
    $("#registerForm").removeClass("visually-hidden")
  })

  // Mostrar formulario de login y ocultar el de registro
  $("#showLogin").click(function (event) {
    event.preventDefault()
    $("#registerForm").addClass("visually-hidden")
    $("#loginForm").removeClass("visually-hidden")
  })

  // Manejar el envío del formulario de registro
  $("#registerForm").submit(function (event) {
    event.preventDefault()

    const email = $("#registerEmail").val()
    const password = $("#registerPassword").val()
    const confirmPass = $("#registerConfirmPassword").val()

    // Validar email y contraseñas
    if (!email.includes("@")) {
      showToast("El email no es válido")
      return
    }

    if (password !== confirmPass) {
      showToast("Las contraseñas no coinciden")
      return
    }

    // Crear objeto de usuario y guardarlo en localStorage
    const userData = {
      name: $("#registerName").val(),
      email: email,
      password: password
    }

    users.push(userData)
    localStorage.setItem("users", JSON.stringify(users))
    showToast("Usuario registrado correctamente")
    $("#registerForm").trigger("reset")
    $("#showLogin").trigger("click")
  })

  // Manejar el envío del formulario de login
  $("#loginForm").submit(function (event) {
    event.preventDefault()

    const email = $("#loginEmail").val()
    const password = $("#loginPassword").val()

    // Buscar usuario en el array de usuarios
    const user = users.find(user => user.email === email && user.password === password)

    if (user) {
      $("#loginForm").trigger("reset")
      window.location.href = "admin.html"
    } else {
      showToast("Usuario o contraseña incorrectos")
    }
  })

  // Configurar DataTable en la página de administración
  if (window.location.pathname.includes("admin.html")) {
    const table = $("#eventsTable").DataTable({
      language: {
        processing: "Procesando...",
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ registros",
        info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
        infoFiltered: "(filtrado de un total de _MAX_ registros)",
        loadingRecords: "Cargando...",
        zeroRecords: "No se encontraron resultados",
        emptyTable: "Ningún dato disponible en esta tabla",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        },
        aria: {
          sortAscending: ": Activar para ordenar la columna de manera ascendente",
          sortDescending: ": Activar para ordenar la columna de manera descendente"
        }
      }
    })

    // Añadir usuarios a la tabla
    users.forEach(user => {
      table.row.add([
        user.name,
        user.email,
        user.password
      ]).draw()
    })
  }
})




//Este archivo ha sido creado por: Francisco Tejero Angel