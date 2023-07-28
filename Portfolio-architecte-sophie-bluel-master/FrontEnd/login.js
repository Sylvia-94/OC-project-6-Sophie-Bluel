// variables pour formulaire de connexion, champs de texte et message d'erreur
const form = document.querySelector(".login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const connectBtn = document.querySelector("#connect-btn");
const msgError = document.querySelector(".invalid-msg");

/**
 * Fonction asynchrone contenant la requête POST de connexion
 */
async function userConnexionRequest(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  // si result contient le token d'authentification,
  //alors token stocké dans LS et redirection vers page d'accueil en adminMode
  if (result.hasOwnProperty("token")) {
    localStorage.setItem("token", result.token);
    window.location.href = "./index.html";
  } else {
    msgError.classList.remove("invisible");
  }
}

connectBtn.addEventListener("click", function () {
  //ici, fenêtre pop up si mail OU MDP = champ de texte vide
  if (emailInput.value.length == 0 || passwordInput.value.length == 0) {
    return alert("Veuillez remplir tous les champs");
  }
  //variable qui récupère les valeurs des champs de texte email et MDP
  const userInput = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  //  console.log(userInput);
  userConnexionRequest("http://localhost:5678/api/users/login", userInput);
});
