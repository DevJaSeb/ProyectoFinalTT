//Maneja la logica del carrito de compras

//estado del carrito
let cartItems = []
const CART_STORAGE_KEY = 'shopping-cart'

//carga del carrito desde el LocalStorage
const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem(CART_STORAGE_KEY)
  if (savedCart) {
    cartItems = JSON.parse(savedCart)
    updateCartUI()
    updateCartTotal()
  }
}

//Guardar el carrito en el LocalStorage
const savedCartToStorage = () => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
}

//Funcion para añadir elementos al carrito
export const addToCart = (product) => {
  const existingItem = cartItems.find((item) => item.id === product.id)
  if (existingItem) {
    existingItem.quantity += product.quantity || 1;
  } else {
    cartItems.push({
      ...product,
      quantity: product.quantity || 1
    })
  }

  savedCartToStorage()
  updateCartUI()
  updateCartTotal()
}

//Funcion para quitar elementos del carrito
export const removeFromCart = (productId) => {
  cartItems = cartItems.filter((item) => item.id !== productId)

  savedCartToStorage()
  updateCartUI()
  updateCartTotal()
}

//Funcion para actualizar la cantidad
export const updateQuantity = (productId, newQuantity) => {
  const item = cartItems.find((item) => item.id === productId)
  if (item) {
    item.quantity = Math.max(1, newQuantity)
    savedCartToStorage()
    updateCartUI()
    updateCartTotal()
  }
}

//Funcion para actualizar la UI del carrito
const updateCartUI = () => {
  const cartItemsContainer = document.querySelector('.cart-items-container')
  const cartCount = document.querySelector('.cart-count')

  // actualizar los items del carrito
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  if (cartCount) {
    cartCount.textContent = totalItems
    cartCount.style.display = totalItems > 0 ? 'block' : 'none'
  }

  cartItemsContainer.innerHTML = ''

  cartItems.forEach((item) => {
    const cartItem = document.createElement('div')
    cartItem.classList.add('cart-item')
    cartItem.innerHTML = `
        <img src="${item.thumbnail}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-info">
          <h3>${item.title}</h3>
          <p>Precio: $${item.price}</p>
          <div class="quantity-controls">
            <button class="quantity-btn minus" data-id="${item.id}">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn plus" data-id="${item.id}">+</button>
          </div>
          <p class="item-total">Subtotal: $${(
            item.price * item.quantity
          ).toFixed(2)}</p>
        </div>
        <button class="remove-item" data-id="${item.id}">
          <span class="iconify" data-icon="mdi:trash-can"></span>
        </button>
      `
    cartItemsContainer.appendChild(cartItem)
  })

  // Añadimos los listenes para los botones
  document.querySelectorAll('.remove-item').forEach((button) => {
    button.addEventListener('click', (e) => {
      removeFromCart(Number(e.currentTarget.dataset.id))
    })
  })

  document.querySelectorAll('.quantity-btn').forEach((button) => {
    button.addEventListener('click', (e) => {
      const productId = Number(e.currentTarget.dataset.id)
      const item = cartItems.find((item) => item.id === productId)
      if (item) {
        const newQuantity = e.currentTarget.classList.contains('plus')
          ? item.quantity + 1
          : item.quantity - 1
        updateQuantity(productId, newQuantity)
      }
    })
  })
}

//evento para el boton remove item
document.querySelectorAll('.remove-item').forEach((button) => {
  button.addEventListener('click', (e) => {
    removeFromCart(Number(e.currentTarget.dataset.id))
  })
})

document.querySelectorAll('.quantity-btn').forEach((button) => {
  button.addEventListener('click', (e) => {
    const productId = Number(e.currentTarget.dataset.id)
    const item = cartItems.find((item) => item.id === productId)
    if (item) {
      const newQuantity = e.currentTarget.classList.contains('plus')
        ? item.quantity + 1
        : item.quantity - 1
      updateQuantity(productId, newQuantity)
    }
  })
})

//Funcion para actualizar el total del carrito
const updateCartTotal = () => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const cartTotal = document.querySelector('#cartTotal')
  cartTotal.textContent = `$${total.toFixed(2)}`
}

// Funcion para limpiar el carrito
export const clearCart = () => {
  cartItems = []
  savedCartToStorage()
  updateCartUI()
  updateCartTotal()
}

// Funcion para inicializar el carrito
export const initCart = () => {
  const cartIcon = document.querySelector('.cart')
  const cartModal = document.querySelector('#cartModal')
  const closeModal = document.querySelector('.close-modal')
  const clearCartButton = document.querySelector('.clear-cart')
  const checkoutButton = document.querySelector('.checkout-btn');

  // carga de los items guardados en el local storage
  loadCartFromStorage()

  if (cartIcon && cartModal) {  
    cartIcon.addEventListener('click', () => {
      cartModal.classList.add('active');
    });
  }

  if (closeModal) {  
    closeModal.addEventListener('click', () => {
      cartModal.classList.remove('active');
    });
  }

  if (clearCartButton) {
    clearCartButton.addEventListener('click', clearCart);
  }

  cartIcon.addEventListener('click', () => {
    cartModal.classList.add('active')
  })

  closeModal.addEventListener('click', () => {
    cartModal.classList.remove('active')
  })

  if (clearCartButton) {
    clearCartButton.addEventListener('click', clearCart)
  }

  
  if (checkoutButton) {
    checkoutButton.addEventListener('click', processCheckout);
  }

  // Cierre del modal cuando clickeen afuera
  window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
      cartModal.classList.remove('active')
    }
  })
  
}


//Compra realizada
export const processCheckout = () => {
  // Verificar si hay productos en el carrito
  if (cartItems.length === 0) {
    alert('El carrito está vacío');
    return;
  }

  // Crear el modal de compra exitosa
  createCheckoutModal();
  
  // Limpiar el carrito después de la compra
  clearCart();
}

function createCheckoutModal() {
  // Crear el contenedor del modal
  const modalOverlay = document.createElement('div');
  modalOverlay.classList.add('checkout-modal-overlay');
  
  const modalContent = document.createElement('div');
  modalContent.classList.add('checkout-modal');
  
  modalContent.innerHTML = `
    <div class="checkout-modal-content">
      <span class="checkout-modal-close">&times;</span>
      <div class="checkout-modal-icon">
        <span class="iconify" data-icon="mdi:check-circle"></span>
      </div>
      <h2>¡Compra Realizada con Éxito!</h2>
      <p>Gracias por tu compra. Pronto recibirás los detalles de tu pedido.</p>
      <button class="checkout-modal-close-btn">Cerrar</button>
    </div>
  `;

  // Añadir al body
  document.body.appendChild(modalOverlay);
  modalOverlay.appendChild(modalContent);

  // Eventos de cierre
  const closeButtons = modalContent.querySelectorAll('.checkout-modal-close, .checkout-modal-close-btn');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.removeChild(modalOverlay);
    });
  });

  // Cerrar al hacer click fuera del modal
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      document.body.removeChild(modalOverlay);
    }
  });

  return modalOverlay;
}
