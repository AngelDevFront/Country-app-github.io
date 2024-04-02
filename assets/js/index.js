const countriesContainer = document.querySelector(".countries-container");
// faire apparaître les données dans une variable
let countriesData = [];
//créez une fonction
async function fetchCountries() {
  // fait apparaître les données de l'url dans la console
  await fetch(`https://restcountries.com/v3.1/all`)
    .then((res) => res.json())
    .then((data) => {
      countriesData = data;
    });
  console.log(countriesData);
  countriesDisplay();
}

//créez une fonction d'affichage et paramétrer l'affichage des cartes de chaque pays grace à la méthode map
function countriesDisplay() {
  countriesContainer.innerHTML = countriesData
    .map(
      (country) =>
        `
      <div class="card">
        <img src=${country.flags.svg} alt="drapeau ${
          country.translations.fra.common
        }" >
        <h2>${country.translations.fra.common}</h2>
        <h4>${country.capital}</h4>
        <p>Population : ${country.population.toLocaleString()}</p>
      </div>
    `
    )
    .join("");
}
window.addEventListener("load", fetchCountries);
