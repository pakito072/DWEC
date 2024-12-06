class Viaje {
  constructor(codigo, destino, precio, disponibilidad = true) {
    this.codigo = codigo;
    this.destino = destino;
    this.precio = parseFloat(precio).toFixed(2);
    this.disponibilidad = disponibilidad;
  }
  getInfo() {
    return `Viaje [${this.codigo}] a ${this.destino}, precio: ${this.precio} euros`;
  }
}

class Vuelo extends Viaje {
  constructor(codigo, destino, precio, aerolinea, duracion) {
    super(codigo, destino, precio);
    this.aerolinea = aerolinea;
    this.duracion = duracion;
  }
  getInfo() {
    return `${super.getInfo()}, Aerolínea: ${this.aerolinea}, Duración: ${this.duracion} horas`;
  }
}

class Hotel extends Viaje {
  constructor(codigo, destino, precio, estrellas, tipoHabitacion) {
    super(codigo, destino, precio);
    this.estrellas = estrellas;
    this.tipoHabitacion = tipoHabitacion;
  }
  getInfo() {
    return `${super.getInfo()}, Hotel ${this.estrellas} estrellas, Habitación: ${this.tipoHabitacion}`;
  }
}

class Cliente {
  constructor(nombre, apellido, email, telefono) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.telefono = telefono;
  }
  getResumen() {
    return `Cliente: ${this.nombre} ${this.apellido}, Email: ${this.email}, Teléfono: ${this.telefono}`;
  }
}

class Reserva {
  constructor(cliente, viaje, fecha) {
    this.cliente = cliente;
    this.viaje = viaje;
    this.fecha = fecha;
  }
  getResumen() {
    return `${this.cliente.getResumen()}\nReservó: ${this.viaje.getInfo()}`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const clienteBtn = document.getElementById("add-client-btn");
  const viajeBtn = document.getElementById("add-trip-btn");
  const reservaBtn = document.getElementById("add-reservation-btn");

  const tableClientes = document.getElementById("table-clientes");
  const tableViajes = document.getElementById("table-viaje");
  const tableReservas = document.getElementById("table-reservas");

  const clienteSelect = document.getElementById("cliente-select");
  const viajeSelect = document.getElementById("viaje-select");

  function loadData() {
    const clientesSaves = JSON.parse(localStorage.getItem("clientes")) || [];
    const viajesSaves = JSON.parse(localStorage.getItem("viajes")) || [];
    const reservasSaves = JSON.parse(localStorage.getItem("reservas")) || [];

    clientesSaves.forEach(cliente => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${cliente.nombre}</td>
              <td>${cliente.apellido}</td>
              <td>${cliente.email}</td>
              <td>${cliente.telefono}</td>
              <td><button class="btn btn-danger">Eliminar</button></td>
          `;
      tableClientes.appendChild(row);

      const option = document.createElement("option");
      option.value = cliente.email;
      option.textContent = `${cliente.nombre} ${cliente.apellido}`;
      clienteSelect.appendChild(option);
    });

    viajesSaves.forEach(viaje => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${viaje.codigo}</td>
              <td>${viaje.destino}</td>
              <td>${viaje.precio}€</td>
              <td>${viaje.tipo}</td>
              <td><button class="btn btn-danger">Eliminar</button></td>
          `;
      tableViajes.appendChild(row);

      const optionViaje = document.createElement("option");
      optionViaje.value = viaje.codigo;
      optionViaje.textContent = `(${viaje.codigo}) ${viaje.destino}`;
      viajeSelect.appendChild(optionViaje);
    });

    reservasSaves.forEach(reserva => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${reserva.cliente.nombre} ${reserva.cliente.apellido}</td>
              <td>${reserva.viaje.codigo}</td>
              <td>${reserva.fecha}</td>
              <td><button class="btn btn-danger">Eliminar</button></td>
          `;
      tableReservas.appendChild(row);
    });
  }

  loadData();

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function addCliente(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
  
    if (nombre && apellido && validateEmail(email) && telefono) {
      const newCliente = new Cliente(nombre, apellido, email, telefono);
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${newCliente.nombre}</td>
              <td>${newCliente.apellido}</td>
              <td>${newCliente.email}</td>
              <td>${newCliente.telefono}</td>
              <td><button class="btn btn-danger">Eliminar</button></td>
          `;
      tableClientes.appendChild(row);
  
      const option = document.createElement("option");
      option.value = newCliente.email;
      option.textContent = `${newCliente.nombre} ${newCliente.apellido}`;
      clienteSelect.appendChild(option);
  
      const clientesSaves = JSON.parse(localStorage.getItem("clientes")) || [];
      clientesSaves.push(newCliente);
      localStorage.setItem("clientes", JSON.stringify(clientesSaves));
  
      // Limpiar campos
      document.getElementById("nombre").value = "";
      document.getElementById("apellido").value = "";
      document.getElementById("email").value = "";
      document.getElementById("telefono").value = "";
    } else {
      alert("Rellena los campos correctamente.");
    }
  }

  clienteBtn.addEventListener("click", addCliente);

  function addViaje(event) {
    event.preventDefault();
    const codigo = document.getElementById("codigo-viaje").value;
    const destino = document.getElementById("destino").value;
    const precio = document.getElementById("precio").value;
    const tipo = document.getElementById("type-select").value;
  
    if (codigo && destino && precio > 0) {
      const newViaje = new Viaje(codigo, destino, precio);
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${newViaje.codigo}</td>
              <td>${newViaje.destino}</td>
              <td>${newViaje.precio}€</td>
              <td>${tipo}</td>
              <td><button class="btn btn-danger">Eliminar</button></td>
          `;
      tableViajes.appendChild(row);
  
      const optionViaje = document.createElement("option");
      optionViaje.value = newViaje.codigo;
      optionViaje.textContent = `${newViaje.codigo} - ${newViaje.destino}`;
      viajeSelect.appendChild(optionViaje);
  
      const viajesSaves = JSON.parse(localStorage.getItem("viajes")) || [];
      viajesSaves.push({ codigo: newViaje.codigo, destino: newViaje.destino, precio: newViaje.precio, tipo });
      localStorage.setItem("viajes", JSON.stringify(viajesSaves));
  
      // Limpiar campos
      document.getElementById("codigo-viaje").value = "";
      document.getElementById("destino").value = "";
      document.getElementById("precio").value = "";
      document.getElementById("type-select").selectedIndex = 0; // Resetea el select
    } else {
      alert("Rellena los campos correctamente.");
    }
  }

  viajeBtn.addEventListener("click", addViaje);

  function addReserva(event) {
    event.preventDefault();
    const cliente = clienteSelect.options[clienteSelect.selectedIndex].text;
    const viaje = viajeSelect.options[viajeSelect.selectedIndex].text;
  
    // Obtener la fecha actual en formato legible
    const fecha = new Date().toLocaleDateString(); // Esto te dará la fecha en formato "dd/mm/yyyy"
  
    if (cliente && viaje) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${cliente}</td>
        <td>${viaje}</td>
        <td>${fecha}</td>
        <td><button class="btn btn-danger">Eliminar</button></td>
      `;
      tableReservas.appendChild(row);
  
      const reservasSaves = JSON.parse(localStorage.getItem("reservas")) || [];
      reservasSaves.push({ cliente, viaje, fecha });
      localStorage.setItem("reservas", JSON.stringify(reservasSaves));
  
      // Limpiar campos
      clienteSelect.selectedIndex = 0; // Resetea el select de cliente
      viajeSelect.selectedIndex = 0; // Resetea el select de viaje
    } else {
      alert("Rellena los campos correctamente.");
    }
  }

  reservaBtn.addEventListener("click", addReserva);

  function deleteRow(event) {
    if (event.target.classList.contains("btn-danger")) { // Verifica si el botón de eliminar fue presionado
      const row = event.target.closest("tr"); // Encuentra la fila más cercana
      const tabla = row.closest("table"); // Encuentra la tabla a la que pertenece la fila
  
      if (tabla === tableClientes) {
        const clientesSaves = JSON.parse(localStorage.getItem("clientes")) || [];
        const nombreCliente = row.cells[0].textContent + " " + row.cells[1].textContent; // Obtiene el nombre completo del cliente
        const nuevosClientes = clientesSaves.filter(cliente => `${cliente.nombre} ${cliente.apellido}` !== nombreCliente); // Filtra el cliente a eliminar
        localStorage.setItem("clientes", JSON.stringify(nuevosClientes)); // Actualiza el localStorage
      } else if (tabla === tableViajes) {
        const viajesSaves = JSON.parse(localStorage.getItem("viajes")) || [];
        const codigoViaje = row.cells[0].textContent; // Obtiene el código del viaje
        const nuevosViajes = viajesSaves.filter(viaje => viaje.codigo !== codigoViaje); // Filtra el viaje a eliminar
        localStorage.setItem("viajes", JSON.stringify(nuevosViajes)); // Actualiza el localStorage
      } else if (tabla === tableReservas) {
        const reservasSaves = JSON.parse(localStorage.getItem("reservas")) || [];
        const clienteReserva = row.cells[0].textContent; // Obtiene el nombre del cliente
        const viajeReserva = row.cells[1].textContent; // Obtiene el viaje
        const nuevasReservas = reservasSaves.filter(reserva => 
          reserva.cliente !== clienteReserva || reserva.viaje !== viajeReserva // Filtra la reserva a eliminar
        );
        localStorage.setItem("reservas", JSON.stringify(nuevasReservas)); // Actualiza el localStorage
      }
  
      row.remove(); // Elimina la fila de la tabla
    }
  }

  document.body.addEventListener("click", deleteRow);
});