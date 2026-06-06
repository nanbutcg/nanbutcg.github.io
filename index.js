/* ==========================================================================
   NANBU TCG - LÓGICA DE LA SPA Y FUNCIONALIDADES
   ========================================================================== */

// --- PRODUCT DATA ---
const PRODUCTS = [
    {
        id: "prod-01",
        name: "ETB Chaos Rising",
        category: "sellados",
        price: 170000,
        stock: 5,
        badge: "Pokémon",
        description: "La Caja de Entrenador Élite de JCC Pokémon: Megaevolución: Chaos Rising incluye: 9 sobres de expansión de Chaos Rising, 1 carta promocional foil de arte completo, 65 fundas para cartas, 45 cartas de energía, dados contadores de daño y más. Idioma: inglés.",
        imagePath: "assets/etb_chaos_rising.jpg",
        visualType: "etb"
    },
    {
        id: "prod-02",
        name: "Chaos Rising Booster Bundle",
        category: "sellados",
        price: 74000,
        stock: 8,
        badge: "Pokémon",
        description: "Incluye seis sobres de mejora de la expansión Megaevolución: Chaos Rising de JCC Pokémon. Cada sobre contiene 10 cartas, 1 Energía Básica y 1 código para Pokémon TCG Live. Idioma: inglés.",
        imagePath: "assets/booster_bundle_chaos_rising.jpg",
        visualType: "collection-red"
    },
    {
        id: "prod-03",
        name: "Chaos Rising Booster Pack",
        category: "sobres",
        price: 13500,
        stock: 36,
        badge: "Pokémon",
        description: "Cada sobre de refuerzo (Booster Pack) contiene 10 cartas oficiales de Pokémon TCG y 1 Energía Básica. ¡Expande tu colección con Chaos Rising!",
        imagePath: "assets/booster_pack_chaos_rising.jpg",
        visualType: "booster"
    },
    {
        id: "prod-04",
        name: "Ascended Heroes Poster collection",
        category: "sellados",
        price: 184000,
        stock: 4,
        badge: "Pokémon",
        description: "Cada colección de pósteres premium de JCC Pokémon: Megaevolución: Ascended Heroes incluye: 1 carta promocional foil de Mega Lucario ex o Mega Gardevoir ex, 1 póster a doble cara (68x99 cm), 10 sobres de expansión de Ascended Heroes y un código para Pokémon Live. Idioma: inglés.",
        imagePath: "assets/poster_collection_lucario.jpg",
        hoverImagePath: "assets/poster_collection_gardevoir.jpg",
        visualType: "collection-gold"
    },
    {
        id: "prod-05",
        name: "Mega Lucario EX Figure Collection",
        category: "sellados",
        price: 97000,
        stock: 3,
        badge: "Pokémon",
        description: "La colección de figuras de Mega Lucario ex del juego de cartas coleccionables Pokémon incluye: 1 carta promo foil grabada de Mega Lucario ex, 1 carta gigante de Mega Lucario ex, 1 figura de Mega Lucario, 5 paquetes de sobres oficiales de TCG y un código para Pokémon TCG Live. Idioma: inglés.",
        imagePath: "assets/figure_collection_mega_lucario.jpg",
        visualType: "figure-box"
    },
    {
        id: "prod-06",
        name: "Carpetas Anilladas",
        category: "accesorios",
        price: 50000,
        stock: 6,
        badge: "Pokémon",
        description: "Carpetas anilladas de alta resistencia con espectaculares diseños de Greninja o Charizard. Ideales para organizar y lucir tus cartas Pokémon (no incluye folios).",
        imagePath: "assets/binder_greninja.jpg",
        hoverImagePath: "assets/binder_charizard.jpg",
        visualType: "collection-red"
    },
    {
        id: "prod-07",
        name: "Trio",
        category: "sellados",
        price: 30000,
        stock: 10,
        badge: "Clásicos",
        description: "Ganador del prestigioso As d'Or, Trio es un juego rápido y divertido que pondrá a prueba tu memoria y agudeza visual.",
        imagePath: "assets/trio.jpg",
        visualType: "board-game"
    },
    {
        id: "prod-08",
        name: "Polilla Tramposa",
        category: "sellados",
        price: 35000,
        stock: 10,
        badge: "Clásicos",
        description: "Normalmente en los juegos no se permite hacer trampas. ¡Pero en este juego sí! Se trata de ser el primer jugador en deshacerse de todas las cartas y por eso hace falta ser ingeniosos a la hora de descartar y muy hábiles haciendo trampas.",
        imagePath: "assets/polilla_tramposa.jpg",
        visualType: "board-game"
    }
];

// (Combos y eventos eliminados)

// --- STATE MANAGEMENT ---
let cart = JSON.parse(localStorage.getItem('nanbu_cart')) || [];
let currentCategoryFilter = 'todos';
let searchQuery = '';

// --- DOM ELEMENTS ---
document.addEventListener('DOMContentLoaded', () => {
    // Navigation & Mobile Menu
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Catalog & Filters
    const catalogSearch = document.getElementById('catalog-search');
    const categoryFiltersContainer = document.getElementById('category-filters');
    const productGrid = document.getElementById('product-grid');
    // (Grids de combos y eventos eliminados)

    // Cart Sidebar
    const cartTrigger = document.getElementById('cart-trigger');
    const cartClose = document.getElementById('cart-close');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cartCount = document.getElementById('cart-count');
    const cartEmpty = document.getElementById('cart-empty');
    const cartFooter = document.getElementById('cart-footer');
    const btnCartContinue = document.getElementById('btn-cart-continue');

    // Checkout Modals
    const btnCheckoutWhatsapp = document.getElementById('btn-checkout-whatsapp');

    // --- SAKURA BACKGROUND ANIMATION ---
    initSakuraCanvas();

    // --- CARGAR INVENTARIO INICIAL ---
    renderCatalog();
    updateCartUI();

    // --- EVENT LISTENERS ---

    // Mobile Navigation Toggle
    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                menuToggle.querySelector('i').className = 'fa-solid fa-bars';
            }
        });
    });

    // Scroll Spy for Navbar Active Indicator
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

    // Cart Sidebar Drawer Toggle
    if (cartTrigger && cartDrawer && cartOverlay) {
        cartTrigger.addEventListener('click', () => {
            cartDrawer.classList.add('active');
            cartOverlay.classList.add('active');
        });
    }

    const closeCart = () => {
        cartDrawer.classList.remove('active');
        cartOverlay.classList.remove('active');
    };

    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
    if (btnCartContinue) btnCartContinue.addEventListener('click', closeCart);

    // Cart Checkout Actions
    if (btnCheckoutWhatsapp) {
        btnCheckoutWhatsapp.addEventListener('click', () => {
            if (cart.length === 0) return;
            enviarPedidoWhatsApp();
        });
    }
    // (Manejadores de sorteos eliminados)
});

// --- HELPER FUNCTIONS ---

// Formatea números de precio con separador de miles en formato AR
function formatPrice(number) {
    return Math.round(number).toLocaleString('es-AR');
}

// Calcula el total acumulado en el carrito
function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Persistencia en LocalStorage
function saveCart() {
    localStorage.setItem('nanbu_cart', JSON.stringify(cart));
}

// --- RENDER FUNCTIONS ---

// Renderizar tarjetas de productos
function renderCatalog() {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;
    
    // Filter array
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

    // Map to HTML
    productGrid.innerHTML = filteredProducts.map(prod => {
        const inCart = cart.find(item => item.id === prod.id);
        const cartQty = inCart ? inCart.quantity : 0;
        const hasStock = prod.stock > cartQty;
        
        let stockIndicator = `<span class="product-stock stock-instock"><i class="fa-solid fa-circle-check"></i> En Stock</span>`;
        if (prod.stock === 0) {
            stockIndicator = `<span class="product-stock stock-out"><i class="fa-solid fa-circle-xmark"></i> Agotado</span>`;
        } else if (prod.stock - cartQty <= 2 && prod.stock - cartQty > 0) {
            stockIndicator = `<span class="product-stock stock-low"><i class="fa-solid fa-circle-exclamation"></i> ¡Últimas ${prod.stock - cartQty} unidades!</span>`;
        } else if (prod.stock - cartQty <= 0) {
            stockIndicator = `<span class="product-stock stock-out"><i class="fa-solid fa-circle-xmark"></i> Sin stock disponible</span>`;
        }

        return `
            <article class="product-card" id="card-${prod.id}">
                <span class="product-card-badge">${prod.badge}</span>
                <div class="product-img-wrapper">
                    ${prod.imagePath ? (prod.hoverImagePath ? `
                        <img src="${prod.imagePath}" alt="${prod.name}" class="product-img main-img" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:contain; padding:10px; transition: opacity 0.3s ease;">
                        <img src="${prod.hoverImagePath}" alt="${prod.name}" class="product-img hover-img" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:contain; padding:10px; opacity:0; transition: opacity 0.3s ease;">
                    ` : `<img src="${prod.imagePath}" alt="${prod.name}" class="product-img" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:contain; padding:10px;">`) : drawVisualTCG(prod.visualType, prod.name)}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${prod.name}</h3>
                    ${stockIndicator}
                    <p style="font-size: 0.75rem; color: var(--color-text-secondary); margin-bottom: 1.25rem; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                        ${prod.description}
                    </p>
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

// (Funciones de renderizado de combos y eventos eliminadas)

// --- DIBUJADOS DINÁMICOS CSS/SVG (REEMPLAZAN IMÁGENES FALTANTES DE PRODUCTOS CON ALTO IMPACTO VISUAL) ---
function drawVisualTCG(type, name) {
    // Retorna un elemento SVG/HTML representativo y elegante para los productos
    let style = '';
    let art = '';

    if (type.startsWith('board-game')) {
        const isGreen = type.includes('green');
        const color = isGreen ? 'linear-gradient(135deg, #2b8a3e 0%, #1a1815 100%)' : 'linear-gradient(135deg, #1971c2 0%, #1a1815 100%)';
        const borderGlow = isGreen ? 'box-shadow: 0 0 15px rgba(43, 138, 62, 0.4)' : 'box-shadow: 0 0 15px rgba(25, 113, 194, 0.4)';
        
        art = `
            <div style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:${color}; border-radius:4px; padding:15px; position:absolute; top:0; left:0; ${borderGlow}">
                <i class="fa-solid fa-chess-board" style="font-size:3.5rem; color:#eae3d2; margin-bottom:12px; opacity:0.85;"></i>
                <div style="font-family:var(--font-heading); font-size:0.6rem; letter-spacing:2px; color:var(--accent-gold); text-align:center; font-weight:700;">JUEGO DE MESA</div>
                <div style="font-family:var(--font-accent); font-size:0.8rem; color:#fff; text-align:center; margin-top:5px; font-weight:600;">${name.replace('(Juego de Mesa)', '').replace('(Juego de Cartas)', '')}</div>
            </div>
        `;
    } else if (type === 'booster' || type === 'blister') {
        const isBlister = type === 'blister';
        const artColor = isBlister ? '#c92a2a' : '#cda250';
        
        art = `
            <div style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:linear-gradient(135deg, #26231e 0%, #0c0b0a 100%); border-radius:4px; padding:15px; position:absolute; top:0; left:0; border:1px solid ${artColor}44">
                <!-- Booster silhouette -->
                <div style="width:85px; height:120px; background:linear-gradient(135deg, #1c1a16 0%, #11100f 100%); border:2px solid ${artColor}; border-radius:6px; position:relative; box-shadow:0 6px 15px rgba(0,0,0,0.5); display:flex; flex-direction:column; justify-content:space-between; padding:8px; overflow:hidden;">
                    <!-- Zigzag jagged cuts (CSS simulated) -->
                    <div style="position:absolute; top:-4px; left:0; width:100%; height:6px; background-image:linear-gradient(45deg, transparent 50%, #000 50%), linear-gradient(-45deg, transparent 50%, #000 50%); background-size:8px 8px; background-repeat:repeat-x;"></div>
                    
                    <div style="font-size:0.5rem; color:${artColor}; font-weight:900; letter-spacing:1px; text-align:center; border-bottom:1px solid ${artColor}55; padding-bottom:3px; font-family:var(--font-heading);">POKÉMON</div>
                    <i class="fa-solid fa-dragon" style="font-size:1.8rem; color:${artColor}; align-self:center; margin:8px 0; opacity:0.85; filter:drop-shadow(0 0 5px ${artColor}44);"></i>
                    <div style="font-size:0.45rem; color:#fff; font-weight:700; text-align:center; letter-spacing:1px;">SCARLET & VIOLET</div>
                    
                    <div style="position:absolute; bottom:-4px; left:0; width:100%; height:6px; background-image:linear-gradient(45deg, transparent 50%, #000 50%), linear-gradient(-45deg, transparent 50%, #000 50%); background-size:8px 8px; background-repeat:repeat-x;"></div>
                </div>
                ${isBlister ? `<div style="position:absolute; bottom:15px; background:rgba(201,42,42,0.15); border:1px solid #c92a2a; color:#fff; font-size:0.55rem; padding:2px 8px; font-family:var(--font-heading); font-weight:700; border-radius:3px; letter-spacing:1.5px;">BLISTER PACK (x3)</div>` : ''}
            </div>
        `;
    } else if (type === 'tin') {
        art = `
            <div style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:linear-gradient(135deg, #1c1a16 0%, #0c0b0a 100%); border-radius:4px; padding:15px; position:absolute; top:0; left:0;">
                <div style="width:100px; height:100px; background:radial-gradient(circle, #3b3730 0%, #1a1815 100%); border:2px solid var(--accent-gold); border-radius:16px; box-shadow:0 8px 20px rgba(0,0,0,0.6), inset 0 0 10px rgba(0,0,0,0.8); display:flex; flex-direction:column; align-items:center; justify-content:center; position:relative;">
                    <i class="fa-solid fa-box-open" style="font-size:2rem; color:var(--accent-gold); opacity:0.85;"></i>
                    <div style="font-family:var(--font-heading); font-size:0.5rem; color:var(--accent-gold-hover); margin-top:6px; font-weight:700; letter-spacing:1.5px;">MINI TIN</div>
                </div>
            </div>
        `;
    } else if (type.startsWith('collection') || type === 'figure-box' || type === 'etb') {
        const isRed = type.includes('red') || type === 'etb';
        const colorAccent = isRed ? '#c92a2a' : '#cda250';
        const bgGrad = isRed ? 'linear-gradient(135deg, #400f0f 0%, #121212 100%)' : 'linear-gradient(135deg, #453617 0%, #121212 100%)';
        const icon = type === 'figure-box' ? 'fa-circle-play' : (type === 'etb' ? 'fa-suitcase' : 'fa-gem');
        
        art = `
            <div style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:${bgGrad}; border-radius:4px; padding:15px; position:absolute; top:0; left:0; border:1px solid ${colorAccent}33">
                <div style="width:120px; height:95px; background:rgba(26, 24, 21, 0.9); border:2.5px solid ${colorAccent}; border-radius:8px; box-shadow:0 10px 25px rgba(0,0,0,0.7); display:flex; flex-direction:column; justify-content:center; align-items:center; position:relative; overflow:hidden; padding:10px;">
                    <!-- Japanese Torii element watermark in collection box -->
                    <i class="fa-solid fa-torii-gate" style="position:absolute; right:-10px; bottom:-10px; font-size:3.5rem; color:${colorAccent}; opacity:0.08;"></i>
                    
                    <i class="fa-solid ${icon}" style="font-size:2rem; color:${colorAccent}; margin-bottom:8px; filter:drop-shadow(0 0 5px ${colorAccent}44);"></i>
                    <div style="font-family:var(--font-heading); font-size:0.55rem; color:#fff; text-align:center; font-weight:700; letter-spacing:1.5px;">
                        ${type === 'etb' ? 'TRAINER BOX' : 'EDICIÓN ESPECIAL'}
                    </div>
                </div>
            </div>
        `;
    } else if (type.startsWith('single')) {
        art = `
            <div style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:linear-gradient(135deg, #1c1a16 0%, #0c0b0a 100%); border-radius:4px; padding:15px; position:absolute; top:0; left:0;">
                <!-- Full Pokémon Card drawing -->
                <div style="width:95px; height:133px; background:linear-gradient(135deg, #e03131 0%, #f08c00 100%); border:3px solid var(--accent-gold); border-radius:6px; box-shadow:0 8px 25px rgba(201,42,42,0.3), 0 0 10px rgba(205,162,80,0.2); display:flex; flex-direction:column; justify-content:space-between; padding:5px; position:relative; overflow:hidden;">
                    <!-- Foil sheen overlay -->
                    <div style="position:absolute; top:0; left:0; width:200%; height:200%; background:linear-gradient(45deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,0) 50%); transform:translate(-50%, -50%) rotate(30deg); animation:sheen 6s infinite linear;"></div>
                    
                    <!-- Header -->
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:0.45rem; color:#fff; font-weight:900; text-shadow:0 1px 2px #000; font-family:var(--font-heading);">Charizard ex</span>
                        <span style="font-size:0.45rem; color:#fff; font-weight:900; text-shadow:0 1px 2px #000;">330 HP <i class="fa-solid fa-fire" style="font-size:0.4rem; color:#fff; background:#e03131; padding:2px; border-radius:50%;"></i></span>
                    </div>
                    
                    <!-- Illustration Window -->
                    <div style="width:100%; height:50px; border:1.5px solid var(--accent-gold); background:url('assets/logo_round.jpg'); background-size:cover; background-position:center; border-radius:2px; box-shadow:inset 0 0 5px #000;"></div>
                    
                    <!-- Attack info -->
                    <div style="background:rgba(26,24,21,0.85); border-radius:2px; padding:2px; font-size:0.35rem; color:#eae3d2; border:0.5px solid var(--accent-gold)55;">
                        <div style="font-weight:700; text-align:center; font-size:0.38rem; color:var(--accent-gold);">Fuego Feroz EX</div>
                        <div style="text-align:center; color:#ccc;">Descarta 1 energía. - 220 dmg</div>
                    </div>
                </div>
            </div>
        `;
    }

    return art;
}

// --- CARRITO DE COMPRAS LÓGICA ---

// Agregar producto general al carrito
window.addToCart = function(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    const cartQty = existingItem ? existingItem.quantity : 0;

    if (product.stock > cartQty) {
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                visualType: product.visualType,
                imagePath: product.imagePath
            });
        }
        
        saveCart();
        updateCartUI();
        renderCatalog(); // Re-render para actualizar badges de stock

        // Animación de rebote sutil del carrito de la barra
        const cartBtn = document.getElementById('cart-trigger');
        cartBtn.classList.add('fa-bounce');
        setTimeout(() => cartBtn.classList.remove('fa-bounce'), 800);
    }
};

// Ajustar cantidad (Suma / Resta) en el sidebar
window.updateQty = function(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    const originalProduct = PRODUCTS.find(p => p.id === productId);
    const maxStock = originalProduct ? originalProduct.stock : 99;

    if (change > 0 && item.quantity < maxStock) {
        item.quantity += 1;
    } else if (change < 0) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
    }

    saveCart();
    updateCartUI();
    renderCatalog(); // Recarga catálogos por stock
};

// Eliminar producto por completo del carrito
window.removeItem = function(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCart();
    updateCartUI();
    renderCatalog();
};

// Actualizar UI del Carrito
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cartEmpty = document.getElementById('cart-empty');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartFooter = document.getElementById('cart-footer');

    // Cantidad Total
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Visibilidad del Carrito
    if (totalItems === 0) {
        cartEmpty.classList.remove('hidden');
        cartItemsList.classList.add('hidden');
        cartFooter.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        cartItemsList.classList.remove('hidden');
        cartFooter.classList.remove('hidden');

        // Renderizar items
        cartItemsList.innerHTML = cart.map(item => {
            const originalProduct = PRODUCTS.find(p => p.id === item.id);
            const maxStock = originalProduct ? originalProduct.stock : 99;
            const reachedMax = item.quantity >= maxStock;

            return `
                <div class="cart-item">
                    <div style="width: 45px; height: 55px; position:relative; overflow:hidden; border-radius:4px; flex-shrink:0;">
                        ${item.imagePath ? `<img src="${item.imagePath}" alt="${item.name}" style="width:100%; height:100%; object-fit:contain;">` : drawMiniVisual(item.visualType)}
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <span class="cart-item-price">$${formatPrice(item.price)} ARS</span>
                        <div class="cart-item-qty">
                            <button class="qty-btn" onclick="updateQty('${item.id}', -1)" aria-label="Restar una unidad">-</button>
                            <span class="qty-num">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQty('${item.id}', 1)" ${reachedMax ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ''} aria-label="Sumar una unidad">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" onclick="removeItem('${item.id}')" aria-label="Eliminar ${item.name} del carrito">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;
        }).join('');

        // Actualizar total monetario
        cartTotalPrice.textContent = `$${formatPrice(getCartTotal())} ARS`;
    }
}

// Dibujado muy básico de producto dentro del carrito
function drawMiniVisual(type) {
    if (type.startsWith('board-game')) {
        const isGreen = type.includes('green');
        const color = isGreen ? '#2b8a3e' : '#1971c2';
        return `<div style="width:100%; height:100%; background:${color}; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-chess-board" style="font-size:1.2rem; color:#fff;"></i></div>`;
    } else if (type === 'booster' || type === 'blister') {
        const color = type === 'blister' ? '#c92a2a' : '#cda250';
        return `<div style="width:100%; height:100%; background:#26231e; display:flex; align-items:center; justify-content:center; border:1px solid ${color};"><i class="fa-solid fa-dragon" style="font-size:1.1rem; color:${color};"></i></div>`;
    } else if (type === 'tin') {
        return `<div style="width:100%; height:100%; background:#3b3730; display:flex; align-items:center; justify-content:center; border:1px solid var(--accent-gold);"><i class="fa-solid fa-box-open" style="font-size:1.1rem; color:var(--accent-gold);"></i></div>`;
    } else if (type.startsWith('single')) {
        return `<div style="width:100%; height:100%; background:linear-gradient(135deg, #e03131, #f08c00); display:flex; align-items:center; justify-content:center; border:1px solid var(--accent-gold);"><i class="fa-solid fa-fire" style="font-size:1rem; color:#fff;"></i></div>`;
    } else {
        const isRed = type.includes('red') || type.includes('combo');
        const color = isRed ? '#c92a2a' : '#cda250';
        return `<div style="width:100%; height:100%; background:#1c1a16; display:flex; align-items:center; justify-content:center; border:1px solid ${color};"><i class="fa-solid fa-box-archive" style="font-size:1.1rem; color:${color};"></i></div>`;
    }
}

// Formatear pedido para coordinar por WhatsApp
function enviarPedidoWhatsApp() {
    let msg = `⛩️ *NUEVO PEDIDO - NANBU TCG* ⛩️\n`;
    msg += `---------------------------------\n`;
    msg += `Me gustaría encargar los siguientes productos:\n\n`;

    cart.forEach(item => {
        msg += `• *${item.quantity}x* ${item.name}\n`;
        msg += `  Subtotal: $${formatPrice(item.price * item.quantity)} ARS\n\n`;
    });

    msg += `---------------------------------\n`;
    msg += `*TOTAL ESTIMADO:* $${formatPrice(getCartTotal())} ARS\n\n`;
    msg += `¡Hola! Me gustaría ponerme en contacto para coordinar el método de pago y la entrega. ¡Muchas gracias!`;

    const encodedMsg = encodeURIComponent(msg);
    const waUrl = `https://wa.me/5493413060358?text=${encodedMsg}`;
    
    // Abre en pestaña nueva
    window.open(waUrl, '_blank');
}

// --- SAKURA CANVAS FALLING FLOWER ANIMATION ---
function initSakuraCanvas() {
    const canvas = document.getElementById('sakura-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let petals = [];
    const maxPetals = 45;

    // Ajustar dimensiones del Canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Clase para representar cada pétalo
    class Petal {
        constructor() {
            this.reset();
            // Iniciar pétalos dispersos por toda la pantalla en la carga inicial
            this.y = Math.random() * canvas.height;
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.size = Math.random() * 8 + 6; // Entre 6 y 14px
            this.speedY = Math.random() * 1.2 + 0.8; // Descenso suave
            this.speedX = Math.random() * 1 - 0.5; // Desplazamiento horizontal
            this.angle = Math.random() * Math.PI * 2;
            this.rotationSpeed = Math.random() * 0.02 - 0.01;
            this.oscillationSpeed = Math.random() * 0.02 + 0.005;
            this.oscillationDistance = Math.random() * 20 + 10;
            this.time = Math.random() * 100;
            
            // Elegir color: 80% rosa sakura suave, 20% dorado Nanbu
            const rand = Math.random();
            if (rand < 0.75) {
                // Rosa cerezo
                this.color = `rgba(${Math.floor(Math.random() * 20 + 235)}, ${Math.floor(Math.random() * 25 + 175)}, ${Math.floor(Math.random() * 20 + 195)}, ${Math.random() * 0.35 + 0.4})`;
            } else {
                // Dorado tradicional
                this.color = `rgba(205, 162, 80, ${Math.random() * 0.3 + 0.35})`;
            }
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.time) * 0.4;
            this.time += this.oscillationSpeed;
            this.angle += this.rotationSpeed;

            // Si sale de los límites laterales, rebota o aparece del otro lado
            if (this.x < -10) this.x = canvas.width + 10;
            if (this.x > canvas.width + 10) this.x = -10;

            // Si cae al fondo, resetear arriba
            if (this.y > canvas.height + 10) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = this.color;
            
            // Dibujar forma de pétalo ovalada con hendidura tradicional
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        }
    }

    // Poblar array de pétalos
    for (let i = 0; i < maxPetals; i++) {
        petals.push(new Petal());
    }

    // Bucle de animación
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        petals.forEach(petal => {
            petal.update();
            petal.draw();
        });

        requestAnimationFrame(animate);
    }
    animate();
}
