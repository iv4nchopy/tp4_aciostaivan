document.addEventListener("DOMContentLoaded", () => {

    const apiKey = "882572d0f1081083b8f366529bd4f671"; 

    // IDs corregidos según el HTML
    const btn = document.getElementById("btnBuscarClima");
    const input = document.getElementById("inputCiudad");
    const out = document.getElementById("resultadoClima");

    btn.addEventListener("click", async () => {
        const ciudad = input.value.trim();

        if (!ciudad) {
            out.textContent = "⚠ Ingresa el nombre de una ciudad.";
            return;
        }

        out.textContent = "Cargando...";

        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudad)}&appid=${apiKey}&units=metric&lang=es`
            );

            if (!res.ok) throw new Error("Ciudad no encontrada");

            const data = await res.json();

            out.innerHTML = `
                <h3>${data.name}, ${data.sys.country}</h3>
                <p>Temperatura: <strong>${data.main.temp} °C</strong></p>
                <p>Humedad: <strong>${data.main.humidity}%</strong></p>
                <p>Clima: <strong>${data.weather[0].description}</strong></p>
            `;
        } catch (err) {
            out.textContent = "❌ Error: " + err.message;
        }
    });

});
