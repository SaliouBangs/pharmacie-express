// LISTE DES MEDICAMENTS

const medicaments = [

{
id:"MED001",
nom:"Paracetamol",
prix:15000,
image:"paracetamol.jpg",
dosage:"500 mg",
usage:"Douleur et fièvre",
categorie:"Antalgique"
},

{
id:"MED002",
nom:"Amoxicilline",
prix:25000,
image:"amoxiciline.jpg",
dosage:"500 mg",
usage:"Infections bactériennes",
categorie:"Antibiotique"
},

{
id:"MED003",
nom:"Vitamine C",
prix:10000,
image:"Vitamine.jpg",
dosage:"1000 mg",
usage:"Renforce l'immunité",
categorie:"Vitamine"
},

{
id:"MED004",
nom:"Ibuprofene",
prix:18000,
image:"ibuprofen.jpg",
dosage:"400 mg",
usage:"Douleur et inflammation",
categorie:"Anti-inflammatoire"
}

];


// CHARGER PANIER
let panier = JSON.parse(localStorage.getItem("panier")) || [];

// AFFICHER PRODUITS
function afficherProduits(liste){

let container = document.getElementById("liste");

if(!container) return;

container.innerHTML = "";

liste.forEach(med => {

let div = document.createElement("div");
div.className = "produit";

div.innerHTML = `
<img src="${med.image}" class="produit-image">

<h3>${med.nom}</h3>

<p class="categorie">${med.categorie}</p>

<p>${med.usage}</p>

<p class="dosage">Dosage : ${med.dosage}</p>

<p class="prix">${med.prix} GNF</p>
`;

let bouton = document.createElement("button");
bouton.textContent = "Ajouter au panier";

bouton.addEventListener("click", function(){
ajouterPanier(med.id, med.nom, med.prix);
});

div.appendChild(bouton);

container.appendChild(div);

});

}

// AJOUTER AU PANIER
function ajouterPanier(id, nom, prix){

let panier = JSON.parse(localStorage.getItem("panier")) || [];

let produit = panier.find(p => p.id === id);

if(produit){
produit.quantite += 1;
}else{
panier.push({id, nom, prix, quantite:1});
}

localStorage.setItem("panier", JSON.stringify(panier));

afficherMessage(nom + " ajouté au panier");

}

function afficherMessage(msg){

let message = document.createElement("div");

message.innerText = msg;

message.style.position = "fixed";
message.style.bottom = "20px";
message.style.right = "20px";
message.style.background = "#2e7d32";
message.style.color = "white";
message.style.padding = "10px 20px";
message.style.borderRadius = "5px";

document.body.appendChild(message);

setTimeout(()=>{
message.remove();
},2000);

}



// RECHERCHE
function activerRecherche(){

let recherche = document.getElementById("recherche");

if(!recherche) return;

recherche.addEventListener("keyup", function(){

let mot = this.value.toLowerCase();

let resultat = medicaments.filter(med =>
med.nom.toLowerCase().includes(mot)
);

afficherProduits(resultat);

});

}

// LANCEMENT
document.addEventListener("DOMContentLoaded", function(){

afficherProduits(medicaments);

activerRecherche();

});

let recherche = document.getElementById("recherche");
let suggestions = document.getElementById("suggestions");

recherche.addEventListener("keyup", function(){

let mot = this.value.toLowerCase();

suggestions.innerHTML = "";

if(mot.length === 0) return;

let resultat = medicaments.filter(med =>
med.nom.toLowerCase().includes(mot)
);

resultat.forEach(med => {

let div = document.createElement("div");

div.textContent = med.nom;

div.onclick = function(){

recherche.value = med.nom;

suggestions.innerHTML = "";

afficherProduits([med]);

};

suggestions.appendChild(div);

});

});

function toggleMenu(){

let menu = document.getElementById("nav-links");

if(menu.style.display === "flex"){

menu.style.display = "none";

}else{

menu.style.display = "flex";

}

}