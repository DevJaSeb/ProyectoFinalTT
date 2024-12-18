//Punto de entrada para la aplicación

import { getProducts, getAllProducts } from './src/requests.js'

getAllProducts().then((response) => console.log(response))