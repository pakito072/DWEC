
const arrEstudiantes = strArr => {
  
  let aprovados = strArr.filter(estudiante => estudiante.nota >= 5)

  let mayorEdad = strArr.sort((a, b) => b.edad - a.edad)

  let nombre = strArr.map(estudiante => estudiante.nombre)

  let promedio = strArr.reduce((acc, estudiante) => acc + estudiante.nota, 0) / 4

  return {aprovados, mayorEdad, nombre, promedio}
}

console.log(arrEstudiantes([
  { nombre: "Ana", edad: 20, nota: 8 },
  { nombre: "Luis", edad: 22, nota: 5 },
  { nombre: "María", edad: 19, nota: 7 },
  { nombre: "Carlos", edad: 21, nota: 4 }
]));
