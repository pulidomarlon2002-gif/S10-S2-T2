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
                <td>${p.precio}</td>
                <td>${p.stock}</td>
                <td>
                    <button class="btn-edit" onclick="editarProducto(${p.id})">Editar</button>
                    <button class="btn-delete" onclick="eliminarProducto(${p.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

btnGuardar.addEventListener("click", async () => {
    const nuevo = {
        nombre: nombre.value,
        precio: precio.value,
        stock: stock.value
    };

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo)
    });

    cargarProductos();
});

async function eliminarProducto(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    cargarProductos();
}

async function editarProducto(id) {
    const nuevoNombre = prompt("Nuevo nombre:");
    const nuevoPrecio = prompt("Nuevo precio:");
    const nuevoStock = prompt("Nuevo stock:");

    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nombre: nuevoNombre,
            precio: nuevoPrecio,
            stock: nuevoStock
        })
    });

    cargarProductos();
}

cargarProductos();
