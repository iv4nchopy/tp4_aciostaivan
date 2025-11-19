document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("buscarPaisBtn");
    const input = document.getElementById("paisInput");
    const out = document.getElementById("paisResultado");

    // Función para elegir imagen decorativa (Pexels)
    function obtenerImagen(pais) {
        const imgs = {
            paraguay: "https://images.pexels.com/photos/16797780/pexels-photo-16797780.jpeg",
            argentina: "https://images.pexels.com/photos/977736/pexels-photo-977736.jpeg",
            brasil: "https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg",
            chile: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg",
            colombia: "https://images.pexels.com/photos/432903/pexels-photo-432903.jpeg"
        };
        return imgs[pais.toLowerCase()] || 
            "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg";
    }

    btn.addEventListener("click", async () => {
        const nombre = input.value.trim();

        if (!nombre) {
            out.innerHTML = `<p class="error">Ingresa el nombre de un país.</p>`;
            return;
        }

        out.innerHTML = `<p>Cargando información...</p>`;

        try {
            // Fetch REST Countries
            const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(nombre)}`);
            if (!res.ok) throw new Error("País no encontrado");

            const data = await res.json();
            const p = data[0];

            // Imagen decorativa
            const imgRef = obtenerImagen(p.name.common);

            out.innerHTML = `
                <div class="infoPais fade">
                    <h3>${p.name.common} ${p.flag || ""}</h3>

                    <p><strong>Capital:</strong> ${p.capital?.[0] || "—"}</p>
                    <p><strong>Población:</strong> ${p.population.toLocaleString()}</p>

                    <img class="bandera" 
                        src="${p.flags?.png || p.flags?.svg}" 
                        alt="Bandera de ${p.name.common}">

                    <img class="imagenRef" 
                        src="${imgRef}" 
                        alt="Imagen de ${p.name.common}">
                </div>
            `;

            // Animación suave
            const box = out.querySelector(".infoPais");
            setTimeout(() => {
                box.style.opacity = 1;
                box.style.transform = "translateY(0)";
            }, 50);

        } catch (err) {
            out.innerHTML = `<p class="error">Error: ${err.message}</p>`;
        }
    });
});
