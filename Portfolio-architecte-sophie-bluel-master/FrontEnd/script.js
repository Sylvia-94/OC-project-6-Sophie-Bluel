import adminMode from "./modules/adminMode.js";

const galerie = document.querySelector(".gallery");
const filterBar = document.querySelector(".filters");

/**
 * requête fetch pour les travaux, réponse en .json, puis 
 * displayWorks pour afficher les travaux,
 * displayButtons pour générer les boutons filtres
 *
 */
async function init () {
  const response = await fetch("http://localhost:5678/api/works");
  const json = await response.json();
  displayWorks(json);
  displayButtons(json);
}

//(LS getItem token) est vraie
const isConnected = localStorage.getItem("token");
//Ici condition pour éxécuter la fonction adminMode si la variable isConnected 
if(isConnected){
  adminMode();
}


/**
 * Fonction displayButtons pour : 
  générer les catégories des boutons,
  créer les boutons dans le DOM,
  gérer un eventListener pour chaque bouton, avec des conditions spécifiques
 */
function displayButtons(array){

  //array vide + ajout de la catégorie "tous"
  const categoriesDuplicates = [];
  categoriesDuplicates.push("Tous");
  //boucle forEach pour ajouter à l'array le nom de toutes les autres catégories d'objets
  array.forEach(object => {
    categoriesDuplicates.push(object.category.name);
  });
  //création d'un nouveau set à partir de l'array = plus de doublons
  const categories = new Set(categoriesDuplicates);
  //boucle forEach qui génère un bouton à partir de chaque catégorie présente dans le set 
  categories.forEach(category => {
  const button = document.createElement("button");
  button.textContent = category;
  if(category === "Tous"){
    button.classList.add("btn-selected");
  };
  filterBar.appendChild(button);
  //EL qui gère le filtrage des catégories au clic sur un bouton de filtre,
  // en ajoutant ou envelant une classe
  // et en créant un nouvel array où les noms des boutons cliqués 
  //correspondent aux catégories d'objets à afficher 
  button.addEventListener("click", function(){
    const buttonSelected = document.body.querySelector(".btn-selected");
    buttonSelected.classList.remove("btn-selected");
    button.classList.add("btn-selected");
    if(category === "Tous"){
      displayWorks(array);
    } else {
      const newArray = array.filter(object => object.category.name === category );
      displayWorks(newArray)
      
    };
    
  });

  });
};



/**
 * à remplir
 */
// Fonction pour afficher les œuvres avec une boucle forEach qui génère les variables des éléments HTML
// puis la source des images et le contenu texte des titres
function displayWorks(array) {
  galerie.innerHTML ="";
  array.forEach(object => {
    const figureElement = document.createElement("figure");
    const figureImg = document.createElement("img");
    figureImg.classList.add("gallery-img");
    const figureCaption = document.createElement("figcaption");
    
    figureImg.src = object.imageUrl;
    figureCaption.textContent = object.title;
    figureElement.dataset.jsonId = object.id;

    figureElement.appendChild(figureImg);
    figureElement.appendChild(figureCaption);
    galerie.appendChild(figureElement);
  });
}



//éxécution de la fonction async principale 
init();




  

  





  










