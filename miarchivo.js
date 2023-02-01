
function conversor_de_divisa() {
    let monto = parseFloat(prompt("Ingrese el monto en pesos"));

    while (monto != "salir") {
        let divisa = (prompt("Ingrese el tipo de divisa: Dolar ó Euro")).toLowerCase();

        if (divisa == "dolar") {
            console.log(monto * 0.0053);
        } else if (divisa == "euro") {
            console.log(monto * 0.0049);
        } else {
            console.log("No ingreso correctamente el tipo de divisa");
        }
        
        monto = prompt('Vuelva a ingresar otro monto, si no, escriba "salir"');
    }
}

conversor_de_divisa();