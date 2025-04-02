function addToCart(buttonElement) {
    const nombre = buttonElement.getAttribute('data-nombre');
    const precio = parseFloat(buttonElement.getAttribute('data-precio'));

    // Obtener el input relacionado
    const inputCantidad = buttonElement.previousElementSibling;
    const cantidad = parseInt(inputCantidad.value);

    if (isNaN(cantidad) || cantidad <= 0 || cantidad > 5) {
        alert("Por favor, introduce una cantidad válida (1-5).");
        return;
    }

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let productoExistente = carrito.find(producto => producto.nombre === nombre);

    if (productoExistente) {
        if (productoExistente.cantidad + cantidad > 5) {
            alert(`No puedes añadir más de 5 unidades de ${nombre}.`);
            return;
        }
        productoExistente.cantidad += cantidad;
    } else {
        carrito.push({ nombre, precio, cantidad });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${cantidad} unidad(es) de ${nombre} han sido añadidas al carrito.`);
    cargarCarrito();
}

function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoItems = document.getElementById('C-cart-items');
    const total = document.getElementById('total');
    let totalAmount = 0;

    carritoItems.innerHTML = ''; 

    carrito.forEach((producto, index) => {
        let subtotal = producto.precio * producto.cantidad;
        totalAmount += subtotal;

        const item = document.createElement('li');
        item.innerHTML = `
            ${producto.nombre} - ${producto.precio} BS. x ${producto.cantidad} = ${subtotal.toFixed(2)} BS.
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        carritoItems.appendChild(item);
    });

    total.innerText = parseFloat(totalAmount).toFixed(2);
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad -= 1;
    } else {
        carrito.splice(index, 1);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
}

function checkout() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de proceder.");
        return;
    }
    alert("Gracias por tu compra. Procesando el pago...");
    localStorage.removeItem('carrito');
    cargarCarrito();
}

window.onload = cargarCarrito;
