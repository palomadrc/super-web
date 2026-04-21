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
        li.innerHTML = p.nombre + " - $" + p.precio + " <button class='btn btn-danger btn-sm' onclick='eliminar("+index+")'>X</button>";
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

function filtrarCategoria(categoria) {
    let items = document.querySelectorAll(".producto-item");
    items.forEach(p => {
        if(p.classList.contains(categoria)){
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

function toggleCarrito(){
    let c = document.getElementById("carrito");
    c.style.display = (c.style.display === "none" || c.style.display === "") ? "block" : "none";
}

function buscar(){
    let input = document.querySelector(".buscador-container input").value.toLowerCase();
    let cont = document.getElementById("sugerencias");
    cont.innerHTML = "";
    if(input === "") return;
    let res = productos.filter(p => p.nombre.includes(input));
    res.forEach(p=>{
        let div = document.createElement("div");
        div.textContent = p.nombre.charAt(0).toUpperCase() + p.nombre.slice(1);
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
        p.style.display = (p.id === nombre) ? "block" : "none";
    });
}

function abrirCheckout(){
    if(carrito.length === 0) return alert("Agrega productos");
    document.getElementById("checkout").style.display = "block";
}

function comprar(){
    let nombre = document.getElementById("nombre").value;
    if(!nombre) return alert("Completa los datos");
    alert("¡Gracias por tu compra " + nombre + "!");
    carrito = []; total = 0;
    document.getElementById("contador").textContent = 0;
    actualizar();
    document.getElementById("checkout").style.display = "none";
    document.getElementById("carrito").style.display = "none";
}