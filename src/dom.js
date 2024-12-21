//Manipulacion del DOM

import { getBannerImages } from './requests.js'

const bannerContainer = document.querySelector('.banner-container')
const img = bannerContainer.querySelector('.banner-img')

//BANNER
export const bannerInit = async () => {
  try {
    const bannerImages = await getBannerImages()
    if (bannerImages.length === 0) return
    let currentIndex = 0

    const changeImage = () => {
      img.src = bannerImages[currentIndex]

      //Cambio de tamaño
      img.onload = () => {
        img.style.width = '350px'
        img.style.height = '400px'
        img.style.objectPosition = 'center'
      }
      currentIndex = (currentIndex + 1) % bannerImages.length
    }
    changeImage()
    setInterval(changeImage, 3000)
  } catch (error) {
    console.error('Error al Obtener las imagenes', error)
  }
}

//BUSCAR PRODUCTO
export const initSearch = () => {
  const searchIcon = document.querySelector('.search')
  const searchInput = document.querySelector('.search-input')

  //cambio de clase al hacer click en el icono de lupa
  searchIcon.addEventListener('click', () => {    
    searchInput.classList.toggle('active')
    if (searchInput.classList.contains('active')) {
      searchInput.focus()
    }
  })

  //cerrar el imput al hacer click fuera de el
  document.addEventListener('click', (e) => {
    const isClickInside =
      searchInput.contains(e.target) || searchIcon.contains(e.target)
    if (!isClickInside && searchInput.classList.contains('active')) {
      searchInput.classList.remove('active')
    }
  })
}