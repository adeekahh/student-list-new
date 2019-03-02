const bloodLink = "http://petlatkea.dk/2019/hogwarts/families.json";

let halfBloods = new Array();
let fullBloods = new Array();

let jsonData;

window.addEventListener("DOMContentLoaded", loadJson());

function loadJson() {
  fetch(bloodLink)
    .then(res => res.json())
    .then(jsonBloodData => {
      jsonData = jsonBloodData;
      prepareBloodTypeArrays(jsonBloodData);
    });
  console.log("JSON FETCHED");
}

function prepareBloodTypeArrays(jsonBloodData) {
  console.log(jsonData);
}
