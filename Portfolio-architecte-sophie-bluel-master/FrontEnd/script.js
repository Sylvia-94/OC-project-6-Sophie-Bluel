const galerie = document.querySelector(".gallery");
const filterBar = document.querySelector(".filters");

// Fonction asynchrone principale
async function init () {
  const response = await fetch("http://localhost:5678/api/works");
  const json = await response.json();
  displayWorks(json);
  displayButtons(json);
}

// Fonction displayButtons pour : 
// générer les catégories des boutons
// créer les boutons dans le DOM 
// gérer un eventListener pour chaque bouton, avec des conditions spécifiques

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

  //EL qui gère le filtrage des cétégories au clic sur un bouton de filtre,
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

    figureElement.appendChild(figureImg);
    figureElement.appendChild(figureCaption);
    galerie.appendChild(figureElement);
  });
}


// variable du bouton login/logout + récupération du token d'authentification dans le LS
const LogInOut = document.querySelector("#logs-link");
const isConnected = localStorage.getItem("token");


//fonction qui contient toutes les modifications qui doivent apparaître en mode admin
function adminMode (){

LogInOut.innerHTML = "logout";

//Création de la bannière en haut de page 
const adminBanner = document.createElement("div");
adminBanner.classList.add("admin-banner");
document.body.insertBefore(adminBanner, document.body.firstChild);
// bouton "mode édition" 
const btneditMode = document.createElement("button");
btneditMode.classList.add("btn-edit-mode");
btneditMode.innerHTML = "mode édition";
adminBanner.appendChild(btneditMode);
const pencilIcon = document.createElement("i");
pencilIcon.classList.add("fa-pen-to-square", "fa-regular");
btneditMode.insertBefore(pencilIcon, btneditMode.firstChild);
//bouton "publier les changements"
const btnPublishChanges = document.createElement("button");
btnPublishChanges.classList.add("btn-publish-changes");
btnPublishChanges.innerHTML = "publier les changements";
adminBanner.appendChild(btnPublishChanges);


//Effacement de la barre des filtres + ajout d'une classe padding pour conserver l'espacement
filterBar.classList.add("invisible");
const projectsTitle = document.querySelector(".projects-title");
projectsTitle.classList.add("add-padding");

// ajout des trois boutons "modifier"

//Bouton modal
const btnEditModal = document.createElement("button");
const pencil1 = pencilIcon.cloneNode(true);
btnEditModal.classList.add("btn-edit-modal");
btnEditModal.setAttribute("id", "open-modal");
btnEditModal.innerHTML = "modifier";
btnEditModal.insertBefore(pencil1, btnEditModal.firstChild);
projectsTitle.appendChild(btnEditModal);

//autres boutons "modifier"
const btnEdit2 = btnEditModal.cloneNode(true);
btnEdit2.classList.add("btn-edit-2");
const imgSophie = document.querySelector("#img-sophie");
imgSophie.appendChild(btnEdit2);
const btnEdit3 = btnEditModal.cloneNode(true);
btnEdit3.classList.add("btn-edit-3");
const introText = document.querySelector("#intro-txt");
introText.insertBefore(btnEdit3, introText.firstChild);

// variables de création de la modale 
const modal = document.createElement("dialog");
modal.setAttribute("id", "modal");
modal.classList.add("modal");


const modalTitle = document.createElement("h2");
modalTitle.innerHTML = "Galerie photo";
modalTitle.classList.add("modal-title");


//variable bouton fermeture modale
const closeModal = document.createElement("i");
closeModal.classList.add("fa-solid", "fa-xmark", "close-modal");

const miniPhotosGallery = document.createElement("div");
miniPhotosGallery.setAttribute("id", "mini-photos-gallery");
miniPhotosGallery.classList.add("mini-photos-gallery");

modal.appendChild(closeModal);
modal.appendChild(modalTitle);
modal.appendChild(miniPhotosGallery);

//variable ligne grise 
const greyLine = document.createElement("div");
greyLine.classList.add("grey-line");
modal.appendChild(greyLine);

//variable bouton ajout de photos
const btnAddPhotos = document.createElement("button");
btnAddPhotos.classList.add("btn-add-photos");
btnAddPhotos.innerHTML = "Ajouter une photo";
modal.appendChild(btnAddPhotos);

//variable supprimer la galerie
const removeAll = document.createElement("p");
removeAll.classList.add("remove-all");
removeAll.innerHTML = "Supprimer la galerie";
modal.appendChild(removeAll);


//fonction affichage de la mini gallerie de photos,
// quasi identique à la fonction displayWorks
function displayMiniPhotos (){
miniPhotosGallery.innerHTML = "";
const galerieImage = document.body.querySelectorAll(".gallery-img")

galerieImage.forEach(image => {

  const miniFigure = document.createElement("figure");
  miniFigure.classList.add("mini-figure");
  const miniImg = document.createElement("img");
  miniImg.classList.add("mini-img");
  const miniFigCaption = document.createElement("figcaption");
  //bouton supprimer 
  const trashBtn = document.createElement("button");
  trashBtn.classList.add("trash-btn");
  const trashIcon = document.createElement("i");
  trashIcon.classList.add("fa-regular", "fa-trash-can", "mini-icons");
  trashBtn.appendChild(trashIcon);


  const arrowBtn = document.createElement("button");
  arrowBtn.classList.add("arrow-btn");
  const arrowIcon = document.createElement("i");
  arrowIcon.classList.add("fa-solid", "fa-arrows-up-down-left-right", "mini-icons");
  arrowBtn.appendChild(arrowIcon);
 

  miniImg.src = image.src;
  miniFigCaption.textContent = "éditer"; 
  
  miniFigure.appendChild(miniImg);
  miniFigure.appendChild(miniFigCaption);
  miniFigure.appendChild(trashBtn);
  miniFigure.appendChild(arrowBtn); 
  miniPhotosGallery.appendChild(miniFigure);

  
})
}



//EL ouverture de modale 
btnEditModal.addEventListener("click", () =>{
document.body.appendChild(modal);
displayMiniPhotos();
modal.showModal();
});

//EL fermeture de modale via bouton de fermeture
closeModal.addEventListener("click", () =>{
  
modal.close();
document.body.removeChild(modal); // sinon modale qui se balade en bas de la page 
});

//EL fermeture de modale via clic externe 
document.body.addEventListener("click", function(event){
if(event.target === modal){
  modal.close();
  document.body.removeChild(modal);
  console.log(modal);
}

});





} //fin fonction adminMode


























//EL au click sur le bouton "logout", qui enlève le token du localStorage 
//et qui redirige vers la page d'accueil
LogInOut.addEventListener("click", function(){

  if(LogInOut.innerHTML === "logout"){
    LogInOut.setAttribute("href", "./index.html");
    localStorage.removeItem("token");
    
  }
  
})

//éxécution de la fonction async principale 
init();

//Ici condition pour éxécuter la fonction adminMode si la variable isConnected 
//(LS getItem token) est vraie
if(isConnected){

  adminMode();
}

  

  





  










