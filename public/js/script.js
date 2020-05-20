console.log(`fetching.....`);

fetch("http://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});

console.log(`Done.....`);

const weatherForm = document.querySelector(`form`);
const search = document.querySelector(`input`);
let alert = document.getElementById(`alert`);
let message = document.getElementById(`message`);
let userlocation = document.getElementById(`location`);
let forecast = document.getElementById(`forecast`);
let button = document.getElementById(`search`);
let loader = document.getElementById(`loader`);

weatherForm.addEventListener(`submit`, (e) => {
  e.preventDefault();
  button.disabled = true;
  loader.style.display = `block`;
  const location = search.value;
  fetch(`/weather?address=${location}`).then((response) =>
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        alert.classList.add("alert-danger");
        alert.style.display = `block`;
        message.innerHTML = data.error;
        button.disabled = false;
        loader.style.display = `none`;
      } else {
        alert.classList.remove("alert-danger");
        alert.classList.add("alert-success");
        alert.style.display = `block`;
        message.innerHTML = `success`;
        userlocation.innerHTML = `Country: ${data.location}`;
        forecast.innerHTML = `Prediction: The temperature us currently ${data.forecast.temperature} , but it feels like ${data.forecast.feelslike}`;
        button.disabled = false;
        loader.style.display = `none`;
        console.log(`location`, data.location);
        console.log(`forecast`, data.forecast);
      }
      setTimeout(() => {
        alert.style.display = `none`;
      }, 3000);
    })
  );
});
