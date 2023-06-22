// variables pour formulaire de connexion, champs de texte et message d'erreur
const form = document.querySelector(".login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const connectBtn = document.querySelector("#connect-btn");
const msgError = document.querySelector(".invalid-msg");

//fonction asynchrone contenant la requête POST
async function userConnexionRequest (url, data){

  const response = await fetch(url, {
  method: "POST",
  headers: {
  "Content-type" : "application/json"
  },
  body: JSON.stringify(data)
  })

  const result = await response.json();
  console.log(result);
  
// si reponse.json (ou result) contient le token d'authentification,
//alors on stocke le token dans le LS et on redirige vers la page index.html (en mode admin)
  if(result.hasOwnProperty("token")){
    localStorage.setItem("token", result.token)
    console.log(localStorage);
    window.location.href = "./index.html"
//sinon, affichage du messag d'erreur
  }else{
    msgError.classList.remove("invisible")
  }
  
}


//EL sur bouton de connexion qui éxecute la fonction userConnexionRequest
connectBtn.addEventListener("click", function(){

//ici, fenêtre pop up si mail OU MDP = champ de texte vide 
if(emailInput.value.length == 0 || passwordInput.value.length == 0){

 return alert("Veuillez remplir tous les champs");
}

//variable qui récupères les valeurs des champs de texte email et MDP
const userInput = {
  "email": emailInput.value,
  "password": passwordInput.value
 }
// exécution de la fonction de connexion avec les paramètres URL et userInput
 console.log(userInput);
userConnexionRequest("http://localhost:5678/api/users/login", userInput)
})