const API = "http://localhost:3000/productos";

const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const stock = document.getElementById("stock");
const tabla = document.getElementById("tablaProductos");
const btnGuardar = document.getElementById("btnGuardar");

async function cargarProductos() {
    const res = await fetch(API);
    const data = await res.json();

    tabla.innerHTML = "";
    data.forEach(p => {
        tabla.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.nombre}</td>
                <td>S/. ${p.precio}</td>
                <td>${p.stock}</td>
                <td>
                    <button class="btn-delete" onclick="eliminarProducto(${p.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

btnGuardar.addEventListener("click", async () => {
    const nuevo = {
        nombre: nombre.value,
        precio: parseFloat(precio.value),
        stock: parseInt(stock.value)
    };

    if(!nuevo.nombre || isNaN(nuevo.precio)) return alert("Llena los campos correctamente");

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo)
    });

    // Limpiar campos y recargar
    nombre.value = ""; precio.value = ""; stock.value = "";
    cargarProductos();
});

async function eliminarProducto(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    cargarProductos();
}

cargarProductos();