/* ==========================================================================
   VISIÓN DESIGN — PORTAL PRIVADO DE PRECIOS (PESOS ARS DIRECTOS)
   ========================================================================== */

// 1. Base de datos: Servicios Individuales (Precios fijos en ARS)
const individualesConfig = [
    { 
        nombre: "Invitación Express", 
        descripcion: "Invitación interactiva base en formato digital fija con control RSVP nativo.", 
        arsMayorista: 15000,   // <-- Poné el billete exacto en pesos acá
        arsSugerido: 20000 
    },
    { 
        nombre: "Invitación Web Interactiva", 
        descripcion: "Landing page premium animada con mapas, pases, contador y botones interactivos.", 
        arsMayorista: 30000, 
        arsSugerido: 40000 
    },
    { 
        nombre: "Álbum Digital en la Nube", 
        descripcion: "Galería fotográfica interactiva donde los invitados suben fotos mediante QR.", 
        arsMayorista: 40000, 
        arsSugerido: 55000 
    },
    { 
        nombre: "Muro de Deseos en Vivo", 
        descripcion: "Pantalla interactiva para proyectar los mensajes y fotos de los invitados en tiempo real.", 
        arsMayorista: 40000, 
        arsSugerido: 55000 
    }
];

// 2. Base de datos: Packs Promocionales (Precios fijos en ARS)
const packsConfig = [
    { 
        nombre: "Pack Inicial", 
        descripcion: "Invitación digital estática combinada con la galería fotográfica en la nube para los invitados.", 
        arsMayorista: 50000, 
        arsSugerido: 65000 
    },
    { 
        nombre: "Pack Essential", 
        descripcion: "Invitación Web interactiva animada full, combinada con el álbum digital en la nube.", 
        arsMayorista: 65000, 
        arsSugerido: 85000 
    },
    { 
        nombre: "Pack Premium", 
        descripcion: "La experiencia digital absoluta para el evento: Invitación Web, Álbum en la nube y el Muro de Deseos en vivo para la pantalla del salón.", 
        arsMayorista: 95000, 
        arsSugerido: 130000 
    }
];

// Generador genérico de tarjetas
function crearCard(servicio, esPack = false) { 
    // Ahora tomamos los valores directos en pesos de la base de datos
    const costoEstudio = servicio.arsMayorista;
    const precioSugerido = servicio.arsSugerido;
    const ganancia = precioSugerido - costoEstudio;

    const card = document.createElement("div");
    card.className = "card-servicio";

    // Si es un pack, le inyectamos la clase de destaque para el borde premium
    if (esPack) {
        card.classList.add("card-destacada");
    }

    card.style.opacity = "0"; // Propiedad inicial para la transición fluida de GSAP

    card.innerHTML = `
        <h3>${servicio.nombre}</h3>
        <p class="descripcion">${servicio.descripcion}</p>
        <div class="desglose-precios">
            <div class="item-precio costo">
                <span>Costo Visión Design:</span>
                <strong>$${costoEstudio.toLocaleString('es-AR')}</strong>
            </div>
            <div class="item-precio sugerido">
                <span>Precio sugerido de venta:</span>
                <strong>$${precioSugerido.toLocaleString('es-AR')}</strong>
            </div>
            <div class="item-precio ganancia">
                <span>Tu ganancia neta por evento:</span>
                <strong class="tag-ganancia">+$${ganancia.toLocaleString('es-AR')}</strong>
            </div>
        </div>
    `;
    return card;
}

// Orquestación del render y animaciones GSAP
function renderApp() {
    const contenedorIndiv = document.getElementById("contenedor-individuals"); // Se adaptó al HTML
    const contenedorPacks = document.getElementById("contenedor-packs");

    // Buscamos compatibilidad con ambos nombres de id por las dudas
    const targetIndiv = contenedorIndiv || document.getElementById("contenedor-individuales");

    if (targetIndiv && contenedorPacks) {
        targetIndiv.innerHTML = "";
        contenedorPacks.innerHTML = "";

        // Inyectar Datos mapeando las listas fijas
        individualesConfig.forEach(s => targetIndiv.appendChild(crearCard(s, false)));
        packsConfig.forEach(p => contenedorPacks.appendChild(crearCard(p, true)));

        // --- ANIMACIÓN GSAP TIMELINE ---
        const tl = gsap.timeline();
        
        tl.from(".main-header", { opacity: 0, y: -20, duration: 0.6, ease: "power2.out" })
          .from(".section-title-wrapper", { opacity: 0, y: 15, duration: 0.5, stagger: 0.2 }, "-=0.3")
          .to(".card-servicio", { opacity: 1, y: 0, startAt: { y: 25 }, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.4")
          .from(".btn-whatsapp-cta", { opacity: 0, scale: 0.9, duration: 0.5, ease: "back.out(1.7)" }, "-=0.2");
    }
}

document.addEventListener("DOMContentLoaded", renderApp);