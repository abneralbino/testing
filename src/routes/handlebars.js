/* 
        const socket = io('http://localhost:1010');
          const productList = document.getElementById('product-list');

        socket.emit('event_cl01', 'Cliente 01 intentando conectar');

        socket.on('connect', () => {
            socket.emit('event_product', 'Este es un mesaje de producto');
            socket.on('server_confirm', (msg) => {
                console.log('El servidor ha confirmado la conexion - DESDE RTPHDB');
            })
        });

       
 socket.on('product_deleted', (updatedProducts) => {
    // Actualizar el DOM con los productos actualizados
    console.log('POR QUE NO SE ACTIVAAAAAA?????');
    productList.innerHTML = '';

    updatedProducts.forEach(product => {
      const productEl = document.createElement('div');
      productEl.classList.add('card-body');
      productEl.innerHTML = `
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.description}</p>
        <p class="card-text">Precio: ${product.price}</p>
        <p class="card-text">Código: ${product.code}</p>                         
        <p class="card-text">Stock: ${product.stock}</p>
        <p class="card-text">Estado: ${product.status}</p>
        <p class="card-text">ID: ${product.id}</p>
        <button onclick="deleteProduct(${product.id})">Eliminar</button>
      `;
      productList.appendChild(productEl);
    });
  });

  socket.on('product_added', (updatedProducts) => {
    console.log('POR QUE NO SE ACTIVAAAAAA?????');
    // Actualizar el DOM con los productos actualizados
    productList.innerHTML = '';

    updatedProducts.forEach(product => {
      const productEl = document.createElement('div');
      productEl.classList.add('card-body');
      productEl.innerHTML = `
        <h5>${product.title}</h5>
        <p class="card-text">${product.description}</p>
        <p class="card-text">Precio: ${product.price}</p>
        <p class="card-text">Código: ${product.code}</p>
        <p class="card-text">Stock: ${product.stock}</p>
        <p class="card-text">Estado: ${product.status}</p>
        <p class="card-text">ID: ${product.id}</p>
        <button onclick="deleteProduct(${product.id})">Eliminar</button>
      `;
      productList.appendChild(productEl);
    });
  });

        
        function deleteProduct(id) {
        socket.emit('delete_product', id);
        console.log('La funcion se activa cuando hago click', id)
        };

        function addProduct() {
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const price = document.getElementById('price').value;
            const thumbnail = document.getElementById('thumbnail').value;
            const code = document.getElementById('code').value;
            const stock = document.getElementById('stock').value;
            const status = document.getElementById('status').value;
            const category = document.getElementById('category').value;

        const product = {title, description, price, thumbnail, code, stock, status, category};
            socket.emit('add_product', product);
            console.log('La funcion se activa cuando hago click en Save', product )
        };
        
     */