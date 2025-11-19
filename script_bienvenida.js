// Maneja el nombre del usuario y saluda en las páginas
(function(){
    const key = 'tp4_usuario';

    function getNombre(){ return localStorage.getItem(key) || null }
    function setNombre(n){ localStorage.setItem(key, n) }
    function clearNombre(){ localStorage.removeItem(key) }

    function mostrar(){
        const cont = document.getElementById('mensajeBienvenida');
        if(!cont) return;
        const nombre = getNombre();
        if(nombre){ 
            cont.innerHTML = `Bienvenido/a, <span style="color:var(--accent)">${nombre}</span> 👋`; 
        }
        else{ 
            cont.textContent = '¡Bienvenido! Presiona "Ingresar nombre y apellido" para personalizar.';
        }
    }

    document.addEventListener('DOMContentLoaded', ()=>{
        mostrar();

        const btn = document.getElementById('btnIngresarNombre');
        const btnBorrar = document.getElementById('btnBorrarNombre');

        if(btn){ 
            btn.addEventListener('click', ()=>{
                const n = prompt('Ingresa tu nombre y apellido:');
                if(n && n.trim()){ 
                    setNombre(n.trim());
                    mostrar();
                    alert('Gracias, ' + n);
                }
            });
        }

        if(btnBorrar){ 
            btnBorrar.addEventListener('click', ()=>{
                clearNombre();
                mostrar();
                alert('Nombre borrado');
            });
        }
    });
})();
