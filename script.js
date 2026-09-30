const inputs = [
  document.getElementById("nota1"),
  document.getElementById("nota2"),
  document.getElementById("nota3")
];

const resultado = document.getElementById("resultado");
const heroAverage = document.getElementById("heroAverage");
const heroBar = document.getElementById("heroBar");

function calcular() {
  const valores = inputs.map(input => Number(input.value));

  if (inputs.some(input => input.value.trim() === "")) {
    mostrarError("Completa las tres notas.");
    return;
  }

  if (valores.some(nota => Number.isNaN(nota) || nota < 0 || nota > 5)) {
    mostrarError("Las notas deben estar entre 0.0 y 5.0.");
    return;
  }

  const promedio = valores.reduce((suma, nota) => suma + nota, 0) / valores.length;
  const aprobado = promedio >= 3;

  resultado.classList.toggle("fail", !aprobado);
  resultado.querySelector(".result-icon").textContent = aprobado ? "🎉" : "📖";
  resultado.querySelector("span").textContent =
    aprobado ? "¡Felicitaciones! Tu resultado es:" : "Puedes seguir mejorando. Tu resultado es:";
  resultado.querySelector("strong").textContent =
    `${promedio.toFixed(2)} — ${aprobado ? "APROBADO" : "NO APROBADO"}`;

  heroAverage.textContent = promedio.toFixed(2);
  heroBar.style.width = `${(promedio / 5) * 100}%`;
}

function mostrarError(mensaje) {
  resultado.classList.add("fail");
  resultado.querySelector(".result-icon").textContent = "⚠️";
  resultado.querySelector("span").textContent = mensaje;
  resultado.querySelector("strong").textContent = "Revisa los datos";
}

function limpiar() {
  inputs.forEach(input => input.value = "");
  resultado.classList.remove("fail");
  resultado.querySelector(".result-icon").textContent = "🎓";
  resultado.querySelector("span").textContent = "Tu resultado aparecerá aquí";
  resultado.querySelector("strong").textContent = "—";
  heroAverage.textContent = "—";
  heroBar.style.width = "0%";
}

document.getElementById("calcular").addEventListener("click", calcular);
document.getElementById("limpiar").addEventListener("click", limpiar);

inputs.forEach(input => {
  input.addEventListener("keydown", event => {
    if (event.key === "Enter") calcular();
  });
});
