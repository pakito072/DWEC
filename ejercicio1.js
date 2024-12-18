const array10 = array => {

  let cuadrados = array.map(num => num * num)

  let pares = array.filter(num => num % 2 === 0)

  let sumatorio = array.reduce((acnum, num) => acnum + num, 0)


  return {array, cuadrados, pares, sumatorio}
}

console.log(array10 ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
