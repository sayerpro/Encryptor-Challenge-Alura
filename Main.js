/**
 * Función que cambia la visibilidad del visualizador de resultados de encriptación/desencriptación
 * @param {string} viewer
 * @param {string} status
 */
function changeViewer(viewer, status) {
	document.getElementById(viewer).style.display = status;
	document.getElementById("textArea").focus();
}

changeViewer("encrypterResult", "none");

/**
 * Función encargada de llevar el paso a paso e ir llamando la lógica para encriptar el texto
 */
function encrypt() {
	const text = document.getElementById("textArea").value;
	if (validations(text)) {
		const textEncrypt = processText(text, true);
		clearValues("textArea");
		changeViewer("encryptEmpty", "none");
		changeViewer("encrypterResult", "block");
		document.getElementById("textEncrypt").textContent = textEncrypt;
	}
}

let charactersToEncrypt = {
	a: {encrypt: "ai", desEncrypt: "aimes"},
	e: {encrypt: "enter", desEncrypt: "enter"},
	i: {encrypt: "imes", desEncrypt: "imes"},
	o: {encrypt: "ober", desEncrypt: "ober"},
	u: {encrypt: "ufat", desEncrypt: "ufat"},
};

/**
 * Lógica encargada de encriptar y desencriptar texto dependiendo de los argumentos recibidos
 * @param {string} text
 * @param {boolean} encrypt
 * @returns string
 */
function processText(text, encrypt) {
	if (encrypt) {
		Object.keys(charactersToEncrypt).forEach((key) => {
			text = text.replaceAll(key, charactersToEncrypt[key].encrypt);
		});
	} else {
		Object.keys(charactersToEncrypt).forEach((key) => {
			text = text.replaceAll(charactersToEncrypt[key].desEncrypt, key);
		});
	}

	return text;
}

/**
 * Limpia el valor del elemento recibido
 * @param {string} element
 */
function clearValues(element) {
	document.getElementById(element).value = "";
}

/**
 * Función encargada de llevar el paso a paso e ir llamando la lógica para desencriptar el texto
 */
function desEncrypt() {
	const text = document.getElementById("textArea").value;
	if (validations(text)) {
		const textDesEncrypt = processText(text, false);
		changeViewer("encryptEmpty", "none");
		changeViewer("encrypterResult", "block");
		document.getElementById("textEncrypt").textContent = textDesEncrypt;
	}
}

// /**
//  * Ejecuta lógica para copiar el texto de un elemento del DOM y lo guarda en el portapapeles, tiene validaciones y muestra pop ups para informar al usuario utiliza navigator.clipboard para navegadores con versiones recientes
//  */
function copyText() {
	const element = document.getElementById("textEncrypt");
	const text = element.innerText;
	// Copiar el texto seleccionado al portapapeles utilizando el API Clipboard
	if (navigator.clipboard) {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				succesAlert();
			})
			.catch((error) => {
				console.error(
					"Error al copiar al portapapeles con API Clipboard:",
					error
				);
				fallbackCopy(element);
			});
	} else {
		fallbackCopy(element);
	}
}

// /**
//  * Ejecuta lógica para copiar el texto de un elemento del DOM y lo guarda en el portapapeles, tiene validaciones y muestra pop ups para informar al usuario se utiliza execCommand para navegadores con versiones antiguas
//  */
function fallbackCopy() {
	try {
		// Seleccionar el texto en el rango
		window.getSelection().removeAllRanges();
		let rango = document.createRange();
		rango.selectNodeContents(element);
		window.getSelection().addRange(rango);

		// Copiar el texto seleccionado al portapapeles
		document.execCommand("copy");
		succesAlert();
	} catch (error) {
		console.error("Error al copiar al portapapeles con execCommand:", error);
		showError();
	} finally {
		// Deseleccionar el texto
		window.getSelection().removeAllRanges();
	}
}

/**
 * Llama la librería SweetAlert2 y genera un pop up de SuccesAlert
 */
function succesAlert() {
	Swal.fire({
		position: "center",
		icon: "success",
		title: "¡Copiado!",
		showConfirmButton: false,
		padding: "2em",
		timer: 1500,
	});
}

/**
 * Llama la librería SweetAlert2 y genera un pop up de warningAlert
 */
function showError() {
	Swal.fire({
		title: "Ups",
		text: "Ocurrio un error inesperado al copiar el texto al portapapeles, revise la consola para ver el error",
		icon: "warning",
		confirmButtonColor: "#0a3871",
		confirmButtonText: "Ok",
		iconColor: "#ff0000",
	});
}

/**
 * Función que ejecuta todas las validaciones requeridas para los campos de texto; Muestra pop ups para informar al usuario
 * @param {string} value
 * @returns boolean
 */
function validations(value) {
	if (!value || value.trim() === "") {
		Swal.fire({
			title: "Por favor digite un mensaje",
			text: "¡El área de texto esta vacía!",
			icon: "warning",
			confirmButtonColor: "#0a3871",
			confirmButtonText: "Ok",
			iconColor: "#0a3871",
		}).then((result) => {
			if (result.isConfirmed) {
				document.getElementById("textArea").focus();
			}
		});
		return false;
	}
	if (!/^[a-zñ0-9 ]+$/.test(value)) {
		Swal.fire({
			title: "¿Leíste la advertencia?",
			text: "No se permiten MAYÚSCULAS ni acentos (áéíóúü)",
			icon: "error",
			confirmButtonColor: "#0a3871",
			confirmButtonText: "Ok",
			iconColor: "#ff0000",
		});
		return false;
	}
	return true;
}

const buttonDark = document.getElementById("buttonDark");
const body = document.querySelector("body");

settingDarkMode();

/**
 * Metodo de escucha, cuando se hace clic en un elemento del DOM (agrega una clase y avisa para guardar el estado en el localStorage)
 */
buttonDark.addEventListener("click", (e) => {
	body.classList.toggle("darkMode");
	setStorageValue(body.classList.contains("darkMode"));
});

/**
 * Pregunta si el valor darkMode existe en el localStorage dependiendo la lógica lo cambia true/false
 */
function settingDarkMode() {
	const darkMode = localStorage.getItem("darkMode");

	if (!darkMode) {
		setStorageValue("false");
	} else if (darkMode == "true") {
		body.classList.add("darkMode");
	}
}

/**
 * Guarda un booleano en el localStorage
 * @param {boolean} value
 */
function setStorageValue(value) {
	localStorage.setItem("darkMode", value);
}

/**
 * Función que resetea los campos de texto y la visibilidad del visualizador de resultados de encriptación/desencriptación
 */
function reset() {
	document.getElementById("textEncrypt").textContent = "";
	document.getElementById("textArea").value = "";
	changeViewer("encryptEmpty", "block");
	changeViewer("encrypterResult", "none");
}
