
const arrayStr = string => {

  let mayus = string.map(word => word.toUpperCase())

  let ordenado = string.sort()

  let empiezaM = string.some(word => word.startsWith("M"))

  let caracter4 = string.every(word => word.length >= 4)

  return {normal, mayus, ordenado, empiezaM, caracter4}
}

console.log(arrayStr(["Cadiz", "Granada", "Cordoba","Sevilla", "Jerez"]))
