import { format } from 'date-fns';
import Cookies from 'js-cookie';
import { getWeatherData, getLocationByCoordinates } from './obtainingData';
import { DOM_SELECTORS as DOM, IMG, LINKS } from './linksAndSelectors';
import {
  buildBlockOfElements,
  ELEMENTS_STYLE as STYLE,
} from './definitionElements';

const TIME_VALUES = {
  AMOUNT_MILLISECONDS: 1000,
  AMOUNT_SECONDS: 60,
};

let favoritesSet = new Set();

function calcTimeZoneOffset(data) {
  const timeZone = data.timezone * TIME_VALUES.AMOUNT_MILLISECONDS;
  const timeOffset = new Date().getTimezoneOffset()
    * (TIME_VALUES.AMOUNT_SECONDS * TIME_VALUES.AMOUNT_MILLISECONDS);
  const currentOffset = timeOffset + timeZone;
    return currentOffset ?? null;
}

function longTermUpdate(data, temp, feels, img, listIndex) {
  temp.textContent = `${data.list[listIndex].main.temp.toFixed(0)}°`;
  feels.textContent = `${data.list[listIndex].main.feels_like.toFixed(0)}°`;
  img.innerHTML = `<img src="${IMG.WEATHER}${data.list[listIndex].weather[0].icon}@4x.png">`;
}

function updateStorage() {
  window.localStorage.setItem(
    'favoriteLocations',
    JSON.stringify([...favoritesSet]),
  );
}

function updateLocationStyle(location) {
  document.querySelectorAll('li').forEach((li) => {
    if (li.textContent === location) {
      li.className = STYLE.SELECTED;
      DOM.SHAPE_IMG.className = STYLE.CLICKED;
    } else {
      li.className = STYLE.UNSELECTED;
    }
  });
}

function currentStyleChoice(location) {
  if (!favoritesSet.has(location)) {
    DOM.SHAPE_IMG.className = STYLE.UNCLICKED;
  }
  updateLocationStyle(location);
}

function ifDeletedLocationSelected(location) {
  if (location === DOM.LOCATION.textContent) {
    DOM.SHAPE_IMG.className = STYLE.UNCLICKED;
  }
}

function render() {
  DOM.FAVORITES_UI.innerHTML = '';
  favoritesSet.forEach((location) => {
    DOM.FAVORITES_UI.append(createStructureOfElements(location));
  });
  updateLocationStyle(DOM.LOCATION.textContent);
}

function removeFromArray() {
  const locationName = this.parentElement.textContent;
  favoritesSet = new Set(
    [...favoritesSet].filter((location) => location !== locationName),
  );
  this.removeEventListener('click', removeFromArray);
  ifDeletedLocationSelected(locationName);
  updateStorage();
  render();
}

function chooseLocationFromFavourites(event) {
  event.preventDefault();
  сurrentLocationProcessing(this.textContent);
}

function createStructureOfElements(location) {
  const LIST_ITEM = document.createElement('li');
  const ADD_ITEM = document.createElement('span');
  const DELETE_ITEM = document.createElement('button');
  DELETE_ITEM.addEventListener('click', removeFromArray);
  ADD_ITEM.textContent = location;
  ADD_ITEM.addEventListener('click', chooseLocationFromFavourites);
  const structureOfElements = buildBlockOfElements(
    LIST_ITEM,
    ADD_ITEM,
    DELETE_ITEM,
  );
  return structureOfElements;
}

function сurrentLocationProcessing(location) {
  getWeatherData(location, LINKS.WEATHER_TOP_URL, LINKS.WEATHER_API_KEY).then(
    (data) => {
      Cookies.set("currentLocation", `${data.name}`, {expires: 1/24});
      DOM.WEATHER_IMG.innerHTML = `<img src="${IMG.WEATHER}${data.weather[0].icon}@4x.png">`;
      DOM.DEGREES.textContent = `${data.main.temp.toFixed(0)}°`;
      DOM.LOCATION.textContent = data.name;
      DOM.FEELS_LIKE.textContent = `${data.main.feels_like.toFixed(0)}°`;
      DOM.SUNRISE.textContent = format(
        new Date(
          data.sys.sunrise * TIME_VALUES.AMOUNT_MILLISECONDS
            + calcTimeZoneOffset(data),
        ),
        'kk:mm',
      );
      DOM.SUNSET.textContent = format(
        new Date(
          data.sys.sunset * TIME_VALUES.AMOUNT_MILLISECONDS
            + calcTimeZoneOffset(data),
        ),
        'kk:mm',
      );
      DOM.SEARCH_INPUT.value = null;
    },
  );
  getWeatherData(
    location,
    LINKS.WEATHER_LONG_TERM_URL,
    LINKS.WEATHER_API_KEY,
  ).then((data) => {
    DOM.LONG_TERM_3HR_TIME.textContent = format(
      new Date(data.list[0].dt_txt),
      'kk:mm',
    );
    DOM.LONG_TERM_6HR_TIME.textContent = format(
      new Date(data.list[1].dt_txt),
      'kk:mm',
    );
    DOM.LONG_TERM_9HR_TIME.textContent = format(
      new Date(data.list[2].dt_txt),
      'kk:mm',
    );
    longTermUpdate(
      data,
      DOM.LONG_TERM_3HR_TEMP,
      DOM.LONG_TERM_3HR_FEELS,
      DOM.LONG_TERM_3HR_IMG,
      0,
    );
    longTermUpdate(
      data,
      DOM.LONG_TERM_6HR_TEMP,
      DOM.LONG_TERM_6HR_FEELS,
      DOM.LONG_TERM_6HR_IMG,
      1,
    );
    longTermUpdate(
      data,
      DOM.LONG_TERM_9HR_TEMP,
      DOM.LONG_TERM_9HR_FEELS,
      DOM.LONG_TERM_9HR_IMG,
      2,
    );
  });
  currentStyleChoice(location);
}

function processingResponseData(event) {
  event.preventDefault();
  сurrentLocationProcessing(DOM.SEARCH_INPUT.value);
}

function displayCoordinateBasedLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude } = position.coords ?? "55.7522200";
      const { longitude } = position.coords ?? "37.6155600";
      getLocationByCoordinates(
        LINKS.LOCATION_URL,
        latitude,
        longitude,
        LINKS.LOCATION_API_KEY,
      ).then((data) => сurrentLocationProcessing(data.results[0]?.components?.city ?? "Moscow"));
    });
  }
}

function сurrentLoadingActions() {
  if (!document.cookie.length ||!window.localStorage.length) {
    displayCoordinateBasedLocation();
  } else {
    const currentLocation = Cookies.get("currentLocation");
    сurrentLocationProcessing(currentLocation);
    const favoritesStorage = JSON.parse(
      window.localStorage.getItem('favoriteLocations')
    );
    favoritesStorage.forEach((location) => favoritesSet.add(location));
    render();
    updateLocationStyle(currentLocation);
  }
}

function addToArray(location) {
  if (favoritesSet.has(location)) return;
  favoritesSet.add(location);
}

function addLocationComplexly(event) {
  event.preventDefault();
  addToArray(DOM.LOCATION.textContent);
  updateStorage();
  render();
}

document.addEventListener('DOMContentLoaded', сurrentLoadingActions);
DOM.SEARCH_FORM.addEventListener('submit', processingResponseData);
DOM.ADD_LOCATION.addEventListener('click', addLocationComplexly);
