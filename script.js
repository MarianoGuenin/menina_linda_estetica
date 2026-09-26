// =====================================
// MENINA LINDA ESTÉTICA
// SISTEMA DE SERVICIOS Y RESERVAS
// =====================================


// =====================================
// PRECIOS
// =====================================

const servicios = {

    manos: {
        nombre: "Spa de manos",
        precio: 10000,
        duracion: "Horario estimado: 1 hora"
    },

    pies: {
        nombre: "Spa de pies",
        precio: 13000,
        duracion: "Horario estimado: 1 hora"
    },

    simple: {
        nombre: "Limpieza facial simple",
        precio: 15000,
        duracion: "Horario estimado: 1 hora"
    },

    extraccion: {
        nombre: "Limpieza facial con extracción y alta frecuencia",
        precio: 20000,
        duracion: "Horario estimado: 2 horas"
    }

};


// =====================================
// VARIABLES
// =====================================

let carrito = [];


// =====================================
// FORMATO DE DINERO
// =====================================

function dinero(numero) {

    return numero.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0
    });

}


// =====================================
// SELECCIONAR SPA DE MANOS / PIES
// =====================================

function seleccionarServicio(id) {

    const servicio = servicios[id];

    if (!servicio) {
        return;
    }


    // Buscar si ya existe
    const indice = carrito.findIndex(
        producto => producto.id === id
    );


    // Si ya está seleccionado, no hacemos nada
    if (indice !== -1) {

        mostrarMensaje(
            "Este servicio ya está seleccionado"
        );

        return;
    }


    // Agregar
    carrito.push({
        id: id,
        nombre: servicio.nombre,
        precio: servicio.precio,
        duracion: servicio.duracion
    });


    actualizarCarrito();

    actualizarBotones();

    mostrarMensaje(
        servicio.nombre + " agregado"
    );
}


// =====================================
// SELECCIONAR LIMPIEZA FACIAL
// =====================================

function seleccionarFacial(tipo) {

    const servicio = servicios[tipo];

    if (!servicio) {
        return;
    }


    // Buscar cualquier limpieza facial
    const indiceFacial = carrito.findIndex(
        producto =>
            producto.id === "simple" ||
            producto.id === "extraccion"
    );


    // Si ya existe una limpieza facial
    if (indiceFacial !== -1) {

        // Si es la misma, no hacer nada
        if (carrito[indiceFacial].id === tipo) {

            actualizarCarrito();

            actualizarBotones();

            return;
        }


        // Si es la otra, reemplazarla
        carrito[indiceFacial] = {
            id: tipo,
            nombre: servicio.nombre,
            precio: servicio.precio,
            duracion: servicio.duracion
        };

    } else {

        // No había ninguna facial
        carrito.push({
            id: tipo,
            nombre: servicio.nombre,
            precio: servicio.precio,
            duracion: servicio.duracion
        });

    }


    actualizarCarrito();

    actualizarBotones();

    mostrarMensaje(
        servicio.nombre + " seleccionado"
    );
}


// =====================================
// ACTUALIZAR BOTONES
// =====================================

function actualizarBotones() {

    const botonManos =
        document.getElementById("botonManos");

    const botonPies =
        document.getElementById("botonPies");


    // MANOS

    if (
        carrito.some(
            producto => producto.id === "manos"
        )
    ) {

        botonManos.textContent = "Elegido";

        botonManos.classList.add("seleccionado");

    } else {

        botonManos.textContent = "Elegir";

        botonManos.classList.remove("seleccionado");
    }


    // PIES

    if (
        carrito.some(
            producto => producto.id === "pies"
        )
    ) {

        botonPies.textContent = "Elegido";

        botonPies.classList.add("seleccionado");

    } else {

        botonPies.textContent = "Elegir";

        botonPies.classList.remove("seleccionado");
    }


    // RADIO FACIAL

    const radioSimple =
        document.querySelector(
            'input[value="simple"]'
        );

    const radioExtraccion =
        document.querySelector(
            'input[value="extraccion"]'
        );


    if (radioSimple) {

        radioSimple.checked =
            carrito.some(
                producto => producto.id === "simple"
            );

    }


    if (radioExtraccion) {

        radioExtraccion.checked =
            carrito.some(
                producto => producto.id === "extraccion"
            );

    }


    // Marcar visualmente las tarjetas faciales

    const tarjetaSimple =
        document.getElementById(
            "servicioFacialSimple"
        );

    const tarjetaExtraccion =
        document.getElementById(
            "servicioFacialExtraccion"
        );


    if (tarjetaSimple) {

        tarjetaSimple.classList.toggle(
            "seleccionado",

            carrito.some(
                producto => producto.id === "simple"
            )
        );

    }


    if (tarjetaExtraccion) {

        tarjetaExtraccion.classList.toggle(
            "seleccionado",

            carrito.some(
                producto => producto.id === "extraccion"
            )
        );

    }
}


// =====================================
// ACTUALIZAR CARRITO
// =====================================

function actualizarCarrito() {

    const lista =
        document.getElementById("listaCarrito");

    const totalElemento =
        document.getElementById("totalCarrito");

    const cantidad =
        document.getElementById("cantidadCarrito");


    lista.innerHTML = "";


    let total = 0;


    if (carrito.length === 0) {

        lista.innerHTML = `
            <p style="
                text-align:center;
                color:#87616b;
                padding:20px 0;
            ">
                Todavía no seleccionaste ningún servicio.
            </p>
        `;

    } else {

        carrito.forEach(
            (producto, indice) => {

                total += producto.precio;


                const elemento =
                    document.createElement("div");

                elemento.className =
                    "producto-carrito";


                elemento.innerHTML = `

                    <div class="producto-carrito-info">

                        <strong>
                            ${producto.nombre}
                        </strong>

                        <span>
                            ${producto.duracion}
                            ·
                            ${dinero(producto.precio)}
                        </span>

                    </div>

                    <button
                        class="boton-eliminar"
                        onclick="eliminarProducto(${indice})"
                        title="Eliminar"
                    >
                        ×
                    </button>

                `;


                lista.appendChild(elemento);

            }
        );

    }


    totalElemento.textContent =
        dinero(total);

    cantidad.textContent =
        carrito.length;
}


// =====================================
// ELIMINAR SERVICIO
// =====================================

function eliminarProducto(indice) {

    if (
        indice < 0 ||
        indice >= carrito.length
    ) {
        return;
    }


    carrito.splice(indice, 1);


    actualizarCarrito();

    actualizarBotones();
}


// =====================================
// ABRIR CARRITO
// =====================================

function abrirCarrito() {

    document
        .getElementById("ventanaCarrito")
        .classList.remove("oculto");

}


// =====================================
// CERRAR CARRITO
// =====================================

function cerrarCarrito() {

    document
        .getElementById("ventanaCarrito")
        .classList.add("oculto");

}


// =====================================
// IR AL PEDIDO
// =====================================

function irAlPedido() {

    if (carrito.length === 0) {

        mostrarMensaje(
            "Primero elegí al menos un servicio"
        );

        return;
    }


    cerrarCarrito();


    document
        .getElementById("ventanaPedido")
        .classList.remove("oculto");

}


// =====================================
// CERRAR PEDIDO
// =====================================

function cerrarPedido() {

    document
        .getElementById("ventanaPedido")
        .classList.add("oculto");

}


// =====================================
// MENSAJE TEMPORAL
// =====================================

function mostrarMensaje(texto) {

    const mensaje =
        document.getElementById("mensaje");


    mensaje.textContent = texto;

    mensaje.classList.add("mostrar");


    setTimeout(() => {

        mensaje.classList.remove("mostrar");

    }, 2200);
}


// =====================================
// FORMULARIO
// =====================================

const formulario =
    document.getElementById(
        "formularioPedido"
    );

    const campoFecha = document.getElementById("fecha");

if (campoFecha) {
    campoFecha.addEventListener("input", function () {
        let valor = this.value.replace(/\D/g, "");

        if (valor.length > 4) {
            valor = valor.substring(0, 4);
        }

        if (valor.length >= 3) {
            valor = valor.substring(0, 2) + "/" + valor.substring(2);
        }

        this.value = valor;
    });
}

if (formulario) {

    formulario.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            if (carrito.length === 0) {

                mostrarMensaje(
                    "No hay servicios seleccionados"
                );

                return;
            }


            // Datos

            const nombre =
                document
                    .getElementById("nombre")
                    .value
                    .trim();


            const telefono =
                document
                    .getElementById("telefono")
                    .value
                    .trim();


            const fecha = document.getElementById("fecha").value.trim();

            const hora = document.getElementById("hora").value;
            
            const formatoFecha = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])$/;
            
            if (!nombre || !telefono || !fecha || !hora) {
                alert("Completá todos los datos para solicitar el turno.");
                return;
            }
            
            if (!formatoFecha.test(fecha)) {
                alert("Ingresá la fecha en formato DD/MM. Por ejemplo: 26/09.");
                return;
            }


            // =====================================
            // PREPARAR PEDIDO
            // =====================================

            let resumen = "";


            resumen +=
                " *NUEVA RESERVA - MENINA LINDA ESTÉTICA* \n\n";


            resumen +=
                "*Cliente:* " +
                nombre +
                "\n";


            resumen +=
                "*Contacto:* " +
                telefono +
                "\n\n";


            resumen +=
                "*Servicios seleccionados:*\n";


            carrito.forEach(
                producto => {

                    resumen +=
                        "• " +
                        producto.nombre +
                        " — " +
                        producto.duracion +
                        " — " +
                        dinero(producto.precio) +
                        "\n";

                }
            );


            // =====================================
            // TOTAL
            // =====================================

            const total =
                carrito.reduce(
                    (suma, producto) =>
                        suma + producto.precio,
                    0
                );


            resumen +=
                "\n*Total:* " +
                dinero(total) +
                "\n";


            // =====================================
            // TURNO
            // =====================================

            resumen += "\nDía: " + fecha + "\n";


            resumen +=
                "*Horario preferido:* " +
                hora +
                "\n";


            // =====================================
            // UBICACIÓN
            // =====================================

            resumen +=
                "\n *Modalidad:* Servicio a domicilio\n";

            resumen +=
                "La ubicación será coordinada personalmente por WhatsApp.\n";


            // =====================================
            // MENSAJE FINAL
            // =====================================

            resumen +=
                "\n¡Hola! Me gustaría solicitar este turno.";


            // =====================================
            // WHATSAPP
            // =====================================

            const numeroWhatsApp =
                "5493764217754";


            const enlaceWhatsApp =
                "https://wa.me/" +
                numeroWhatsApp +
                "?text=" +
                encodeURIComponent(resumen);


            window.open(
                enlaceWhatsApp,
                "_blank"
            );

        }
    );

}


// =====================================
// CERRAR VENTANAS AL HACER CLIC AFUERA
// =====================================

document.addEventListener(
    "click",
    function(evento) {

        const carritoVentana =
            document.getElementById(
                "ventanaCarrito"
            );

        const pedidoVentana =
            document.getElementById(
                "ventanaPedido"
            );


        if (
            evento.target === carritoVentana
        ) {

            cerrarCarrito();

        }


        if (
            evento.target === pedidoVentana
        ) {

            cerrarPedido();

        }

    }
);


// =====================================
// INICIAR
// =====================================

actualizarCarrito();

actualizarBotones();