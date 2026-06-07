/* ==========================================================================
   NANBU TCG - LÓGICA ESPECÍFICA DEL CATÁLOGO DE LA PÁGINA PRINCIPAL
   ========================================================================== */

// --- STATE MANAGEMENT ---
let currentCategoryFilter = 'todos';
let searchQuery = '';

// --- DOM ELEMENTS & EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
    const catalogSearch = document.getElementById('catalog-search');
    const categoryFiltersContainer = document.getElementById('category-filters');
    const navLinks = document.querySelectorAll('.nav-link');

    // --- CARGAR INVENTARIO INICIAL ---
    renderCatalog();

    // Search input handler
    if (catalogSearch) {
        catalogSearch.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderCatalog();
        });
    }

    // Category button filters handler
    if (categoryFiltersContainer) {
        categoryFiltersContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                const buttons = categoryFiltersContainer.querySelectorAll('.filter-btn');
                buttons.forEach(btn => btn.classList.remove('active'));
                
                e.target.classList.add('active');
                currentCategoryFilter = e.target.dataset.category;
                renderCatalog();
            }
        });
    }

    // Scroll Spy for Navbar Active Indicator (specific to homepage sections)
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// --- RENDER FUNCTIONS ---

// Renderizar tarjetas de productos
function renderCatalog() {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;
    
    // Filtrar inventario de PRODUCTS (de products.js)
    const filteredProducts = PRODUCTS.filter(prod => {
        const matchesCategory = currentCategoryFilter === 'todos' || prod.category === currentCategoryFilter;
        const matchesSearch = prod.name.toLowerCase().includes(searchQuery) || 
                              prod.description.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = `
            <div class="loader-placeholder">
                <i class="fa-solid fa-box-open" style="font-size: 2rem;"></i>
                No se encontraron productos en esta sección del templo.
            </div>
        `;
        return;
    }

    // Mapear productos a HTML
    productGrid.innerHTML = filteredProducts.map(prod => {
        const inCart = cart.find(item => item.id === prod.id);
        const cartQty = inCart ? inCart.quantity : 0;
        const hasStock = prod.stock > cartQty;
        
        let stockIndicator = `<span class="product-stock stock-instock"><i class="fa-solid fa-circle-check"></i> En stock</span>`;
        if (prod.stock === 0) {
            stockIndicator = `<span class="product-stock stock-out"><i class="fa-solid fa-circle-xmark"></i> Agotado</span>`;
        } else if (prod.stock - cartQty <= 0) {
            stockIndicator = `<span class="product-stock stock-out"><i class="fa-solid fa-circle-xmark"></i> Sin stock disponible</span>`;
        }

        return `
            <article class="product-card" id="card-${prod.id}">
                <span class="product-card-badge">${prod.badge}</span>
                
                <!-- Enlace al detalle del producto envolviendo imagen, título e info superior -->
                <a href="producto.html?id=${prod.id}" class="product-card-click-area" style="text-decoration: none; color: inherit; display: flex; flex-direction: column; flex-grow: 1;">
                    <div class="product-img-wrapper">
                        ${prod.imagePath ? (prod.hoverImagePath ? `
                            <img src="${prod.imagePath}" alt="${prod.name}" class="product-img main-img" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:contain; padding:10px; transition: opacity 0.3s ease;">
                            <img src="${prod.hoverImagePath}" alt="${prod.name}" class="product-img hover-img" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:contain; padding:10px; opacity:0; transition: opacity 0.3s ease;">
                        ` : `<img src="${prod.imagePath}" alt="${prod.name}" class="product-img" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:contain; padding:10px;">`) : drawVisualTCG(prod.visualType, prod.name)}
                    </div>
                    <div class="product-info" style="padding-bottom: 0;">
                        <h3 class="product-title">${prod.name}</h3>
                        ${stockIndicator}
                        <p style="font-size: 0.75rem; color: var(--color-text-secondary); margin-bottom: 1.25rem; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                            ${prod.description}
                        </p>
                    </div>
                </a>

                <!-- Footer de la tarjeta con el precio y botón de agregar, separado del enlace -->
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
