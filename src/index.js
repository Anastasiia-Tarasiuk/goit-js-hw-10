import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from "lodash.debounce";
import { fetchCountries } from './fetchCountries';


const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInputTyping, DEBOUNCE_DELAY));

function onInputTyping(event) {
    const countryForSearch = event.target.value;
 
    fetchCountries(countryForSearch)
        .then((countries) => {
            console.log(countries);
            if (countries.length >= 2 && countries.length <= 10) {
                
                const markup = countries.map(country => {
                    return `<li><img src = "${country.flags.svg}"><p>${country.name.official}</p></li>`;
                }).join('');
                countryListEl.innerHTML = markup;
                countryInfoEl.style.fontSize = "18px";
                countryInfoEl.innerHTML = "";
                
            } else if (countries.length === 1) {
                
                const country = countries[0];
                const markupList = `<li><img src = "${country.flags.svg}"><b>${country.name.official}</b></li>`;
                countryListEl.innerHTML = markupList;
                const markupInfo = `<ul><li><span><b>Capital:</b> ${country.capital}</span></li>
                    <li><span><b>Population:</b> ${country.population}</span></li>
                    <li><span><b>Languages:</b> ${Object.values(country.languages).join(", ")}</span></li></ul>`;
                countryInfoEl.innerHTML = markupInfo;
                countryListEl.style.fontSize = "24px";
                countryInfoEl.style.fontSize = "18px";
            } else {
                
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name");
            }
        })
        .catch(error => {
            countryListEl.innerHTML = "";
            countryInfoEl.innerHTML = "";
        }); 
} 
