
const arrNumRandom = array => {
  const numRandom = []

  for (let i = 0; i < array; i++) {
    const num = Math.floor(Math.random() * 100) + 1
    numRandom.push(num)

  }

  let maximo = Math.max(...numRandom)

  let minimo = Math.min(...numRandom)

  let impar = numRandom.filter(num => num % 2 !== 0).length

  return {numRandom, maximo, minimo, impar}
}

console.log(arrNumRandom(10));

