"use strict";
// Informacion del usuario

fetch("https://randomuser.me/api/")
  .then((res) => res.json())
  .then((data) => {
    let nameUser = document.getElementById("nameUser");
    let photoUser = document.getElementById("photoUser");
    let phoneUser = document.getElementById("phoneUser");
    let emailUser = document.getElementById("emailUser");
    let locationUser = document.getElementById("locationUser");
    nameUser.textContent = `${data.results[0].name.title} ${data.results[0].name.last}, ${data.results[0].name.first}`;
    photoUser.src = data.results[0].picture.large;
    phoneUser.textContent = data.results[0].cell;
    emailUser.textContent = data.results[0].email;
    locationUser.textContent = `${data.results[0].location.city}, ${data.results[0].location.country}`;
  });

// Referencias

fetch("https://randomuser.me/api/")
  .then((res) => res.json())
  .then((data) => {
    let nameReference1 = document.getElementById("nameReference1");
    let photoReference1 = document.getElementById("reference1");
    photoReference1.src = data.results[0].picture.medium;
    nameReference1.textContent = data.results[0].name.first;
  });

fetch("https://randomuser.me/api/")
  .then((res) => res.json())
  .then((data) => {
    let nameReference2 = document.getElementById("nameReference2");
    let photoReference2 = document.getElementById("reference2");
    photoReference2.src = data.results[0].picture.medium;
    nameReference2.textContent = data.results[0].name.first;
  });

fetch("https://randomuser.me/api/")
  .then((res) => res.json())
  .then((data) => {
    let nameReference3 = document.getElementById("nameReference3");
    let photoReference3 = document.getElementById("reference3");
    photoReference3.src = data.results[0].picture.medium;
    nameReference3.textContent = data.results[0].name.first;
  });

// Contacto

// Función de validación de los campos del formulario
const validateInput = (input) => {
  switch (input) {
    case nombre:
      if (input.value.trim().length > 6) {
        return false;
      }
      return "El nombre es demasiado corto. Se admiten más de 6 caracteres.";
    case telefono:
      if (regExpTelefono.test(input.value)) {
        return false;
      }
      return "El teléfono es inválido. Sólo se admiten números telefónicos de Argentina.";
    case email:
      if (regExpEmail.test(input.value)) {
        return false;
      }
      return "El email es inválido.";
    case mensaje:
      if (input.value.trim().length > 20) {
        return false;
      }
      return "El mensaje será válido a partir de los 20 caracteres.";
  }
};

// Función para mostrar errores en el formulario
const showError = (validate, input) => {
  let message = document.createElement("span");
  message.textContent = !validate ? "" : validate;
  message.classList.add("message__error");
  if (!validate) {
    input.classList.remove("input__error");
    if (input.parentElement.lastElementChild.className === "message__error") {
      input.parentElement.lastElementChild.textContent = "";
    }
  } else {
    input.classList.add("input__error");
    if (input.parentElement.lastElementChild.className === "message__error") {
      input.parentElement.lastElementChild.textContent = validate;
      return;
    }
    input.parentElement.append(message);
  }
};

// Función para vaciar los input cuando se envía exitosamente el mensaje
const clearInput = () => {
  inputNombre.value = "";
  inputTelefono.value = "";
  inputEmail.value = "";
  inputMensaje.value = "";
};

// Expresiones regulares

// Luego del . se debe usar más de un caracter
// Un email no puede iniciar con .
// Se admiten caracteres, dígitos, guiones bajos y guiones
// No se admiten puntos dobles ..
const regExpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Para la validación del número sólo estamos admitiendo números válidos en Argentina
const regExpTelefono =
  /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;

// Campos del formulario
const inputNombre = document.getElementById("nombre");
const inputEmail = document.getElementById("email");
const inputTelefono = document.getElementById("telefono");
const inputMensaje = document.getElementById("mensaje");

const form = document.getElementById("formulario");

// Objeto que contiene los valores del formulario
const objFormulario = {
  nombre: "",
  telefono: "",
  email: "",
  mensaje: "",
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    !validateInput(inputNombre) &&
    !validateInput(inputEmail) &&
    !validateInput(inputTelefono) &&
    !validateInput(inputMensaje)
  ) {
    // Se mandará el mensaje a un email determinado dentro de la configuración de emailjs, precisamente en "service", el cuerpo del email es el "template".
    // El cuarto argumento es el public key
    emailjs
      .sendForm(
        "service_f5u1f9i",
        "template_630ehjp",
        form,
        "rQrzlebn7X-EtP3em"
      )
      .then(
        () => {
          Toastify({
            text: "Muchas gracias por tu mensaje",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            style: {
              background: "#d1e7dd",
              color: "#0f5132",
            },
          }).showToast();

          clearInput();
        },
        (error) => {
          Toastify({
            text: `Ocurrió un error: ${error}`,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            style: {
              background: "#7c1b1b",
              color: "#d1c9c9",
            },
          }).showToast();
        }
      );

    showError(validateInput(inputNombre), inputNombre);
    showError(validateInput(inputEmail), inputEmail);
    showError(validateInput(inputTelefono), inputTelefono);
    showError(validateInput(inputMensaje), inputMensaje);
  } else {
    showError(validateInput(inputNombre), inputNombre);
    showError(validateInput(inputEmail), inputEmail);
    showError(validateInput(inputTelefono), inputTelefono);
    showError(validateInput(inputMensaje), inputMensaje);
  }
});
