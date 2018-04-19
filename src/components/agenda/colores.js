const colores = [
  { fondo: "#9c27b0", texto: "#ffffff" },
  { fondo: "#673ab7", texto: "#ffffff" },
  { fondo: "#3f51b5", texto: "#ffffff" },
  { fondo: "#2196f3", texto: "#ffffff" },
  { fondo: "#03a9f4", texto: "#222222" },
  { fondo: "#00bcd4", texto: "#222222" },
  { fondo: "#009688", texto: "#ffffff" },
  { fondo: "#4caf50", texto: "#ffffff" },
  { fondo: "#8bc34a", texto: "#222222" },
  { fondo: "#cddc39", texto: "#222222" },
  { fondo: "#ffeb3b", texto: "#222222" },
  { fondo: "#ffc107", texto: "#222222" },
  { fondo: "#ff9800", texto: "#222222" },
  { fondo: "#ff5722", texto: "#ffffff" },
  { fondo: "#f44336", texto: "#ffffff" },
  { fondo: "#e91e63", texto: "#ffffff" },
  { fondo: "#e5097f", texto: "#ffffff" },
  { fondo: "#aa00ff", texto: "#ffffff" },
  { fondo: "#6200ea", texto: "#ffffff" },
  { fondo: "#304ffe", texto: "#ffffff" },
  { fondo: "#2962ff", texto: "#ffffff" },
  { fondo: "#0091ea", texto: "#222222" },
  { fondo: "#00b8d4", texto: "#222222" },
  { fondo: "#00bfa5", texto: "#222222" },
  { fondo: "#00c853", texto: "#222222" },
  { fondo: "#64dd17", texto: "#222222" },
  { fondo: "#aeea00", texto: "#222222" },
  { fondo: "#ffd600", texto: "#222222" },
  { fondo: "#ffab00", texto: "#222222" },
  { fondo: "#ff6d00", texto: "#ffffff" },
  { fondo: "#ff3d00", texto: "#ffffff" },
  { fondo: "#ff1744", texto: "#ffffff" },
  { fondo: "#f50057", texto: "#ffffff" },
];

export default obtenerColor;

function obtenerColor(string) {
  const temp = string.split("")
    .map(char => char.charCodeAt())
    .reduce((res, val) => res + val, 0);

  return colores[temp % 33];
}
