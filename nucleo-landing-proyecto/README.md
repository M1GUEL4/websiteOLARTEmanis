# Núcleo — Landing Page (Crema de Maní Artesanal)

## Estructura del proyecto
```
/mani
├── index.html          → Marcado semántico, SEO, schema.org, las 13 secciones
├── css/style.css        → Sistema de diseño (variables, tipografía, componentes)
├── js/script.js         → Navbar, scroll reveal, FAQ, WhatsApp, back-to-top, video autoplay
├── images/               → Colocar aquí la fotografía real del producto
├── icons/favicon.svg     → Ícono de marca
└── components/           → Reservado para futuros fragmentos reutilizables (ej. header/footer)
```

## Antes de publicar (checklist de producción)

1. **Fotografía real**: todas las imágenes usan `picsum.photos` como placeholder.
   Reemplázalas por fotografía profesional del producto en `/images` y actualiza
   los `src` en `index.html`. Cada `alt` ya está redactado — solo cambia la URL.
2. **Videos**: la sección `#videos` trae `<video>` sin `src` (solo `poster`).
   Sube los clips verticales (9:16, sin audio) y añade `src="images/videoX.mp4"`.
3. **WhatsApp**: en `js/script.js`, reemplaza `PHONE = '51999999999'` por el
   número real del negocio en formato internacional sin el signo `+`.
4. **Dominio y Open Graph**: actualiza las URLs en las etiquetas `<meta property="og:*">`
   y `rel="canonical"` con el dominio definitivo.
5. **Precios y stock**: los precios y textos de "quedan pocas unidades" son de
   ejemplo — ajústalos a tu inventario real para no prometer algo falso (esto
   es importante tanto por ética de marketing como por leyes de protección al
   consumidor).
6. **Checkout real**: los botones "Comprar" / "Agregar" están listos visualmente
   pero no están conectados a una pasarela de pago ni carrito. Se recomienda
   integrarlos con la plataforma de e-commerce que uses (Shopify, WooCommerce,
   Culqui, Mercado Pago, etc.) o conectar el flujo a WhatsApp como carrito manual.

## Principios de código

- HTML5 semántico (`<header>`, `<main>`, `<section>`, `<footer>`) con foco visible
  para navegación por teclado y `prefers-reduced-motion` respetado.
- CSS con variables (`:root`) para que cualquier cambio de marca (color, tipografía,
  radios) se haga en un solo lugar.
- JavaScript modular sin dependencias externas — cada función tiene una sola
  responsabilidad (`initNavbar`, `initFAQ`, etc.) y se inicializa en `DOMContentLoaded`.
- Imágenes con `loading="lazy"` (excepto el hero, que carga `eager` por ser
  contenido above-the-fold).

## Objetivo psicológico de cada sección

Cada sección del `index.html` incluye un comentario HTML justo antes de su
código explicando: el objetivo psicológico, la emoción que busca generar, la
objeción que elimina y la acción que espera provocar — tal como se pidió en
el brief. Esto sirve como documentación viva para que el equipo de marketing
entienda el "por qué" detrás de cada bloque, no solo el "qué".
