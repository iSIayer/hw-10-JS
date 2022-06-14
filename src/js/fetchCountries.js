const MAIN_URL = 'https://restcountries.com/v3.1';

function fetchCountry(name) {
  return fetch(
    `${MAIN_URL}/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export default { fetchCountry };
