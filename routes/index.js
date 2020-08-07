var express = require("express");
var router = express.Router();

/* GET home page. */
class Vehiculo {
	constructor(marca, modelo, precio) {
		this.marca = marca;
		this.modelo = modelo;
		this.precio = precio;
	}
	formatPrecio() {
		let parts = this.precio.toFixed(2).toString().split(".");
		let result =
			parts[0].replace(/\B(?=(\d{3})+(?=$))/g, ".") +
			(parts[1] ? "," + parts[1] : "");
		return `$${result}`;
	}
}

class Auto extends Vehiculo {
	constructor(marca, modelo, puertas, precio) {
		super(marca, modelo, precio);
		this.puertas = puertas;
	}
}

class Moto extends Vehiculo {
	constructor(marca, modelo, cilindrada, precio) {
		super(marca, modelo, precio);
		this.cilindrada = cilindrada;
	}
	fomatCilindrada() {
		return `${this.cilindrada}c`;
	}
}

const vehiculosArray = [
	{
		marca: "Peugeot",
		modelo: "206",
		puertas: 4,
		precio: 200000.0,
	},
	{
		marca: "Honda",
		modelo: "Titan",
		cilindrada: 125,
		precio: 60000.0,
	},
	{
		marca: "Peugeot",
		modelo: "208",
		puertas: 5,
		precio: 250000.0,
	},
	{
		marca: "Yamaha",
		modelo: "YBR",
		cilindrada: 160,
		precio: 80500.5,
	},
];

const main = (vehiculosArray) => {
	var vehiculos = [];
	vehiculosArray.forEach((vehiculo) => {
		if (vehiculo.puertas) {
			vehiculos.push(
				new Auto(
					vehiculo.marca,
					vehiculo.modelo,
					vehiculo.puertas,
					vehiculo.precio
				)
			);
		} else {
			vehiculos.push(
				new Moto(
					vehiculo.marca,
					vehiculo.modelo,
					vehiculo.cilindrada,
					vehiculo.precio
				)
			);
		}
	});
	vehiculos.forEach((vehiculo) => {
		if (vehiculo.puertas) {
			console.log(
				`Marca: ${vehiculo.marca} // Modelo: ${vehiculo.modelo} // Puertas: ${
					vehiculo.puertas
				} // Precio: ${vehiculo.formatPrecio()}`
			);
		} else {
			console.log(
				`Marca: ${vehiculo.marca} // Modelo: ${
					vehiculo.modelo
				} // Cilindrada: ${
					vehiculo.cilindrada
				} // Precio: ${vehiculo.formatPrecio()}`
			);
		}
	});
	console.log("=============================");
	//vehiculo mas caro
	var vehiculosCaros = vehiculos.sort((a, b) => b.precio - a.precio);
	console.log(
		`Vehículo más caro: ${vehiculosCaros[0].marca} ${vehiculosCaros[0].modelo}`
	);
	//vehiculo barato
	console.log(
		`Vehículo más barato: ${vehiculosCaros[vehiculosCaros.length - 1].marca} ${
			vehiculosCaros[vehiculosCaros.length - 1].modelo
		}`
	);
	//vehiculo que incuye 'Y'
	var contieneY = vehiculos.filter((vehiculo) => {
		return vehiculo.modelo.includes("Y");
	});
	console.log(
		`Vehículo que contiene en el modelo la letra ‘Y’: ${contieneY[0].marca} ${
			contieneY[0].modelo
		} ${contieneY[0].formatPrecio()}`
	);
	console.log("=============================");
	//ejercicio extra
	console.log("Vehículos ordenados por precio de mayor a menor:");
	vehiculosCaros.forEach((vehiculo) => {
		console.log(`${vehiculo.marca} ${vehiculo.modelo}`);
	});
};

main(vehiculosArray);

module.exports = router;
