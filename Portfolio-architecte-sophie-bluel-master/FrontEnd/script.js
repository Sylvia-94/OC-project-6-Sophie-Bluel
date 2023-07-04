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
const modal = document.createElement("div");
modal.setAttribute("id", "modal");
modal.classList.add("modal", "invisible");

//variables de la div contenant la modale 
const modalBackdrop = document.createElement("div");
modalBackdrop.setAttribute("id", "backdrop");
modalBackdrop.classList.add("modal-backdrop");
modalBackdrop.appendChild(modal);

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
let galerieImage = document.body.querySelectorAll(".gallery-img");

galerieImage.forEach(image => {

  const miniFigure = document.createElement("figure");
  miniFigure.classList.add("mini-figure");
  const miniImg = document.createElement("img");
  miniImg.classList.add("mini-img");
  const miniFigCaption = document.createElement("figcaption");
  //bouton supprimer 
  const trashBtn = document.createElement("button");
  trashBtn.classList.add("trash-btn");
  trashBtn.setAttribute("id", "trash-btn");
  const trashIcon = document.createElement("i");
  trashIcon.classList.add("fa-regular", "fa-trash-can", "mini-icons");
  trashBtn.appendChild(trashIcon);
  

  //bouton fléché
  const arrowBtn = document.createElement("button");
  arrowBtn.classList.add("arrow-btn");
  const arrowIcon = document.createElement("i");
  arrowIcon.classList.add("fa-solid", "fa-arrows-up-down-left-right", "mini-icons");
  arrowBtn.appendChild(arrowIcon);
 

  miniImg.src = image.src;
  miniFigure.dataset.jsonId = image.parentElement.dataset.jsonId;
  miniFigCaption.textContent = "éditer";

  
  miniFigure.appendChild(miniImg);
  miniFigure.appendChild(miniFigCaption);
  miniFigure.appendChild(trashBtn);
  miniFigure.appendChild(arrowBtn); 
  miniPhotosGallery.appendChild(miniFigure);

})
}

//fonction async pour requête DELETE
async function deleteWork (url){

const response = await fetch(url, {
method: "DELETE",
headers:{
  "accept" : "*/*",
  "Authorization" : `Bearer ${localStorage.getItem("token")}`
},

});


};

//EL ouverture de modale 
btnEditModal.addEventListener("click", () =>{
document.body.appendChild(modalBackdrop);
displayMiniPhotos();
modal.classList.add("visible");

//SUPPRESSION PROJETS
const trashBtns = document.querySelectorAll("#trash-btn");
  trashBtns.forEach((trashButton)=>{
    
    trashButton.addEventListener("click", (event) => {
      
      const idToDelete = event.target.parentElement.parentElement.dataset.jsonId;
      const worksToDelete = document.querySelectorAll(`figure[data-json-id="${idToDelete}"]`);

      worksToDelete.forEach(work =>{

        work.remove();

      });
      deleteWork(`http://localhost:5678/api/works/${idToDelete}`);

      
    });

  });
});


// fonction qui clear le formulaire au clic sur flèche précédente ou clic externe
function clearForm (){
  const form = document.querySelector(".form-new-work");
  if (form){
    const newimg = document.querySelector("#new-img");
    if(newimg){
      divAddPhoto.removeChild(newimg);
    }
    form.reset();
    submitBtn.setAttribute("id","submit-btn");
    divAddPhoto.appendChild(photoIcon);
    divAddPhoto.appendChild(labelAddPhoto);
    divAddPhoto.appendChild(photoDimensions);

};
};

// fonction qui clear la/les modales au clic sur "X" ou clic externe
function clearModals (){
  modal.classList.remove("visible");
  modal.classList.add("invisible");
  modalBackdrop.remove();

};
 
//EL fermeture de modale via bouton de fermeture
closeModal.addEventListener("click", () =>{
  clearModals();
  clearForm();
});

//EL fermeture de modale via clic externe 
document.body.addEventListener("click", function(event){
  if(event.target === modalBackdrop){
    clearForm();
    clearModals();
    
}
});


//EL sur ajouter une photo 

btnAddPhotos.addEventListener("click", function(){
  modalAddNewWork.classList.add("visible");
  modal.classList.remove("visible");
  modal.classList.add("invisible");
  modalBackdrop.appendChild(modalAddNewWork);
  modalBackdrop.removeChild(modal);
})

// création nouvelle modale 
const modalAddNewWork = document.createElement("div");
modalAddNewWork.classList.add("invisible");

//bouton flèche précédente 
const btnPrev = document.createElement("i");
btnPrev.classList.add("fa-solid", "fa-arrow-left", "going-back");
modalAddNewWork.classList.add("modal-add-new-work");
modalAddNewWork.appendChild(btnPrev);

//titre "ajout photo"
const addPhotoTitle = document.createElement("h2");
addPhotoTitle.classList.add("modal-photos-title");
addPhotoTitle.innerHTML = "Ajout photo";
modalAddNewWork.appendChild(addPhotoTitle);

//formulaire d'ajoute de nouveaux travaux 
const formNewWork = document.createElement("form");
formNewWork.setAttribute("name", "form-new-work");
formNewWork.classList.add("form-new-work");


//div qui contient l'ajout de photo
const divAddPhoto = document.createElement("div");
divAddPhoto.classList.add("div-add-photo");

//label (qui fait office de bouton d'ajout de photo)
const labelAddPhoto = document.createElement("label");
labelAddPhoto.classList.add("label-add-photo");
labelAddPhoto.setAttribute("for", "file-upload");
labelAddPhoto.innerHTML = "+ Ajouter Photo";


//input type file
const fileInput = document.createElement("input");
fileInput.classList.add("file-input");
fileInput.setAttribute("type", "file");
fileInput.setAttribute("id", "file-upload");
fileInput.setAttribute("name", "fileUpload");



//ajout de l'image type paysage
const photoIcon = document.createElement("img");
photoIcon.src = "../assets/icons/picture.png";
photoIcon.classList.add("photo-icon");

//texte précisant les dimensions des photos
const photoDimensions = document.createElement("p");
photoDimensions.classList.add("photos-dimensions");
photoDimensions.innerHTML = "jpg, png : 4mo max";

//rattachage des éléments
divAddPhoto.appendChild(photoIcon);
divAddPhoto.appendChild(labelAddPhoto);
divAddPhoto.appendChild(fileInput);
divAddPhoto.appendChild(photoDimensions);

fileInput.addEventListener("change", function (e){

  
  const reader = new FileReader;
  reader.onload = function (){
  const newImg = new Image();
  newImg.src = reader.result;
  newImg.classList.add("photo-mini-format");
  newImg.setAttribute("id","new-img");
  divAddPhoto.appendChild(newImg);
  divAddPhoto.removeChild(photoIcon);
  divAddPhoto.removeChild(labelAddPhoto);
  divAddPhoto.removeChild(photoDimensions);
  
  }
  reader.readAsDataURL(fileInput.files[0]);
  
  
  }, false);


//ajout du champ de texte titre
const labelTitle = document.createElement("label");
labelTitle.innerHTML = "Titre"
const titleInput = document.createElement("input");
titleInput.classList.add("text-field");
titleInput.setAttribute("type", "text");
titleInput.setAttribute("id", "title-input");
titleInput.setAttribute("name", "titleInput");
labelTitle.appendChild(titleInput);

//ajout du champ de texte catégorie (liste déroulante)
const labelCategory = document.createElement("label");
labelCategory.innerHTML = "Catégorie";
const categoryInput = document.createElement("select");
categoryInput.classList.add("text-field");
categoryInput.setAttribute("type", "select");
categoryInput.setAttribute("id", "category-input");
categoryInput.setAttribute("name", "categoryInput");
labelCategory.appendChild(categoryInput);

function createOptions(array){
array.forEach(object =>{

const category = document.createElement("option");
category.setAttribute("value", object.id);
category.textContent = object.name;
categoryInput.appendChild(category);
});
};

async function displayOptions(){

const response = await fetch("http://localhost:5678/api/categories")
const json = await response.json();

createOptions(json);
}

displayOptions();

//ligne grise
const greyLineTwo = greyLine.cloneNode(true);

//bouton de validation
const submitBtn = document.createElement("input");
submitBtn.classList.add("submit-btn");
submitBtn.setAttribute("type", "submit");
submitBtn.setAttribute("id", "submit-btn");
submitBtn.setAttribute("value", "Valider");


//msg d'erreur
const msgErrorForm = document.createElement("p");

//rattachement des éléments à la modale
modalAddNewWork.appendChild(formNewWork);
formNewWork.appendChild(divAddPhoto);
formNewWork.appendChild(labelTitle);
formNewWork.appendChild(labelCategory);
formNewWork.appendChild(greyLineTwo);
formNewWork.appendChild(submitBtn);


/**
 * clear form, modale d'ajout de travaux invisible puis envelée du DOM,
 * mise à jour des travaux
 */
function modalPrev (){
  clearForm();
  modalAddNewWork.classList.remove("visible");
  modalAddNewWork.classList.add("invisible");
  modalBackdrop.removeChild(modalAddNewWork);
  modalBackdrop.appendChild(modal);
  displayMiniPhotos();
}

//EL bouton page precédente
btnPrev.addEventListener("click", modalPrev);

[fileInput, titleInput].forEach(function(element){

  element.addEventListener("change", function(){

  if (fileInput.files.length > 0 && titleInput.value.length > 2) {

    submitBtn.setAttribute("id", "submit-btn-ok");
    msgErrorForm.classList.add("invisible");
    
    formNewWork.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData();
      const file = fileInput.files[0];
      const blob = new Blob([file], {type: "text/xml"});
    
      formData.append("title", titleInput.value);
      formData.append("category", categoryInput.value);
      formData.append("image", blob);

      fetch("http://localhost:5678/api/works", {

      method : "POST",
      headers: {
      Authorization : `Bearer ` +  `${localStorage.getItem("token")}`
      },
      body: formData,
    
      })
      .then((response)=> response.json())
      .then((result)=>{
      
     
        const addNewFigure = document.createElement("figure");
    
        const addNewImg = document.createElement("img");
        addNewImg.src = result.imageUrl;
        addNewImg.classList.add("gallery-img");
    
        const addNewCaption = document.createElement("figcaption");
        addNewCaption.textContent = result.title;
        addNewFigure.appendChild(addNewImg);
        addNewFigure.appendChild(addNewCaption);
    
        const galerie = document.querySelector(".gallery");
        galerie.appendChild(addNewFigure);
      
    
        modalPrev();
    
    });


    });

    



  }else{
    // Message d'erreur si un/des champs de forumaire mal rempli
    msgErrorForm.classList.add("invalid-msg");
    msgErrorForm.innerHTML = "Veuillez remplir tous les champs du formulaire";
    submitBtn.setAttribute("id", "submit-btn");
    formNewWork.appendChild(msgErrorForm);
  
  }


  });

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

  

  





  










