import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './templates/fetch-countries.js';
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
  if (searchQuery === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(searchQuery).then(renderCountryCard).catch(onFetchError);
}

function renderCountryCard(country) {
  if (country.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  if (country.length > 1 && country.length < 10) {
    const markup = countryCardList(country);
    countryInfo.innerHTML = '';
    countryList.innerHTML = markup;
  }
  if (country.length === 1) {
    const markup = countryCardInfo(country);
    countryInfo.innerHTML = markup;
    countryList.innerHTML = '';
  }
}

function onFetchError(country) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  return country;
}
