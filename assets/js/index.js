const countriesContainer = document.querySelector(".countries-container");
const btnSort = document.querySelectorAll(".btnSort");
// faire apparaître les données dans une variable
let countriesData = [];
let sortMethod = "maxToMin";
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
    // Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    // Gérer les 3 boutons pour trier (méthode sort()) les pays
    .sort((a, b) => {
      if (sortMethod === "maxToMin") {
        return b.population - a.population;
      } else if (sortMethod === "minToMax") {
        return a.population - b.population;
      } else if (sortMethod === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    // Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)
    .slice(0, inputRange.value)
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
inputSearch.addEventListener("input", countriesDisplay);
inputRange.addEventListener("input", () => {
  countriesDisplay;
  rangeValue.textContent = inputRange.value; // va connecter les 2 élément
});

btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id;
    countriesDisplay();
  });
});
