/* ==========================================================================
   NANBU TCG - LÓGICA DE DETALLE DE PRODUCTO
   ========================================================================== */

let product = null;
let selectedQty = 1;

// Hacer renderProductDetail accesible globalmente para actualizarlo cuando cambie el carrito
window.renderProductDetail = function() {
    const container = document.getElementById('product-detail-container');
    if (!container || !product) return;

    // Calcular stock disponible tomando en cuenta lo que ya hay en el carrito
    const cartItem = cart.find(item => item.id === product.id);
    const cartQty = cartItem ? cartItem.quantity : 0;
    const maxAvailable = product.stock - cartQty;

    // Corregir cantidad seleccionada según stock restante disponible
    if (maxAvailable <= 0) {
        selectedQty = 0;
    } else if (selectedQty > maxAvailable) {
        selectedQty = maxAvailable;
    } else if (selectedQty <= 0) {
        selectedQty = 1;
    }

    // Indicador de Stock
    let stockIndicator = `<span class="product-stock stock-instock" style="font-size: 0.9rem; margin-bottom: 1.5rem;"><i class="fa-solid fa-circle-check"></i> En Stock (${product.stock} disponibles)</span>`;
    if (product.stock === 0) {
        stockIndicator = `<span class="product-stock stock-out" style="font-size: 0.9rem; margin-bottom: 1.5rem;"><i class="fa-solid fa-circle-xmark"></i> Agotado</span>`;
    } else if (product.stock - cartQty <= 2 && product.stock - cartQty > 0) {
        stockIndicator = `<span class="product-stock stock-instock" style="font-size: 0.9rem; margin-bottom: 1.5rem;"><i class="fa-solid fa-circle-check"></i> Stock disponible: ${product.stock - cartQty}</span>`;
    } else if (product.stock - cartQty <= 0) {
        stockIndicator = `<span class="product-stock stock-out" style="font-size: 0.9rem; margin-bottom: 1.5rem;"><i class="fa-solid fa-circle-xmark"></i> Sin stock adicional disponible (ya está en tu carrito)</span>`;
    }

    const disableMinus = selectedQty <= 1;
    const disablePlus = selectedQty >= maxAvailable || maxAvailable <= 0;
    const disableAdd = maxAvailable <= 0 || product.stock === 0;

    const mediaHtml = product.imagePath ? `
        <img src="${product.imagePath}" alt="${product.name}" class="product-detail-img">
    ` : drawVisualTCG(product.visualType, product.name);

    container.innerHTML = `
        <div class="product-detail-media">
            ${mediaHtml}
        </div>
        <div class="product-detail-info">
            <span class="product-detail-badge">${product.badge}</span>
            <h1 class="product-detail-title">${product.name}</h1>
            <div class="product-detail-price">$${formatPrice(product.price)} ARS</div>
            
            ${stockIndicator}
            
            <div class="product-detail-description">
                <h4>Descripción del Templo</h4>
                <p style="white-space: pre-line;">${product.description}</p>
            </div>

            <div class="product-detail-actions">
                <div class="qty-selector">
                    <button class="qty-btn-detail" onclick="changeDetailQty(-1)" ${disableMinus ? 'disabled' : ''} aria-label="Restar cantidad">-</button>
                    <span class="qty-val-detail">${selectedQty}</span>
                    <button class="qty-btn-detail" onclick="changeDetailQty(1)" ${disablePlus ? 'disabled' : ''} aria-label="Sumar cantidad">+</button>
                </div>
                
                <button class="btn btn-primary btn-add-detail" onclick="addDetailToCart()" ${disableAdd ? 'disabled' : ''}>
                    <i class="fa-solid fa-cart-shopping"></i> 
                    ${product.stock === 0 ? 'Agotado' : (maxAvailable <= 0 ? 'Sin stock disponible' : 'Agregar al Carrito')}
                </button>
            </div>
        </div>
    `;
};

// Cambiar la cantidad seleccionada en el detalle
window.changeDetailQty = function(change) {
    if (!product) return;
    
    const cartItem = cart.find(item => item.id === product.id);
    const cartQty = cartItem ? cartItem.quantity : 0;
    const maxAvailable = product.stock - cartQty;

    selectedQty += change;
    if (selectedQty < 1) selectedQty = 1;
    if (selectedQty > maxAvailable) selectedQty = maxAvailable;

    renderProductDetail();
};

// Agregar al carrito la cantidad seleccionada en el detalle
window.addDetailToCart = function() {
    if (!product || selectedQty <= 0) return;
    addToCart(product.id, selectedQty);
    // Resetear cantidad a 1 después de agregar con éxito
    selectedQty = 1;
    renderProductDetail();
};

document.addEventListener('DOMContentLoaded', () => {
    // Obtener ID de producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const container = document.getElementById('product-detail-container');
    if (!container) return;

    // Buscar producto
    product = PRODUCTS.find(p => p.id === productId);

    if (!product) {
        // Mostrar error si el producto no existe
        container.innerHTML = `
            <div class="loader-placeholder" style="grid-column: 1 / -1; min-height: 300px;">
                <i class="fa-solid fa-circle-exclamation" style="font-size: 3rem; color: var(--accent-red);"></i>
                <h2 style="font-family: var(--font-heading); color: #fff;">Producto no encontrado</h2>
                <p>El templo no cuenta con este artículo en sus registros.</p>
                <a href="index.html#catalogo" class="btn btn-primary" style="margin-top: 1.5rem;">Volver al Catálogo</a>
            </div>
        `;
        return;
    }

    // Configurar título del documento
    document.title = `${product.name} - Nanbu TCG`;

    // Renderizar
    renderProductDetail();
    renderRelatedProducts();
});

// Renderizar sugerencias relacionadas
function renderRelatedProducts() {
    const grid = document.getElementById('related-grid');
    if (!grid || !product) return;

    // Filtrar otros productos (excluyendo el actual)
    let related = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category);

    // Si hay pocos de la misma categoría, añadir de otras
    if (related.length < 3) {
        const leftovers = PRODUCTS.filter(p => p.id !== product.id && p.category !== product.category);
        related = [...related, ...leftovers];
    }

    // Mezclar aleatoriamente y tomar 3
    const shuffled = related.sort(() => 0.5 - Math.random()).slice(0, 3);

    grid.innerHTML = shuffled.map(prod => {
        const inCart = cart.find(item => item.id === prod.id);
        const cartQty = inCart ? inCart.quantity : 0;
        const hasStock = prod.stock > cartQty;

        let stockIndicator = `<span class="product-stock stock-instock"><i class="fa-solid fa-circle-check"></i> En Stock</span>`;
        if (prod.stock === 0) {
            stockIndicator = `<span class="product-stock stock-out"><i class="fa-solid fa-circle-xmark"></i> Agotado</span>`;
        } else if (prod.stock - cartQty <= 2 && prod.stock - cartQty > 0) {
            stockIndicator = `<span class="product-stock stock-instock"><i class="fa-solid fa-circle-check"></i> Stock disponible: ${prod.stock - cartQty}</span>`;
        } else if (prod.stock - cartQty <= 0) {
            stockIndicator = `<span class="product-stock stock-out"><i class="fa-solid fa-circle-xmark"></i> Sin stock disponible</span>`;
        }

        return `
            <article class="product-card" id="card-${prod.id}">
                <span class="product-card-badge">${prod.badge}</span>
                
                <a href="producto.html?id=${prod.id}" style="text-decoration: none; color: inherit; display: flex; flex-direction: column; flex-grow: 1;">
                    <div class="product-img-wrapper">
                        ${prod.imagePath ? (prod.hoverImagePath ? `
                            <img src="${prod.imagePath}" alt="${prod.name}" class="product-img main-img" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:contain; padding:10px; transition: opacity 0.3s ease;">
                            <img src="${prod.hoverImagePath}" alt="${prod.name}" class="product-img hover-img" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:contain; padding:10px; opacity:0; transition: opacity 0.3s ease;">
                        ` : `<img src="${prod.imagePath}" alt="${prod.name}" class="product-img" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:contain; padding:10px;">`) : drawVisualTCG(prod.visualType, prod.name)}
                    </div>
                    <div class="product-info" style="padding-bottom: 0;">
                        <h3 class="product-title">${prod.name}</h3>
                        ${stockIndicator}
                    </div>
                </a>

                <div class="product-info" style="padding-top: 0; margin-top: auto;">
                    <div class="product-footer">
                        <span class="product-price">$${formatPrice(prod.price)}</span>
                        <button class="add-to-cart-btn" 
                                onclick="addToCart('${prod.id}')" 
                                ${!hasStock || prod.stock === 0 ? 'disabled' : ''} 
                                aria-label="Agregar ${prod.name} al carrito"
                                id="btn-add-${prod.id}">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}
