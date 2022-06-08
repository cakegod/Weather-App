import './styles.css';
import './normalize.css';

const input = document.querySelector('input');
const form = document.querySelector('form');
const locationName = document.querySelector('.location');
const temp = document.querySelector('.temp');

const weatherObj = {
	name: '',
	temp: '',
};

form.addEventListener('submit', (event) => {
	event.preventDefault();
	getWeatherData(input.value);
});

async function getWeatherData(location) {
	const fetchData = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=897dcd4fdb105148b7436c12cb942fc3&units=metric`,
		{ mode: 'cors' },
	);
	const weather = await fetchData.json();
	assignData(weather);
	renderData(weather);
	console.log(weather, weather.name, weather.main.feels_like);
} 

function assignData(weather) {
	weatherObj.name = weather.name;
	weatherObj.temp = weather.main.feels_like.toFixed(1);
}

function renderData() {
	locationName.textContent = weatherObj.name;
	temp.textContent = `${weatherObj.temp}°C`;
	console.log(weatherObj);
}
