//Opcional: funcionalidades compartidas

//FUNCION PARA APLANAR y TRANSFORMAR ARRAY DE ARRAYS
export const flatternArray = (array) => {
  return array.flatMap((subarray) => subarray)
}

//FUNCION PARA APLANAR ARRAYS
export const flatArray = (array) => {
  return array.flat()
}

//OBTENER ITEMS ALEATORIOS
export const getRandomItems = (array, count = 5) => {
  return array.sort(() => 0.5 - Math.random()).slice(0, count)
}

