function mostrarCantidadPreciosEspeciales() {
    document.getElementById('cantidadPreciosEspeciales').style.display = 'block';
}

function mostrarPreguntasPreciosEspeciales() {
    var numPreciosEspeciales = parseInt(document.getElementById('numPreciosEspeciales').value);
    var preguntasHTML = '';
    for (var i = 0; i < numPreciosEspeciales; i++){
        preguntasHTML += `
            <label for="precioEspecial${i + 1}">Ingrese el precio especial ${i + 1}:</label>
            <input type="number" id="precioEspecial${i + 1}" name="precioEspecial${i + 1}">
            <br>
            <label for="cantidadVendida${i + 1}">Ingrese la cantidad de garrafones vendidos a este precio ${i + 1}:</label>
            <input type="number" id="cantidadVendida${i + 1}" name="cantidadVendida${i + 1}">
            <br>
        `;
    }
    document.getElementById('preguntasPreciosEspeciales').innerHTML = preguntasHTML;
}

function ocultarPreciosEspeciales() {
    document.getElementById('cantidadPreciosEspeciales').style.display = 'none';
    document.getElementById('preguntasPreciosEspeciales').innerHTML = '';
}

function mostrarCantidadGarrafonesCredito() {
    document.getElementById('cantidadGarrafonesCredito').style.display = 'block';
}

function ocultarCantidadGarrafonesCredito() {
    document.getElementById('cantidadGarrafonesCredito').style.display = 'none';
}

function mostrarCantidadGarrafonesAbonados() {
    document.getElementById('cantidadGarrafonesAbonados').style.display = 'block';
}

function ocultarCantidadGarrafonesAbonados() {
    document.getElementById('cantidadGarrafonesAbonados').style.display = 'none';
}

function mostrarCantidadGastoExtra() {
    document.getElementById('cantidadGastoExtra').style.display = 'block';
}

function ocultarCantidadGastoExtra() {
    document.getElementById('cantidadGastoExtra').style.display = 'none';
}

function calcularIngresos() {
    // Obtener los valores del formulario
    var precioBase = parseFloat(document.getElementById('precioBase').value);
    var garrafonesIniciales = parseInt(document.getElementById('garrafonesIniciales').value);
    var garrafonesVendidos = parseInt(document.getElementById('garrafonesVendidos').value);
    var totalIngresos = 0.0;

    // Calcular el total si todos los garrafones se vendieron al precio base
    totalIngresos += precioBase * garrafonesVendidos;

    // Verificar si hubo precios especiales
    var preciosEspeciales = document.querySelector('input[name="preciosEspeciales"]:checked').value;

    if (preciosEspeciales === "si") {
        var numPreciosEspeciales = parseInt(document.getElementById("numPreciosEspeciales").value);

        for (var i = 0; i < numPreciosEspeciales; i++) {
            var precioEspecial = parseFloat(document.getElementById("precioEspecial" + (i + 1)).value);
            var cantidadVendida = parseInt(document.getElementById("cantidadVendida" + (i + 1)).value);
            // Calcular el descuento total por los garrafones vendidos a precio especial
            var descuento = (precioBase - precioEspecial) * cantidadVendida;
            // Restar al total de ingresos el descuento
            totalIngresos -= descuento;
        }
    }

    // Obtener la cantidad de garrafones vendidos a crédito
    var garrafonesFiados = 0;

    if (document.querySelector('input[name="garrafonesCredito"]:checked').value === 'si') {
        garrafonesFiados = parseInt(document.getElementById('garrafonesFiados').value);
    }

    // Descuenta del total los garrafones vendidos a crédito
    totalIngresos -= precioBase * garrafonesFiados;

    // Obtener la cantidad de garrafones abonados
    var cantidadAbonada = 0;

    if (document.querySelector('input[name="garrafonesAbonados"]:checked').value === 'si') {
        cantidadAbonada = parseFloat(document.getElementById('garrafonesAbonadosCantidad').value);
    }

    // Calcular el total de ingresos por abonos
    totalIngresos += cantidadAbonada * precioBase;

    // Verificar si hubo gastos extras
    var gastoExtra = document.querySelector('input[name="gastoExtra"]:checked').value;

    if (gastoExtra === "si") {
        var extra = parseFloat(document.getElementById("gastoExtraCantidad").value);
        totalIngresos -= extra;
    }

    // Obtener el precio de compra del líquido por garrafón y la cantidad a llenar
    var precioCompra = parseFloat(document.getElementById('precioLiquido').value);
    var garrafonesLlenar = parseInt(document.getElementById('garrafonesLlenar').value);

    // Calcular el costo total del líquido
    var costoLiquido = precioCompra * garrafonesLlenar;

    // Calcular el total a pagar
    var totalPagar = costoLiquido;

    // Calcular la ganancia
    var ganancia = totalIngresos - totalPagar;

    // Mostrar el total a pagar y la ganancia en el elemento <div> de resultados
    var resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "<p>Total a pagar en la planta: $" + totalPagar + "</p>" +
                              "<p>Ganancia: $" + ganancia + "</p>";
}
