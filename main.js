// Configuración interna (Invisibles para el salón)
const CONFIG = {
    cotizacionDolar: 1350 // Modificás solo esto a fin de mes
};

// 1. Base de datos: Servicios Individuales
const individualesConfig = [
    { nombre: "Invitación Estática", descripcion: "Invitación interactiva base en formato digital fija con control RSVP nativo.", usdMayorista: 10, usdSugerido: 20 },
    { nombre: "Invitación Web Interactiva", descripcion: "Landing page premium animada con mapas, pases, contador y botones interactivos.", usdMayorista: 15, usdSugerido: 30 },
    { nombre: "Álbum Digital en la Nube", descripcion: "Galería fotográfica interactiva donde los invitados suben fotos mediante QR.", usdMayorista: 12, usdSugerido: 25 },
    { nombre: "Muro de Deseos en Vivo", descripcion: "Pantalla interactiva para proyectar los mensajes y fotos de los invitados en tiempo real.", usdMayorista: 18, usdSugerido: 40 }
];

// 2. Base de datos: Packs Promocionales (Actualizados)
const packsConfig = [
    { 
        nombre: "Pack Inicial", 
        descripcion: "Invitación digital estática combinada con la galería fotográfica en la nube para los invitados.", 
        usdMayorista: 18, 
        usdSugerido: 35 
    },
    { 
        nombre: "Pack Essential", 
        descripcion: "Invitación Web interactiva animada full, combinada con el álbum digital en la nube.", 
        usdMayorista: 24, 
        usdSugerido: 50 
    },
    { 
        nombre: "Pack Premium", 
        descripcion: "La experiencia digital absoluta para el evento: Invitación Web, Álbum en la nube y el Muro de Deseos en vivo para la pantalla del salón.", 
        usdMayorista: 35, 
        usdSugerido: 75 
    }
];

// Función para redondear a múltiplos de 500 para el mercado argentino
function redondearPrecios(valor) {
    return Math.round(valor / 500) * 500;
}

// Generador genérico de tarjetas
function crearCard(servicio, esPack = false) {
    const costoEstudio = redondearPrecios(servicio.usdMayorista * CONFIG.cotizacionDolar);
    const precioSugerido = redondearPrecios(servicio.usdSugerido * CONFIG.cotizacionDolar);
    const ganancia = precioSugerido - costoEstudio;

    const card = document.createElement("div");
    card.className = "card-servicio";

    // si es pack, le agregamos una clase extra para destacar
    if (esPack) {
        card.classList.add("card-destacada");
    }

    card.style.opacity = "0"; // Inicial para GSAP

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
    const contenedorIndiv = document.getElementById("contenedor-individuales");
    const contenedorPacks = document.getElementById("contenedor-packs");

    if (contenedorIndiv && contenedorPacks) {
        contenedorIndiv.innerHTML = "";
        contenedorPacks.innerHTML = "";

        // Inyectar Datos
        individualesConfig.forEach(s => contenedorIndiv.appendChild(crearCard(s)));
        packsConfig.forEach(p => contenedorPacks.appendChild(crearCard(p, true)));

        // --- MAGIA GSAP TIMELINE ---
        const tl = gsap.timeline();
        
        tl.from(".main-header", { opacity: 0, y: -20, duration: 0.6, ease: "power2.out" })
          .from(".section-title-wrapper", { opacity: 0, y: 15, duration: 0.5, stagger: 0.2 }, "-=0.3")
          .to(".card-servicio", { opacity: 1, y: 0, startAt: { y: 25 }, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.4")
          .from(".btn-whatsapp-cta", { opacity: 0, scale: 0.9, duration: 0.5, ease: "back.out(1.7)" }, "-=0.2");
    }
}

document.addEventListener("DOMContentLoaded", renderApp);