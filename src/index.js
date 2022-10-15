import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

input.addEventListener(
  'input',
  debounce(e => {
      const trimmedValue = input.value.trim();
         cleanHtml();   
    if (trimmedValue !== '') {
        fetchCountries(trimmedValue).then(foundData => {      

        if (foundData.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (foundData.length === 0) {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        } else if (foundData.length >= 2 && foundData.length <= 10) {
         
          renderCountryList(foundData);
        } else if (foundData.length === 1) {
    
          renderOneCountry(foundData);
        }
      });
    }
  }, DEBOUNCE_DELAY)
);

function renderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li style="display: flex; align-items: center; gap: 10px;">
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30">
      <p style="font-size: 20px; margin: 0px">${country.name.official}</p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function renderOneCountry(countries) {
      const markup = countries
        .map(country => {
          return `<li>
          
          <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30">
          <h2 style="display: inline">${country.name.official}</h2>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
          <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
        })
        .join('');
      countryList.innerHTML = markup;
}

countryList.style.listStyle = 'none'
countryList.style.margin = '0';
countryList.style.paddingLeft = '0';


function cleanHtml() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}