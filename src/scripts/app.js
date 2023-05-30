const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = data => {
  /*
  const cityDets = data.cityDets;
  const weather = data.weather;
  */
  //destructuring above code
  const { cityDets, weather } = data;

  //update details template
  details.innerHTML = `  <h5 class="my-3">${cityDets.EnglishName}</h5>
  <div class="my-3">${weather.WeatherText}</div>
  <div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>`;

  //update the night/day & icon images
  const iconSrc = `/img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);
  /*
  let timeSrc = null;
  if (weather.IsDayTime) {
    timeSrc = '/img/day.svg';
  } else {
    timeSrc = '/img/night.svg';
  }
  */
  //rewrite above code using ternary operator
  const timeSrc = weather.IsDayTime ? '/img/day.svg' : '/img/night.svg';

  time.setAttribute('src', timeSrc);
  //remove d-none class if present
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
};
const updateCity = async city => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);
  return {
    /*
    cityDets: cityDets,
    weather: weather,
    */
    //object shorthand
    cityDets,
    weather,
  };
};

cityForm.addEventListener('submit', e => {
  e.preventDefault();

  //get cities values
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update the ui with the new city
  updateCity(city)
    .then(data => {
      updateUI(data);
    })
    .catch(err => {
      console.log(err);
    });
});
