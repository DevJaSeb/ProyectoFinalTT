//Opcional: funcionalidades compartidas

//FUNCION PARA APLANAR y TRANSFORMAR ARRAY DE ARRAYS
export const flatternArray = (array) => {
  return array.flatMap((subarray) => subarray)
}

//FUNCION PARA APLANAR ARRAYS
export const flatArray = (array) => {
  return array.flat()
}

//OBTENER ITEMS ALEATORIOS
export const getRandomItems = (array, count = 5) => {
  return array.sort(() => 0.5 - Math.random()).slice(0, count)
}

//FUNCION PARA VERIFICAR LOS CAMPOS DEL FORMULARIO DE CONTACTO
export const validateForm = () => {
  document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target
    //obtenemos los campos
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const reason = document.querySelector('#reason').value
    const subject = document.querySelector('#subject').value.trim();
    const message = document.querySelector('#message').value.trim();
    const checkbox = document.querySelector('#checkbox').checked;

    //validacion
    if(name && email && reason && subject && message && checkbox) {
     console.log('Todos los campos estan llenos')
     form.submit()
    }else{
      alert('Por favor, completa todos los campos y acepta los términos y condiciones.');
    }
  })
}

//INSERTAR CARRITO DE COMPRAS EN TODAS LAS PAGINAS
export const insertCartHtml = () => {
  const cartHtml = `
  <!-- MODAL CARRITO -->
    <div class="cart-modal" id="cartModal">
      <div class="cart-modal-content">
        <div class="cart-modal-header">
          <h2>Carrito de Compras</h2>
          <span class="close-modal iconify" data-icon="material-symbols:close"
            >&times;</span
          >
        </div>
        <div class="cart-items-container">
          <!-- Aquí se mostrarán los items del carrito -->
        </div>
        <div class="cart-modal-footer">
          <div class="cart-total">
            <span>Total:</span>
            <span id="cartTotal">$0.00</span>
          </div>
          <button class="btn-checkout">Realizar Compra</button>
          <button class="clear-cart">Vaciar Carrito</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', cartHtml);
}

