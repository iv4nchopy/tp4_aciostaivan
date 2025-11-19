document.addEventListener('DOMContentLoaded', () => {

    const select = document.getElementById('criptoSelect');
    const btn = document.getElementById('buscarCriptoBtn');
    const out = document.getElementById('criptoResultado');

    // Cargar lista de criptomonedas
    async function cargarLista() {
        select.innerHTML = '<option value="">Cargando criptomonedas...</option>';
        try {
            const res = await fetch(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
            );

            if (!res.ok) throw new Error("Error al obtener datos");

            const arr = await res.json();

            select.innerHTML = arr
                .map(c => `<option value="${c.id}">${c.name} (${c.symbol.toUpperCase()})</option>`)
                .join('');

        } catch (error) {
            console.error(error);
            select.innerHTML = '<option value="">Error cargando lista</option>';
        }
    }

    // Consultar una criptomoneda por id
    async function consultar(id) {
        if (!id) {
            out.innerHTML = '<div class="infoCripto">⚠ Selecciona una criptomoneda primero.</div>';
            return;
        }

        out.innerHTML = '<div class="infoCripto">Cargando datos...</div>';

        try {
            const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${encodeURIComponent(id)}&order=market_cap_desc&per_page=1&page=1&sparkline=false`;

            const res = await fetch(url);

            if (!res.ok) throw new Error("No se pudo obtener información");

            const arr = await res.json();
            if (!arr || arr.length === 0) throw new Error('No hay datos disponibles');

            const c = arr[0];

            out.innerHTML = `
                <div class="infoCripto">
                    <h3>${c.name} (${c.symbol.toUpperCase()})</h3>
                    <p><strong>Precio:</strong> $${(c.current_price ?? 0).toLocaleString()}</p>
                    <p><strong>Cambio 24h:</strong> ${(c.price_change_percentage_24h ?? 0).toFixed(2)}%</p>
                    <p><strong>Market Cap:</strong> $${(c.market_cap ?? 0).toLocaleString()}</p>
                </div>
            `;

        } catch (err) {
            console.error(err);
            out.innerHTML = `<div class="infoCripto">❌ Error: ${err.message}</div>`;
        }
    }

    // Cargar lista al inicio
    cargarLista();

    // Botón buscar
    btn.addEventListener('click', () => {
        consultar(select.value);
    });

});
