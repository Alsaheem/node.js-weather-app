//import stuffs require
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));
console.log(__filename);

// initiate express
const app = express();

// Define paths  for espress views
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const publicDirectory = path.join(__dirname, "../public");

// setup handle bars and views directory
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// // // // // // //

// nodemon app.js -e js,hbs
//setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather-Home",
    heading: "Weather",
    name: "Alsaheem",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About-Me",
    name: "Adebisi Ayomide",
    github_link: "https://www.github.com/alsaheem",
    bio:
      "Adebisi is a really nice person he understands node js and flutter to a really large extent....he is also a django lord",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Contact us",
    email: "email@email.com",
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "error",
    errorMessage: "This Help Article cannot be found",
  });
});

app.get("/weather", (req, res) => {
  console.log(req.query.address);
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address parameter",
    });
  }

  let myLocation = req.query.address;
  console.log(myLocation);
  geocode(
    myLocation.toString(),
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: "An error occoured" });
      }
      forecast(longitude, latitude, (error, { temperature, feelslike }) => {
        if (error) {
          return res.send({ error: "An error occoured" });
        }
        return res.send({
          location: location,
          forecast: { temperature, feelslike },
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  console.log(req.query);
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  res.send({
    products: [],
    success: "success",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404 Page",
    errorMessage: "404 Error - This page does not exist",
  });
});

app.listen(5000, () => {
  console.log(`i am an indaboski, I run servers`);
});
