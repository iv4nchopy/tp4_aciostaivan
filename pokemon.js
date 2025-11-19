document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("buscarPokeBtn");
    const input = document.getElementById("pokeInput");
    const out = document.getElementById("pokeResultado");

    btn.addEventListener("click", async () => {
        const q = input.value.trim().toLowerCase();

        if (!q) {
            out.innerText = "Ingresa un nombre o ID de Pokémon.";
            return;
        }

        out.innerText = "Cargando...";

        try {
            const res = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(q)}`
            );

            if (!res.ok) throw new Error("Pokémon no encontrado");

            const p = await res.json();
            const tipos = p.types.map(t => t.type.name).join(", ");

            const img = p.sprites.front_default ||
                        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";

            const nombre = p.name.charAt(0).toUpperCase() + p.name.slice(1);

            out.innerHTML = `
                <div class="infoPokemon">
                    <h3>${nombre} (ID: ${p.id})</h3>
                    <img src="${img}" alt="${nombre}">
                    <p><strong>Tipo(s):</strong> ${tipos}</p>
                    <p><strong>Peso:</strong> ${p.weight}</p>
                    <p><strong>Altura:</strong> ${p.height}</p>
                </div>
            `;
        } catch (err) {
            out.innerText = "Error: " + err.message;
        }
    });
});
