export async function getWeatherData(location, url, key) {
  try {
    const response = await fetch(
      `${url}?q=${location}&units=metric&appid=${key}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getLocationByCoordinates(url, latitude, longitude, key) {
  try {
    const response = await fetch(
      `${url}?q=${latitude}+${longitude}&key=${key}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}
