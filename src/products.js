//Maneja la informacion de los productos

import { getAllProducts } from './requests.js'
import { createProductCard, flatArray, flatternArray } from './utils.js'

export const initProducts = async () => {
  try {
    const products = await getAllProducts()
    console.log(products);
    
    //Comprobacion de obtener los productos
    if (!products || products.length === 0) return
    flatternArray(products).forEach((product) => createProductCard(product))
  } catch (error) {
    console.error('Error al Obtener los productos', error)
  }
}
