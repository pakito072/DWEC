const arrFrase = arrStr => {

  let unido = arrStr.reduce((acc, curr) => acc + " " + curr)

  let invertidoUnido = arrStr.reverse().reduce((acc, curr) => acc + " " + curr)

  let incluyeBella = unido.includes("bella")

  return {unido, invertidoUnido, incluyeBella}
}

console.log(arrFrase(["La", "vida", "es", "bella", "y", "divertida"]))
