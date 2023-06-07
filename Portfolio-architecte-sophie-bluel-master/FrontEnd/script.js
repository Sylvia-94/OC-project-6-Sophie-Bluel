
const galerie = document.querySelector(".gallery");
const container = document.querySelector(".filters");

// Fonction displayButtons pour : 
// générer les cétégories des boutons
// créer les boutons dans le DOM 
// gérer un eventListener pour chaque bouton, avec des conditions spécifiques

function displayButtons(array){

  const categoriesDuplicates = [];
  categoriesDuplicates.push("Tous");

  array.forEach(object => {
    categoriesDuplicates.push(object.category.name);
  });

  const categories = new Set(categoriesDuplicates);

  categories.forEach(category => {

  const button = document.createElement("button");
  button.textContent = category;
  if(category === "Tous"){
    button.classList.add("btn-selected");

  };
  container.appendChild(button);

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
    const figureCaption = document.createElement("figcaption");
    
    figureImg.src = object.imageUrl;
    figureCaption.textContent = object.title;

    figureElement.appendChild(figureImg);
    figureElement.appendChild(figureCaption);
    galerie.appendChild(figureElement);
  });
}


// Fonction asynchrone principale
  async function init () {
    const response = await fetch("http://localhost:5678/api/works");
    const json = await response.json();
    displayWorks(json);
    displayButtons(json);
  }

  init();
  

  


   


  










