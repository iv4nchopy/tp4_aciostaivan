document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("buscarRickBtn");
    const input = document.getElementById("rickInput");
    const out = document.getElementById("rickResultado");

    btn.addEventListener("click", async () => {
        const id = input.value.trim();

        // Validación
        if (!id || isNaN(id)) {
            out.innerText = "Por favor ingresa un ID numérico válido (1, 2, 3...).";
            return;
        }

        out.innerText = "Cargando...";

        try {
            const res = await fetch(
                `https://rickandmortyapi.com/api/character/${encodeURIComponent(id)}`
            );

            if (!res.ok) throw new Error("Personaje no encontrado");

            const c = await res.json();

            // Construir contenedor con clase infoRick
            out.innerHTML = `
                <div class="infoRick">
                    <h3>${c.name}</h3>
                    <img src="${c.image || ""}" alt="${c.name}">
                    <p><strong>Estado:</strong> ${c.status}</p>
                    <p><strong>Especie:</strong> ${c.species}</p>
                    <p><strong>Género:</strong> ${c.gender}</p>
                    <p><strong>Origen:</strong> ${c.origin?.name || "Desconocido"}</p>
                </div>
            `;
        } catch (err) {
            out.innerText = "Error: " + err.message;
        }
    });
});
