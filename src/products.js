//Maneja la informacion de los productos

import { getAllProducts, getProductsById } from './requests.js'
import { createProductCard, flatArray, flatternArray } from './utils.js'

export const initProducts = async () => {
  try {
    const products = await getAllProducts()

    //Comprobacion de obtener los productos
    if (!products || products.length === 0) return
    flatternArray(products).forEach((product) => createProductCard(product))
  } catch (error) {
    console.error('Error al Obtener los productos', error)
  }
}

export const initProductsDetails = async () => {
  //obtener el id de la url
  const params = new URLSearchParams(window.location.search)
  const productId = params.get('id')

  if (!productId) {
    console.error('No se proporcionó un ID de producto')
    return
  }

  try {
    const product = await getProductsById(productId)
    if (!product) return
    document.querySelector('.product-title').textContent = product.title
    document.querySelector('.product-description').textContent =
      product.description
    document.querySelector('.product-price').textContent = `$ ${product.price}`
    document.querySelector('.img-container img').src = product.images[0]
  } catch (error) {
    console.error('Error al Obtener los productos', error)
  }
}
