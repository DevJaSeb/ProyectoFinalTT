//Punto de entrada para la aplicación

import { initCart } from './src/cart.js'
import { bannerInit, initSearch } from './src/dom.js'
import { createProductCard} from './src/products.js'
import { getAllProducts } from './src/requests.js'


const init = async () => {
    try{        
        await bannerInit()
        initSearch()
        const products = await getAllProducts();
        const flatProducts = products.flat().filter(Boolean);
        flatProducts.forEach(product => createProductCard(product))
        initCart()
    }catch(error){
        console.error('Error al Obtener los productos', error)
    }
}

document.addEventListener('DOMContentLoaded', init)


