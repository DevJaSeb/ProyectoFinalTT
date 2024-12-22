//Punto de entrada para la aplicación

import { initCart, processCheckout } from './src/cart.js'
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
        const checkoutButton = document.querySelector('.btn-checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevenir cualquier comportamiento por defecto
            console.log('Botón de compra clickeado');
            processCheckout();
        });
    }
    }catch(error){
        console.error('Error al Obtener los productos', error)
    }
}

document.addEventListener('DOMContentLoaded', init)


