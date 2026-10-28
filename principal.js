// 1. Inspeccionar el BOM (en consola y en la página)
const datos =
  "Resolución: " + screen.width + "x" + screen.height + "\n" +
  "Navegador: " + navigator.userAgent + "\n" +
  "Páginas en el historial: " + history.length;

console.log(datos);
document.getElementById("info").textContent = datos;

// 2. Popup
let ventana = null; // null = no hay popup abierto

function abrirPopup() {
  // Si ya hay uno abierto, no abro otro, solo lo traigo al frente
  if (ventana && !ventana.closed) {
    ventana.focus();
    return;
  }

  ventana = window.open("popup.html", "miPopup", "width=500,height=400");

  // Si el navegador bloquea popups, ventana vale null
  if (!ventana) {
    alert("El navegador ha bloqueado la ventana emergente");
    return;
  }

  ventana.addEventListener("load", () => {
    // location.origin en vez de "*": solo lo recibe mi propio sitio
    ventana.postMessage({ usuario: "Ana" }, location.origin);
  });
}

function cerrarPopup() {
  if (ventana && !ventana.closed) {
    ventana.close();
  }
  ventana = null; // limpio la referencia
}

// Enganchar los botones (en vez de onclick en el HTML)
document.getElementById("btnAbrir").addEventListener("click", abrirPopup);
document.getElementById("btnCerrar").addEventListener("click", cerrarPopup);

// Si el usuario cierra el popup a mano, también limpio la referencia
setInterval(() => {
  if (ventana && ventana.closed) ventana = null;
}, 500);