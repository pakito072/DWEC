const arrs = array => {

  let suma = array.map(array[0], array[1] => array[0] + array[1])
  
  return {suma}
}

console.log(arrs([[1, 2, 3, 4, 5], [10, 20, 30, 40, 50]]))
