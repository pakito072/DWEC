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
    this.tasks = this.loadTasks()

  }

  loadTasks() {
    const cookies = Cookies.get("tasks")
    if(cookies) {
      const tasksArray = JSON.parse(cookies)
      return tasksArray.map(task => new Tarea(task.id, task.description))
    }

  }

  saveTasks() {
    Cookies.set("tasks", JSON.stringify(this.tasks), { expires: 7 })

  }

  addTask(description) {
    const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1

    const newTask = new Tarea(id, description)
    this.tasks.push(newTask);
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

  deleteTask(id, description) {
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
      const row = document.createElement("tr")
      row.innerHTML = 
      `
        <td>${task.id}</td>
        <td>${task.description}</td>
        <td class="d-grid gap-2">
          <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#addTaskModal" onclick="prepareEditTask(${task.id})">Modificar</button>
          <button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#delTaskModal" onclick="prepareDeleteTask(${task.id})">Eliminar</button>
        </td>
      `
      taskBody.appendChild(row)
    })

  }
}

const tareaManager = new TareaManager()
tareaManager.readTasks()

let editingTaskId = null
let taskToDelete = null

function prepareAddTask() {
  document.getElementById("modalForm").reset()
  editingTaskId = null

}

function prepareEditTask(id) {
  const task = tareaManager.tasks.find(function(task) {
    return task.id === id
  })

  if(task) {
    document.getElementById("description").value = task.getDescription()
    editingTaskId = id

  }
}

function addTask() {
  const description = document.getElementById("description").value

  if(editingTaskId !== null) {
    tareaManager.updateTask(editingTaskId, description)
    editingTaskId = null
  }else {
    tareaManager.addTask(description)
  }

  document.getElementById("description").value = ""
}

function prepareDeleteTask(id) {
  taskToDelete = id
}

function deleteTask(id) {
  if(taskToDelete !== null) {
  tareaManager.deleteTask(id)
  taskToDelete = null
  location.reload()
  }
}