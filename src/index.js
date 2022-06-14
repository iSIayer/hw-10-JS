import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import API from './js/fetchCountries';
import countryCard from './templates/countryCard.hbs';
import countryList from './templates/countryList.hbs';

const DEBOUNCE_DELAY = 300;
const refs = {
  inputValue: document.querySelector('#search-box'),
  valueInputCountry: document.querySelector('.country-info'),
};

refs.inputValue.addEventListener(
  'input',
  debounce(searchCountry, DEBOUNCE_DELAY)
);
// refs.valueInputCountry.addEventListener('input', toggleWindowBg);

function searchCountry(evt) {
  const name = evt.target.value.trim();
  clearRender();
  if (name.length === 0) {
    return;
  }
  API.fetchCountry(name).then(renderCountryCard).catch(onFetchError);
}

function renderCountryCard(country) {
  if (country.length > 10) {
    Notiflix.Notify.info(
      `Too many matches found. Please enter a more specific name.`
    );
  }
  if (country.length > 1 && country.length < 10) {
    const markup = countryList(country);
    refs.valueInputCountry.innerHTML = markup;
    // refs.valueInputCountry.classList.add('is-hidden');
  } else if (country.length === 1) {
    const markup = countryCard(country);
    refs.valueInputCountry.innerHTML = markup;
    // refs.valueInputCountry.classList.remove('is-hidden');
  }
}

function onFetchError() {
  Notiflix.Notify.failure(`Oops, there is no country with that name`);
  refs.valueInputCountry.innerHTML = '';
}

function clearRender() {
  refs.valueInputCountry.innerHTML = '';
}

// function toggleWindowBg() {
//   refs.inputValue.classList.toggle('is-hidden');
// }
