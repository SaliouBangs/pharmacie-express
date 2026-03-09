let panier = JSON.parse(localStorage.getItem("panier")) || [];

let zone = document.getElementById("panier");

let total = 0;

panier.forEach(p => {

zone.innerHTML += `
<div class="panier-produit">

<span class="panier-nom">${p.nom}</span>

<div class="panier-quantite">

<button onclick="changerQuantite('${p.id}', -1)">-</button>

${p.quantite}

<button onclick="changerQuantite('${p.id}', 1)">+</button>

</div>

<span>${p.prix * p.quantite} GNF</span>

</div>
`;

total += p.prix * p.quantite;

});

document.getElementById("total").innerHTML = "Total : " + total + " GNF";



function changerQuantite(id, valeur){

let panier = JSON.parse(localStorage.getItem("panier")) || [];

let produit = panier.find(p => p.id === id);

if(produit){

produit.quantite += valeur;

if(produit.quantite <= 0){
panier = panier.filter(p => p.id !== id);
}

}

localStorage.setItem("panier", JSON.stringify(panier));

location.reload();

}



function viderPanier(){

localStorage.removeItem("panier");

location.reload();

}