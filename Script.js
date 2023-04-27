function changeViewer(viewer, status) {
	document.getElementById(viewer).style.display = status;
	document.getElementById("textArea").focus();
}

changeViewer("encrypterResult", "none");

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
function clearValues(element) {
	document.getElementById(element).value = "";
}

function desEncrypt() {
	const text = document.getElementById("textArea").value;
	if (validations(text)) {
		const textDesEncrypt = processText(text, false);
		changeViewer("encryptEmpty", "none");
		changeViewer("encrypterResult", "block");
		document.getElementById("textEncrypt").textContent = textDesEncrypt;
	}
}

function copyText() {
	let elemento = document.getElementById("textEncrypt");

	// Crea un rango de selección para el contenido del elemento
	let rango = document.createRange();
	rango.selectNodeContents(elemento);

	// Copia el texto seleccionado al portapapeles utilizando el API Clipboard
	navigator.clipboard
		.writeText(rango.toString())
		.then(() => {
			Swal.fire({
				position: "center",
				icon: "success",
				title: "¡Copiado!",
				showConfirmButton: false,
				padding: "2em",
				timer: 1500,
			});
		})
		.catch((error) => {
			Swal.fire({
				title: "Ups!",
				text: "Ocurrio un error inesperado al copiar el texto al portapapeles, revise la consola para ver el error",
				icon: "warning",
				confirmButtonColor: "#0a3871",
				confirmButtonText: "Ok",
				iconColor: "#ff0000",
			});
			console.error("Error al copiar el texto: ", error);
		});
}

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

buttonDark.addEventListener("click", (e) => {
	body.classList.toggle("darkMode");
	setStorageValue(body.classList.contains("darkMode"));
});

function settingDarkMode() {
	const darkMode = localStorage.getItem("darkMode");

	if (!darkMode) {
		setStorageValue("false");
	} else if (darkMode == "true") {
		body.classList.add("darkMode");
	}
}

function setStorageValue(value) {
	localStorage.setItem("darkMode", value);
}

function reset() {
	document.getElementById("textEncrypt").textContent = "";
	document.getElementById("textArea").value = "";
	changeViewer("encryptEmpty", "block");
	changeViewer("encrypterResult", "none");
}
