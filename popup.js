// Compruebo si tengo conexión con la página que me abrió
// (con noopener esto saldría null; aquí es del mismo sitio, así que existe)
document.getElementById("opener").textContent =
  "window.opener: " + (window.opener ? "existe" : "null");

window.addEventListener("message", (e) => {
  // Si el mensaje no viene de mi mismo origen, lo ignoro
  if (e.origin !== location.origin) return;

  // textContent en vez de innerHTML, para que no me cuelen código
  document.getElementById("mensaje").textContent = "Hola, " + e.data.usuario;
});