// Lógica de paginación
let currentPage = 0
const pages = document.querySelectorAll(".form-page")
const table = document.querySelectorAll("table")
const nextBtn = document.getElementById("nextBtn")
const prevBtn = document.getElementById("prevBtn")

const title = document.getElementById("titles")
const pagesTitles = ["Clientes", "Viajes", "Reservas"]

function showPage(index) {
  title.textContent = pagesTitles[index]

  pages.forEach(function (page, i) {
    page.classList.toggle("active", i === index)
  })

  table.forEach(function (table, i) {
    table.style.display = i === index ? "table" : "none"
  })

  prevBtn.disabled = index === 0
  nextBtn.disabled = index === pages.length - 1
}

nextBtn.addEventListener("click", function () {
  if (currentPage < pages.length - 1) {

    currentPage++
    showPage(currentPage)
  }
})

prevBtn.addEventListener("click", function () {
  if (currentPage > 0) {

    currentPage--
    showPage(currentPage)
  }
})

showPage(currentPage)

// Ejercicio
class viaje {
  constructor(codigo, destino, precio, disponibilidad = true) {
    this.codigo = codigo
    this.destino = destino
    this.precio = precio
    this.disponibilidad = disponibilidad
  }
  getInfo() {
    return `Viaje [${this.codigo}] a ${this.destino}, precio: ${this.precio} euros`
  }
}

class vuelo extends viaje {
  constructor(codigo, destino, precio, aerolinea, duracion) {
    super(codigo, destino, precio)
    this.aerolinea = aerolinea
    this.duracion = duracion
  }
  getInfo() {
    return `${super.getInfo()}, Aerolínea: ${this.aerolinea}, Duración: ${this.duracion} horas`
  }
}

class hotel extends viaje {
  constructor(codigo, destino, precio, estrellas, tipoHabitacion) {
    super(codigo, destino, precio)
    this.estrellas = estrellas
    this.tipoHabitacion = tipoHabitacion
  }
  getInfo() {
    return `${super.getInfo()}, Hotel ${this.estrellas} estrellas, Habitación: ${this.tipoHabitacion}`
  }
}

class paquete extends viaje {
  constructor(codigo, destino, precio, vuelo, hotel) {
    super(codigo, destino, precio)
    this.vuelo = vuelo
    this.hotel = hotel
  }
  getInfo() {
    return `${super.getInfo()}\n - Vuelo: ${this.vuelo.getInfo()}\n - Hotel: ${this.hotel.getInfo()}`
  }
}

class cliente {
  constructor(nombre, apellido, email, telefono) {
    this.nombre = nombre
    this.apellido = apellido
    this.email = email
    this.telefono = telefono
  }
  getResumen() {
    return `Cliente: ${this.nombre} ${this.apellido}, Email: ${this.email}, Teléfono: ${this.telefono}`
  }
}

class reserva {
  constructor(cliente, viaje) {
    this.cliente = cliente
    this.viaje = viaje
  }
  getResumen() {
    return `${this.cliente.getResumen()}\nReservó: ${this.viaje.getInfo()}`
  }
}

function data() {
  const cliente = JSON.parse(localStorage.getItem("cliente")) || []
  const viaje = JSON.parse(localStorage.getItem("cliente")) || []
  const reserva = JSON.parse(localStorage.getItem("cliente")) || []
}

data()

function loadDAta() {
  const cliente = JSON.parse(localStorage.getItem("cliente")) || []
  const viaje = JSON.parse(localStorage.getItem("cliente")) || []
  const reserva = JSON.parse(localStorage.getItem("cliente")) || []
}

//Este archivo ha sido creado por: Francisco Tejero Angel