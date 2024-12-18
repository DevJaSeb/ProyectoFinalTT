//Encargado de realizar las peticiones a la API

const API_URL = 'https://dummyjson.com/products/category'
const CATEGORIES = ['laptops', 'mobile-accessories', 'smartphones', 'tablets']

export const getProducts = async () => {
    try{
        const response = await fetch(`${API_URL}/${CATEGORIES[1]}`)
        const data = await response.json()
        console.log(data)
    } catch (error){
        console.error('Error fetching products', error)
    }
}