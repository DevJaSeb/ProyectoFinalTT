//Encargado de realizar las peticiones a la API
const BASE_URL = 'https://dummyjson.com/products'
const API_URL = 'https://dummyjson.com/products/category'
const CATEGORIES = ['laptops', 'mobile-accessories', 'smartphones', 'tablets']

//Obtenemos todos los productos de una categoria
export const getAllProducts = async () => {
  try {
    const productsByCategory = await Promise.all(
      CATEGORIES.map(async (category) => {
        try {
          return await getProducts(category)
        } catch (categoryError) {
          console.error(
            `Error al Obtener los productos de ${category}`,
            categoryError
          )
        }
      })
    )
    return productsByCategory
  } catch (error) {
    console.error('Error al Obtener los productos', error)
  }
}

//Funcion para obtener productos de una categoria
export const getProducts = async (category) => {
  try {
    const url = `${API_URL}/${category}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Error en la solicitud para ${category}`)
    }
    const data = await response.json()
    return data.products
  } catch (error) {
    console.error('Error al Obtener los productos', error)
  }
}

//FUNCION PARA OBENER LOS PRODUCTOS POR CATEGORIA
export const getProductsById = async (id) =>{
  try{
    const response = await fetch(`${BASE_URL}/${id}`)
    const data = await response.json()
    return data
  }catch(error){
    console.error('Error al Obtener los productos', error)
  }
}

//Funcion para obtener las imagenes para el banner
export const getBannerImages = async (count = 5) => {
  try {
    const allProducts = await getAllProducts()

    const flatProducts = allProducts.flatMap(
      (categoryProducts) => categoryProducts
    )
    //sacamos imagenes random
    const shuffledImages = flatProducts
      .sort(() => 0.5 - Math.random())
      .slice(0, count)
      .map((product) => product.thumbnail)
    return shuffledImages
  } catch (error) {
    console.error('Error al Obtener las imagenes', error)
  }
}
