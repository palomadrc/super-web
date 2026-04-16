let carrito = [];
let total = 0;

let productos = [
    {nombre:"manzanas", precio:30},
    {nombre:"leche", precio:25},
    {nombre:"pan", precio:20},
    {nombre:"platanos", precio:22},
    {nombre:"pollo", precio:85},
    {nombre:"refresco", precio:18},
    {nombre:"queso", precio:40},
    {nombre:"huevos", precio:35},
    {nombre:"jitomate", precio:28}
];

function agregar(nombre, precio){
    carrito.push({nombre, precio});
    total += precio;
    document.getElementById("contador").textContent = carrito.length;
    actualizar();
}

function actualizar(){
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    carrito.forEach((p, index)=>{
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = p.nombre + " - $" + p.precio +
            " <button class='btn btn-danger btn-sm' onclick='eliminar("+index+")'>X</button>";

        lista.appendChild(li);
    });

    document.getElementById("total").textContent = "Total: $" + total;
}

function eliminar(index){
    total -= carrito[index].precio;
    carrito.splice(index,1);
    document.getElementById("contador").textContent = carrito.length;
    actualizar();
}

function toggleCarrito(){
    let c = document.getElementById("carrito");
    if(c.style.display === "none" || c.style.display === ""){
        c.style.display = "block";
    } else {
        c.style.display = "none";
    }
}

function buscar(){
    let input = document.querySelector(".buscador-container input").value.toLowerCase();
    let cont = document.getElementById("sugerencias");
    cont.innerHTML = "";

    if(input === "") return;

    let res = productos.filter(p => p.nombre.includes(input));

    res.forEach(p=>{
        let div = document.createElement("div");
        div.textContent = p.nombre.charAt(0).toUpperCase() + p.nombre.slice(1); // Mayúscula visual
        div.onclick = ()=>{
            cont.innerHTML = "";
            filtrarProducto(p.nombre);
        };
        cont.appendChild(div);
    });
}

function filtrarProducto(nombre){
    let items = document.querySelectorAll(".producto-item");
    items.forEach(p => {
        if(p.id === nombre){
            p.style.display = "block";
        } else {
            p.style.display = "none";
        }
    });
}

function mostrarTodos(){
    let items = document.querySelectorAll(".producto-item");
    items.forEach(p => p.style.display = "block");
}

function abrirCheckout(){
    if(carrito.length === 0) {
        alert("Agrega productos al carrito primero");
        return;
    }
    document.getElementById("checkout").style.display = "block";
}

function comprar(){
    let nombre = document.getElementById("nombre").value;
    let direccion = document.getElementById("direccion").value;
    let metodo = document.getElementById("metodo").value;

    if(nombre === "" || direccion === "" || metodo === ""){
        alert("Completa todos los campos");
        return;
    }

    alert("Gracias por tu compra " + nombre + " 🎉\nTu pedido llegará a: " + direccion);

    // Limpiar todo
    carrito = [];
    total = 0;
    document.getElementById("contador").textContent = 0;
    document.getElementById("nombre").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("metodo").value = "";

    actualizar();
    document.getElementById("checkout").style.display = "none";
    document.getElementById("carrito").style.display = "none";
}