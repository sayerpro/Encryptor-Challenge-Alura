function changeViewer(viewer, status) {
	document.getElementById(viewer).style.display = status;
}

changeViewer("encrypterResult", "none");

function encrypt() {
	const text = document.getElementById("textArea").value;
	if (validations(text)) {
		const textEncrypt = encryptText(text);
		clearValues("textArea");
		changeViewer("encryptEmpty", "none");
		changeViewer("encrypterResult", "block");
		document.getElementById("textEncrypt").textContent = textEncrypt;
	}
}

function encryptText(text) {
	let processText = text;

	processText = processText.replaceAll("a", "ai");
	processText = processText.replaceAll("e", "enter");
	processText = processText.replaceAll("i", "imes");
	processText = processText.replaceAll("o", "ober");
	processText = processText.replaceAll("u", "ufat");

	return processText;
}

function clearValues(element) {
	document.getElementById(element).value = "";
}

function desEncrypt() {
	const text = document.getElementById("textArea").value;
	if (validations(text)) {
		const textDesEncrypt = desEncryptText(text);
		document.getElementById("textEncrypt").textContent = textDesEncrypt;
	}
}

function desEncryptText(text) {
	let processText = text;

	processText = processText.replaceAll("aimes", "a");
	processText = processText.replaceAll("enter", "e");
	processText = processText.replaceAll("imes", "i");
	processText = processText.replaceAll("ober", "o");
	processText = processText.replaceAll("ufat", "u");

	return processText;
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
			text: "¡El area de texto esta vacía!",
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
	if (!/^[a-zñ]+$/.test(value)) {
		Swal.fire({
			title: "¿Leiste la advertencía?",
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
