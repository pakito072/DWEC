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
    this.task = this.loadTask()

  }

  addTask(description) {
    const id = this.task.length ? this.task[this.task.length - 1].id + 1 : 1

    const newTask = new Task(id, description)
    this.task.push(newTask);
    this.saveTask()

    return newTask
  }

  readTask() {
    return this.task

  }


  updateTask(id, description) {
    const task = this.task.find(function (task) {
      return task.id === id
    })

    if (task) {
      task.setDescription(description)
      this.saveTask()
      return task

    }
    return null
  }

  deleteTask(id, description) {
    const index = this.task.find(function (task) {
      return task.id === id
    })

    if (index !== -1) {
      const taskTerminated = this.task.splice(index, 1)[0]
      this.saveTask()

      return taskTerminated

    }
    return null
  }

  saveTask() {
    document.cookie = "Tareas=" + JSON.stringify(this.task) + "; path=/; max-age=3600"

  }

  loadTask() {
    const cookies = document.cookie.split("; ").find(function (row) {
      return row.startsWith("Tareas=")
    })

    if (cookies) {
      const taskJSON = cookies.split("=")[1]

      return JSON.parse(taskJSON)

    }
    return []
  }
}

function addToTable(task) {
  const taskBody = document.querySelector("tbody")
  const row = document.createElement("tr")

  row.innerHTML = `
    <td>${task.id}</td>
    <td>${task.description}</td>
    <td class="d-grid gap-2">
      <button id="editTask" class="btn btn-warning btn-sm" data-bs-toggle="modal"
        data-bs-target="#addTaskModal">Modificar</button>
      <button id="delTask" class="btn btn-danger btn-sm" data-bs-toggle="modal"
        data-bs-target="#delTaskModal">Eliminar</button>
    </td>
  `

  tBody.appendChild(row)

}

