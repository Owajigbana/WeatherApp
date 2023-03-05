/* jshint esversion:6 */
/* jshint esversion:8 */

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const body = document.querySelector('body');

const updateUI = (data) => {

  const cityDets = data.cityDets;
  const weather = data.weather;

  // update detail template
  details.innerHTML = `
  <h5 class="my-3">${cityDets.EnglishName}</h5>
  <div class="my-3">${weather.WeatherText}</div>
  <div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
  </div>
  `;

  //updating the naight/day images and icons
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  let timeSrc;
  if(weather.IsDayTime){
    timeSrc = 'img/day.svg';
  } else{
    timeSrc = 'img/night.svg';
    body.style.background = '#004d61';
  }
  //change src attribute to change images
  time.setAttribute('src', timeSrc);

  // remove d-none class id present
  if(card.classList.contains('d-none')){
    card.classList.remove('d-none');
  }
};

// to update city name
const updateCity = async (city) => {

  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return {cityDets, weather};

};

cityForm.addEventListener('submit', e => {
  //prevent default reload page action
  e.preventDefault();

  //get city value inputed by user
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update the UI with new cityForm
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    //store information from weather app using set local storage
    localStorage.setItem('city', city);

});

//check if city already exist in the localStorage
if(localStorage.getItem('city')){
  updateCity(localStorage.getItem('city'))
  .then(data => updateUI(data))
  .catch(err => console.log(err));
}
