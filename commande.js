document.getElementById("commandeForm").addEventListener("submit", function(e){

e.preventDefault();

let nom = document.getElementById("nom").value;
let telephone = document.getElementById("telephone").value;
let adresse = document.getElementById("adresse").value;

let panier = JSON.parse(localStorage.getItem("panier")) || [];

let message = "Nouvelle commande pharmacie:%0A%0A";

message += "Nom: " + nom + "%0A";
message += "Téléphone: " + telephone + "%0A";
message += "Adresse: " + adresse + "%0A%0A";

message += "Produits:%0A";

panier.forEach(p => {

message += p.nom + " x" + p.quantite + "%0A";

});


// AJOUT POSITION GPS
let latitude = localStorage.getItem("latitude");
let longitude = localStorage.getItem("longitude");

if(latitude && longitude){

message += "%0A%0APosition du client:%0A";
message += "https://maps.google.com/?q=" + latitude + "," + longitude;

}


let numero = "224620413142";

let url = "https://wa.me/" + numero + "?text=" + message;

window.open(url);
localStorage.removeItem("panier");

});


// GEOLOCALISATION
function localiser(){

if(!navigator.geolocation){

alert("La géolocalisation n'est pas supportée");

return;

}

navigator.geolocation.getCurrentPosition(function(position){

let latitude = position.coords.latitude;
let longitude = position.coords.longitude;

localStorage.setItem("latitude", latitude);
localStorage.setItem("longitude", longitude);

document.getElementById("position").innerHTML =
"✔ Position enregistrée";

let carte = `
<iframe
src="https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed">
</iframe>
`;

document.getElementById("carte").innerHTML = carte;

});

}

let panier = JSON.parse(localStorage.getItem("panier")) || [];

let zone = document.getElementById("resume-panier");

let total = 0;

panier.forEach(p => {

zone.innerHTML += `
<p>${p.nom} x${p.quantite} - ${p.prix * p.quantite} GNF</p>
`;

total += p.prix * p.quantite;

});

zone.innerHTML += `<hr><strong>Total : ${total} GNF</strong>`;