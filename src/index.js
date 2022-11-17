import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetch-countries.js';
import countryCardList from './templates/countrylist.hbs';
import countryCardInfo from './templates/countryinfo.hbs';

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryInput.addEventListener(
  'input',
  debounce(onCountrySearch),
  DEBOUNCE_DELAY
);

function onCountrySearch() {
  const searchQuery = countryInput.value.trim();
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  if (searchQuery === '') {
    fetchCountries(searchQuery).then(renderCountryCard).catch(onFetchError);
  }

  // fetchCountries(searchQuery).then(renderCountryCard).catch(onFetchError);
}

function renderCountryCard(country) {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  if (country.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (country.length > 1 && country.length < 10) {
    const markup = country.map(country => countryCardList(country)).join('');
    countryList.innerHTML = markup;
  }
  if (country.length === 1) {
    const markup = country.map(country => countryCardInfo(country)).join('');
    countryInfo.innerHTML = markup;
  }
}

function onFetchError(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  return error;
}
