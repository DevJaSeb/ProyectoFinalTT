//Opcional: funcionalidades compartidas

//FUNCION PARA APLANAR ARRAY DE ARRAYS
export const flatternArray = (array) => {
  return array.flatMap((subarray) => subarray)
}

//OBTENER ITEMS ALEATORIOS
export const getRandomItems = (array, count = 5) => {
  return array.sort(() => 0.5 - Math.random()).slice(0, count)
}

//CREACION DE CARDS
export const createProductCard = (product) => {
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
            <p class="card-description"><a href="./pages/producto.html">Detalles</a></p>
            <div class="card-price">
              <p>$ ${product.price}</p>
              <button>Comprar</button>`
  return container.appendChild(card)
}
