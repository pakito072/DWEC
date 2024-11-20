class Tarea {
  constructor(id, description) {
    this.id = id
    this.description = description
  }

  getDescription() {
    return this.description
  }

  setDescription(description) {
    this.description = description
  }
}

class TareaManager {
  constructor() {
    this.tasks = this.loadTasks() //Cuando inicia carga las tareas

  }

  loadTasks() {
    const cookies = Cookies.get("tasks") //Obtiene las tareas guardadas en cookies
    if(cookies) {
      const tasksArray = JSON.parse(cookies) //Convierte el JSON(cookies) en un array
      return tasksArray.map(task => new Tarea(task.id, task.description))
    }
    return [] //Si no hay tareas devuelve un array vacio, esto es para evitar errores a la hora de iniciar 

  }

  saveTasks() {
    Cookies.set("tasks", JSON.stringify(this.tasks), { expires: 7, sameSite: "None", secure: true }) //Guarda como JSON las tareas en las cookies

  }

  addTask(description) {
    const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1 

    const newTask = new Tarea(id, description)
    this.tasks.push(newTask); //Agrega la tarea a la lista de tareas
    this.saveTasks()
    this.readTasks()
  }

  updateTask(id, description) {
    const task = this.tasks.find(function (task) {
      return task.id === id
    })

    if (task) {
      task.setDescription(description)
      this.saveTasks()
      this.readTasks()

    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(function (task) {
      return task.id !== id
    })

    this.saveTasks()
    this.readTasks()

  }

  readTasks() {
    const taskBody = document.getElementById("taskBody")
    taskBody.innerHTML = ""
    this.tasks.forEach(function (task) {
      const row = document.createElement("tr") //Crea una fila
      row.innerHTML = 
      `
        <td>${task.id}</td>
        <td class="overflow-x-auto max-w">${task.description}</td>
        <td class="d-grid gap-2">
          <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#addTaskModal" onclick="prepareEditTask(${task.id})">Modificar</button>
          <button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#delTaskModal" onclick="prepareDeleteTask(${task.id})">Eliminar</button>
        </td>
      `
      taskBody.appendChild(row) //Añade la fila creada
    })

  }
}

const tareaManager = new TareaManager()
tareaManager.readTasks() //Muestra las tareas al cargar la pagina

let editingTaskId = null //Almacena el id que se edita
let taskToDelete = null //Almacena el id que se elimina

//Habilita el boton o no si hay descripcion
document.getElementById("description").addEventListener("input", function () {
  const description = this.value.trim() //Obtiene el texto sin espacios en blanco, por eso el trim
  const addBtn = document.getElementById("addBtn")
  addBtn.disabled = description === "" //Si la descripcion es vacia, deshabilita el boton
})

//Prepara el modal para añadar una tarea
function prepareAddTask() {
  document.getElementById("modalForm").reset() //Resetea el formulario del modal
  editingTaskId = null 
  document.getElementById("addBtn").disabled = true //Deshabilita el boton de añadir, aunque parezca redundante lo uso porque al terminar de crear una tarea, el boton se habilita por defecto 
}

//Prepara el modal para editar una tarea
function prepareEditTask(id) {
  const task = tareaManager.tasks.find(function(task) { 
    return task.id === id
  })

  if(task) {
    document.getElementById("description").value = task.getDescription() //Pone el texto en el input
    editingTaskId = id

  }
}

function addTask() {
  const description = document.getElementById("description").value.trim() 

  if(editingTaskId !== null) {
    tareaManager.updateTask(editingTaskId, description) //Si hay un id, actualiza la tarea
    editingTaskId = null
  }else {
    tareaManager.addTask(description) //Si no hay id, añade una nueva tarea
    
  }

  document.getElementById("description").value = "" //Resetea el input
}

function prepareDeleteTask(id) {
  taskToDelete = id
}

function deleteTask() {
  if(taskToDelete !== null) { //Si hay un id, elimina la tarea
  tareaManager.deleteTask(taskToDelete)
  taskToDelete = null
  }
}