import './styles.css';
import './normalize.css';

const input = document.querySelector('input');
const form = document.querySelector('form');
const location = document.querySelector('.location');
const temp = document.querySelector('.temp');
const description = document.querySelector('.description');
const image = document.querySelector('img');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

const currentLocation = {
	name: '',
	country: '',
	temp: '',
	description: '',
	wind: '',
	humidity: '',
	icon: '',
};

form.addEventListener('submit', (event) => {
	event.preventDefault();
	getWeatherData(input.value);
	form.reset();
});

async function getWeatherData(location) {
	const fetchData = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=897dcd4fdb105148b7436c12cb942fc3&units=metric`,
		{ mode: 'cors' },
	);
	const data = await fetchData.json();
	assignData(data);
	renderData();
}

function assignData(data) {
	currentLocation.name = data.name;
	currentLocation.country = data.sys.country;
	currentLocation.temp = data.main.feels_like.toFixed(0);
	currentLocation.description = data.weather[0].main;
	currentLocation.wind = data.wind.speed;
	currentLocation.humidity = data.main.humidity;
	currentLocation.icon = data.weather[0].icon;
}

function renderData() {
	location.textContent = `${currentLocation.name}, ${currentLocation.country}`;
	temp.textContent = `${currentLocation.temp}°C`;
	description.textContent = currentLocation.description;
	wind.textContent = `${currentLocation.wind.toFixed(1)} km/h`;
	humidity.textContent = `${currentLocation.humidity}%`
	image.src = `http://openweathermap.org/img/wn/${currentLocation.icon}@2x.png`;
}
