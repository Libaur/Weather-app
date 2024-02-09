export const DOM_SELECTORS = {
  SHAPE_IMG: document.querySelector("#shape-img").style,
  LONG_TERM_3HR_IMG: document.querySelector("#long-term-3hr-img"),
  LONG_TERM_6HR_IMG: document.querySelector("#long-term-6hr-img"),
  LONG_TERM_9HR_IMG: document.querySelector("#long-term-9hr-img"),
  LONG_TERM_3HR_TEMP: document.querySelector("#temp-3hr"),
  LONG_TERM_6HR_TEMP: document.querySelector("#temp-6hr"),
  LONG_TERM_9HR_TEMP: document.querySelector("#temp-9hr"),
  LONG_TERM_3HR_TIME: document.querySelector("#time-3hr"),
  LONG_TERM_6HR_TIME: document.querySelector("#time-6hr"),
  LONG_TERM_9HR_TIME: document.querySelector("#time-9hr"),
  LONG_TERM_3HR_FEELS: document.querySelector("#feels-3hr"),
  LONG_TERM_6HR_FEELS: document.querySelector("#feels-6hr"),
  LONG_TERM_9HR_FEELS: document.querySelector("#feels-9hr"),
  WEATHER_IMG: document.querySelector("#weather-img"),
  FEELS_LIKE: document.querySelector("#feels-like"),
  SUNRISE: document.querySelector("#sunrise"),
  SUNSET: document.querySelector("#sunset"),
  SEARCH_FORM: document.querySelector("#search-form"),
  SEARCH_INPUT: document.querySelector("#search-input"),
  DEGREES: document.querySelector("#degrees"),
  LOCATION: document.querySelector("#location-name"),
  ADD_LOCATION: document.querySelector("#add-to-favorites"),
  FAVORITES_UI: document.querySelector("#favorite-locations"),
};

export const IMG = {
  WEATHER: "https://openweathermap.org/img/wn/",
  SHAPE: 'url("./imgs/shape.png")',
  SHAPE_CLiCKED: 'url("./imgs/shape-clicked.png")',
};

export const LINKS = {
  WEATHER_API_KEY: "0d877505020e5cf0e6ef1c1a18bda84b",
  WEATHER_TOP_URL: "https://api.openweathermap.org/data/2.5/weather",
  WEATHER_LONG_TERM_URL: "https://api.openweathermap.org/data/2.5/forecast",
  LOCATION_API_KEY: "ffae5d4b0d514fc7803f8b5a3b03fd9a",
  LOCATION_URL: "https://api.opencagedata.com/geocode/v1/json",
};
