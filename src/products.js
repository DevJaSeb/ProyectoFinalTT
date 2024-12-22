//Maneja la informacion de los productos

import { addToCart } from './cart.js'
import { getAllProducts, getProductsById } from './requests.js'
import { flatternArray } from './utils.js'

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

    // Obtener referencias a los elementos del contador y botón de añadir
    const countDisplay = document.querySelector('.number')
    const buttonUp = document.querySelector('.button-up')
    const buttonDown = document.querySelector('.button-down')
    const addToCartButton = document.querySelector('.add-to-cart')
    let quantity = 1 // Cantidad inicial

    // Manejar incremento de cantidad
    buttonUp.addEventListener('click', () => {
      quantity++
      countDisplay.textContent = quantity
    })

    // Manejar decremento de cantidad
    buttonDown.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--
        countDisplay.textContent = quantity
      }
    })

    // Manejar añadir al carrito
    addToCartButton.addEventListener('click', () => {
      const productToAdd = {
        ...product,
        quantity: quantity,
      }
      addToCart(productToAdd)
      alert('Producto agregado al carrito')
    })
  } catch (error) {
    console.error('Error al Obtener los productos', error)
  }
}

//CREACION DE CARDS
export const createProductCard = (product) => {
  //Detecta si estamos en index o products
  const isIndex =
    window.location.pathname === '/index.html' ||
    window.location.pathname === '/'
  const productPath = isIndex ? './pages/producto.html' : './producto.html'
  const container = document.querySelector('.cards-container')

  //creamos la card
  const card = document.createElement('div')
  card.classList.add('card')

  card.innerHTML = `<p class="card-title">${product.title}</p>
            <div class="img-container">
              <img
                src="${product.thumbnail}"
                alt="${product.title}"
              />
            </div>
            <p class="card-description"><a href="${productPath}?id=${product.id}">Detalles</a></p>
            <div class="card-price">
              <p>$ ${product.price}</p>
              <button class="add-to-cart" data-id="${product.id}">Comprar</button>`

  const buyButton = card.querySelector('.add-to-cart')
  buyButton.addEventListener('click', () => {
    addToCart(product)
    alert('Producto agregado al carrito')
  })
  return container.appendChild(card)
}
