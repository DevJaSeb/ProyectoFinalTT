//Manipulacion del DOM

import { getBannerImages } from './requests.js'

const bannerContainer = document.querySelector('.banner-container')
const img = bannerContainer.querySelector('.banner-img')

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
