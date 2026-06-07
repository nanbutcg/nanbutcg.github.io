/* ==========================================================================
   NANBU TCG - INVENTARIO DE PRODUCTOS (COMPARTIDO)
   ========================================================================== */

const PRODUCTS = [
    {
        id: "prod-01",
        name: "ETB Chaos Rising",
        category: "sellados",
        price: 170000,
        stock: 3,
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
        stock: 2,
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
        stock: 18,
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
        stock: 3,
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
        stock: 4,
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
        stock: 2,
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
        stock: 1,
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
        stock: 1,
        badge: "Clásicos",
        description: "Normalmente en los juegos no se permite hacer trampas. ¡Pero en este juego sí! Se trata de ser el primer jugador en deshacerse de todas las cartas y por eso hace falta ser ingeniosos a la hora de descartar y muy hábiles haciendo trampas.",
        imagePath: "assets/polilla_tramposa.jpg",
        visualType: "board-game"
    }
];
