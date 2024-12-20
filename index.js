//Punto de entrada para la aplicación

import { bannerInit, initSearch } from './src/dom.js'
import { initProducts, initProductsDetails } from './src/products.js'


//iniciamos el banner
document.addEventListener('DOMContentLoaded', bannerInit)
document.addEventListener('DOMContentLoaded', initSearch)
document.addEventListener('DOMContentLoaded', initProducts)
document.addEventListener('DOMContentLoaded', initProductsDetails)


