const apiKey = "YOUR_API_KEY_HERE";


async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Enter city");

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );

  const data = await res.json();

  if (data.cod !== 200) {
    alert("City not found");
    return;
  }

  updateUI(data);
}

function updateUI(data) {
  document.getElementById("cityName").innerText = data.name;
  document.getElementById("temperature").innerText = `${Math.round(data.main.temp)}°C`;
  document.getElementById("description").innerText = data.weather[0].description;

  document.getElementById("humidity").innerText = `${data.main.humidity}%`;
  document.getElementById("wind").innerText = `${data.wind.speed} km/h`;

  // 🌈 ICONS
  const condition = data.weather[0].main.toLowerCase();
  const iconEl = document.getElementById("icon");

  if (condition.includes("cloud")) iconEl.innerHTML = "☁️";
  else if (condition.includes("rain")) iconEl.innerHTML = "🌧️";
  else if (condition.includes("clear")) iconEl.innerHTML = "☀️";
  else if (condition.includes("snow")) iconEl.innerHTML = "❄️";
  else if (condition.includes("storm")) iconEl.innerHTML = "⛈️";
  else iconEl.innerHTML = "🌍";

  setBackground(data);

  document.getElementById("weatherCard").classList.remove("hidden");
}

/* 🌈 DYNAMIC BACKGROUND */
function setBackground(data) {
  const condition = data.weather[0].main.toLowerCase();
  const rain = document.querySelector(".rain");

  // remove rain by default
  rain.classList.add("hidden");

  if (condition.includes("clear")) {
    document.body.style.background =
      "linear-gradient(135deg, #56ccf2, #2f80ed)";
  } 
  else if (condition.includes("cloud")) {
    document.body.style.background =
      "linear-gradient(135deg, #757f9a, #d7dde8)";
  } 
  else if (condition.includes("rain")) {
    document.body.style.background =
      "linear-gradient(135deg, #373b44, #4286f4)";
    rain.classList.remove("hidden");
  } 
  else if (condition.includes("snow")) {
    document.body.style.background =
      "linear-gradient(135deg, #e6dada, #274046)";
  } 
  else {
    document.body.style.background =
      "linear-gradient(135deg, #1e3c72, #2a5298)";
  }
}