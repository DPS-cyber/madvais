let recognition;

async function startAssistant() {
  const statusElement = document.getElementById("status");
  const speech = new SpeechSynthesisUtterance("Online. Activating Madvais.");
  window.speechSynthesis.speak(speech);

  // TensorFlow logic disabled for GitHub Pages
  statusElement.textContent = "Ready to listen";
}

function startListening() {
  const listenBtn = document.getElementById("listenBtn");
  const statusElement = document.getElementById("status");

  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    statusElement.textContent = `You said: ${transcript}`;
    handleVoiceCommand(transcript.toLowerCase());
  };

  recognition.onend = () => {
    listenBtn.textContent = 'Listen';
  };

  recognition.start();
  listenBtn.textContent = 'Listening...';
}

function handleVoiceCommand(command) {
  const speech = new SpeechSynthesisUtterance();

  if (command.includes('hello')) {
    speech.text = 'Hello sir! I am Madvais.';
  } else if (command.includes('goodbye')) {
    speech.text = 'Goodbye! Have a great day.';
  } else if (command.includes('time')) {
    const time = new Date().toLocaleTimeString();
    speech.text = `The current time is ${time}`;
  } else if (command.includes('date')) {
    const date = new Date().toDateString();
    speech.text = `Today's date is ${date}`;
  } else if (command.includes('weather')) {
    const loc = localStorage.getItem('weatherLocation') || 'Secunderabad';
    getWeatherInfo(loc).then(displayWeather);
    return;
  } else {
    speech.text = `Searching Google for ${command}`;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(command)}`, '_blank');
  }

  window.speechSynthesis.speak(speech);
}

async function getWeatherInfo(location) {
  const apiKey = '48ddfe8c9cf29f95b7d0e54d6e171008';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  const weatherInfo = {
    description: data.weather[0].description,
    temperature: (data.main.temp - 273.15).toFixed(2),
    humidity: data.main.humidity,
    location
  };

  const speech = new SpeechSynthesisUtterance(`Weather in ${location}: ${weatherInfo.description}, ${weatherInfo.temperature}°C, Humidity: ${weatherInfo.humidity}%`);
  window.speechSynthesis.speak(speech);

  return weatherInfo;
}

function displayWeather(info) {
  const weatherBox = document.getElementById("weatherBox");
  const weatherInfoElement = document.getElementById("weatherInfo");
  weatherBox.style.display = "block";

  weatherInfoElement.innerHTML = `
    Location: ${info.location}<br>
    Description: ${info.description}<br>
    Temperature: ${info.temperature}°C<br>
    Humidity: ${info.humidity}%
  `;
}

function processInput() {
  const input = document.getElementById("user-input").value.trim().toLowerCase();
  displayMessage("You", input);

  let response = "I don't understand that.";

  if (input.includes("youtube")) response = "YouTube is a video-sharing platform.";
  else if (input.includes("google")) response = "Google is a search engine and tech company.";
  else if (input.includes("facebook")) response = "Facebook is a social networking site.";
  else if (input.includes("potato ashwanth view")) response = "Potato is God of vegetables.";

  displayMessage("M.A.D.V.A.I.S", response);
  document.getElementById("user-input").value = "";
}

function displayMessage(sender, message) {
  const chatBox = document.getElementById("chat-box");
  const messageElement = document.createElement("div");
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("startBtn").addEventListener("click", () => {
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("animationContainer").style.display = "block";
    start 
