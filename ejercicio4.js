const arrayStr = string => {

  let letras5 = string.filter(palabra => palabra.length > 5)

  let invertido = string.map(palabra => palabra.split("").reverse().join(""))

  let masLargo = string.sort((a, b) => b.length - a.length)

  return {letras5, invertido, masLargo}
}

console.log(arrayStr(["gubernamental", "droga", "polonia", "esternocleidomastoideo", "furro", "otorrinolaringologo", "supercalifragilisticoespialidoso", "monja"]));