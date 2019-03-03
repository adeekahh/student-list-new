"use strict";
//TEMPLATES
const myTemplate = document.querySelector("#studentListTemplate").content;
const squadTemplate = document.querySelector("#squadStudentListTemplate")
  .content;
const removedTemplate = document.querySelector("#removedStudentListTemplate")
  .content;

//MODAL
let modal = document.querySelector(".modal");

//LINKS
const link = "https://petlatkea.dk/2019/hogwarts/students.json";
const bloodLink = "https://petlatkea.dk/2019/hogwarts/families.json";

//ARRAYS
let allStudents = new Array();
let filteredList = new Array();
let removedStudents = new Array();
let halfBloods = new Array();
let pureBloods = new Array();
let squadList = new Array();
let listOfIds = new Array();

let jsonData;

//FILTER
let currentFilter = null;

window.addEventListener("DOMContentLoaded", init());

function init() {
  document.querySelector(".student-list").addEventListener("click", clickList);

  document.querySelector(".removed-list").addEventListener("click", clickList);
  document.querySelector(".squad-list").addEventListener("click", clickList);

  loadJSON();
}

function loadJSON() {
  fetch(link)
    .then(res => res.json())
    .then(jsonData => {
      fetch(bloodLink)
        .then(res1 => res1.json())
        .then(jsonBloodData => {
          makeBloodTypeArrays(jsonBloodData);
          prepareObjects(jsonData);
          showStudents();
        });
    });
}

// CREATE BLOOD CLASS ARRAYS
function makeBloodTypeArrays(data) {
  for (let i = 0; i < data.half.length; i++) {
    halfBloods.push(data.half[i]);
  }
  for (let j = 0; j < data.pure.length; j++) {
    pureBloods.push(data.pure[j]);
  }
}

function prepareObjects(jsonData) {
  jsonData.forEach(jsonObject => {
    //create new object
    let student = Object.create(jsonObject);

    //split name into parts
    let nameParts = jsonObject.fullname.split(" ");
    //assign parts to the student object
    student.firstname = nameParts[0];
    student.lastname = nameParts[nameParts.length - 1];
    student.house = student.house;
    student.imageSource =
      student.lastname.toLowerCase() +
      "_" +
      student.firstname.slice(0, 1).toLowerCase() +
      ".png";
    student.id = uuidv4();
    student.fullname = student.fullname;
    //console.log(student);
    //store data in a global array
    allStudents.push(student);

    //console.log(allStudents);
  });

  addBloodTypes();
  insertMyself();
}

function insertMyself() {
  var myself = {
    firstname: "Ádám",
    fullname: "Ádám Molnár",
    lastname: "Molnár",
    house: "Gryffindor",
    bloodtype: "pure-blood",
    imageSource: "unknown.png",
    id: "d9566a45-c962-4def-8a4a-877e938959fc"
  };
  allStudents.unshift(myself);
}

function addBloodTypes() {
  allStudents.forEach(student => {
    if (pureBloods.includes(student.lastname)) {
      student.bloodtype = "pure-blood";
    } else if (halfBloods.includes(student.lastname)) {
      student.bloodtype = "half-blood";
    } else {
      student.bloodtype = "muggle";
    }
  });
}

/*FILTERING*/
/*MAKE BUTTONS FILTER*/
function filterAll() {
  filteredList = allStudents;
  //console.log(filteredList);
  showStudents();
}

function setCurrentFilter(housename) {
  currentFilter = housename;
  filterList();
}

function filterFunction(student) {
  return student.house == currentFilter;
}

function filterList() {
  filteredList = allStudents.filter(filterFunction);
  filteredList.exist = "yes";
  showStudents();
}

function sortByFirstName() {
  if (filteredList.exist == undefined) {
    allStudents.sort(function(a, b) {
      if (a.firstname < b.firstname) {
        return -1;
      }
      if (a.firstname > b.firstname) {
        return 1;
      }
      return 0;
    });
  } else {
    filteredList.sort(function(a, b) {
      if (a.firstname < b.firstname) {
        return -1;
      }
      if (a.firstname > b.firstname) {
        return 1;
      }
      return 0;
    });
  }
  showStudents();
}

function sortByLastName() {
  if (filteredList.exist == undefined) {
    allStudents.sort(function(a, b) {
      if (a.lastname < b.lastname) {
        return -1;
      }
      if (a.lastname > b.lastname) {
        return 1;
      }
      return 0;
    });
  } else {
    filteredList.sort(function(a, b) {
      if (a.lastname < b.lastname) {
        return -1;
      }
      if (a.lastname > b.lastname) {
        return 1;
      }
      return 0;
    });
  }
  showStudents();
}

function sortByHouse() {
  if (filteredList.exist == undefined) {
    allStudents.sort(function(a, b) {
      if (a.house < b.house) {
        return -1;
      }
      if (a.house > b.house) {
        return 1;
      }
      return 0;
    });
  } else {
    filteredList.sort(function(a, b) {
      if (a.house < b.house) {
        return -1;
      }
      if (a.house > b.house) {
        return 1;
      }
      return 0;
    });
  }
  showStudents();
}

//REMOVING STUDENTS
function clickList(event) {
  // TODO: Figure out if a button was clicked
  const action = event.target.dataset.action;

  if (action === "remove") {
    event.preventDefault();
    clickRemove(event);
  } else if (action === "details") {
    event.preventDefault();
    showDetails(event);
  } else if (action === "removed-details") {
    //console.log("removed details");
    event.preventDefault(event);
    showDetails(event);
  } else if (action === "squad") {
    addToSquad(event);
  } else if (action === "removed-squad") {
    addToSquad(event);
  }
}

//ADD TO SQUAD
function addToSquad(event) {
  event.preventDefault();
  let id = event.target.dataset.id;

  addToSquadById(id);

  showStudents();
}

function addToSquadById(id) {
  let listOfStudents;
  if (filteredList.exist == undefined) {
    listOfStudents = allStudents;
  } else {
    listOfStudents = filteredList;
  }

  let index = listOfStudents.findIndex(student => student.id === id);

  if (listOfIds.includes(listOfStudents[index].id)) {
    console.log("INCLUDES");
  } else {
    squadList.push(listOfStudents[index]);
  }
  squadList.forEach(student => {
    listOfIds.push(student.id);
  });

  console.log(listOfIds);

  showSquad();
}

function checkSquad(id) {}

function showSquad() {
  document.querySelector("body > table.squad-list > tbody").textContent = "";

  squadList.forEach(showSingleSquadMember);
}

function showSingleSquadMember(student) {
  const copy3 = squadTemplate.cloneNode(true);

  copy3.querySelector(".student_name").innerHTML = student.fullname;
  copy3.querySelector(".student_house").innerHTML = student.house;
  copy3.querySelector(".blood_type").innerHTML = student.bloodtype;

  copy3.querySelector(".details-button").dataset.id = student.id;

  if (student.house == "Hufflepuff") {
    copy3.querySelector(".student").classList.add("hufflepuff");
  } else if (student.house == "Gryffindor") {
    copy3.querySelector(".student").classList.add("gryffindor");
  } else if (student.house == "Ravenclaw") {
    copy3.querySelector(".student").classList.add("ravenclaw");
  } else if (student.house == "Slytherin") {
    copy3.querySelector(".student").classList.add("sltyherin");
  }

  document.querySelector("body > table.squad-list > tbody").appendChild(copy3);
}

//MODAL

function showDetails(event) {
  event.preventDefault();
  const action = event.target.dataset.action;
  let id = event.target.dataset.id;

  if (action === "details") {
    event.preventDefault();
    showDetailsById(id);
  }
  if (action === "removed-details") {
    event.preventDefault();
    showRemovedDetailsById(id);
  }
}

function showRemovedDetails(event) {
  event.preventDefault();
  let id = event.target.dataset.id;
  showRemovedDetailsById(id);
}

function showRemovedDetailsById(id) {
  let index = removedStudents.findIndex(student => student.id === id);
  //console.log(index);

  document.querySelector(".modal-name").textContent =
    removedStudents[index].fullname;
  document.querySelector(".modal-img").src =
    "images/" + removedStudents[index].imageSource;

  document.querySelector(".modal-house").textContent =
    removedStudents[index].house;

  document.querySelector(".modal-bloodtype").textContent =
    removedStudents[index].bloodtype;

  document.querySelector(".modal-crest").src =
    "images/crests/" + removedStudents[index].house + ".png";

  modal.style.width = "25%";
  modal.style.opacity = "1";

  document.querySelector(".close-modal").addEventListener("click", () => {
    modal.style.width = "0%";
    modal.style.opacity = "0";
  });
}

function showDetailsById(id) {
  let listOfStudents;
  if (filteredList.exist == undefined) {
    listOfStudents = allStudents;
  } else {
    listOfStudents = filteredList;
  }
  let index = listOfStudents.findIndex(student => student.id === id);
  //console.log(index);

  document.querySelector(".modal-name").textContent =
    listOfStudents[index].fullname;
  console.log(listOfStudents[index]);
  document.querySelector(".modal-img").src =
    "images/" + listOfStudents[index].imageSource;

  document.querySelector(".modal-crest").src =
    "images/crests/" + listOfStudents[index].house + ".png";

  document.querySelector(".modal-house").textContent =
    listOfStudents[index].house;

  document.querySelector(".modal-bloodtype").textContent =
    listOfStudents[index].bloodtype;

  modal.style.width = "25%";
  modal.style.opacity = "1";

  document.querySelector(".close-modal").addEventListener("click", () => {
    modal.style.width = "0%";
    modal.style.opacity = "0";
  });
}

function clickRemove(event) {
  event.preventDefault();
  let id = event.target.dataset.id;

  if (id == "d9566a45-c962-4def-8a4a-877e938959fc") {
    console.log("ANYÁD");
  } else {
    removeById(id);
  }
  showStudents();
}

function removeById(id) {
  let listOfStudents;
  if (filteredList.exist == undefined) {
    listOfStudents = allStudents;
  } else {
    listOfStudents = filteredList;
  }

  let index = listOfStudents.findIndex(student => student.id === id);
  removedStudents.push(listOfStudents[index]);
  showRemovedStudents();
  listOfStudents.splice(index, 1);
}

function showRemovedStudents() {
  document.querySelector("body > table.removed-list > tbody").textContent = "";

  document.querySelector(".removed-list").insertRow(0);

  removedStudents.forEach(showSingleRemovedStudent);
}

function showSingleRemovedStudent(student) {
  const copy2 = removedTemplate.cloneNode(true);

  copy2.querySelector(".student_name").innerHTML = student.fullname;
  copy2.querySelector(".student_house").innerHTML = student.house;
  copy2.querySelector(".blood_type").innerHTML = student.bloodtype;

  copy2.querySelector(".details-button").dataset.id = student.id;
  copy2.querySelector(".squad-button").dataset.id = student.id;

  if (student.house == "Hufflepuff") {
    copy2.querySelector(".student").classList.add("hufflepuff");
  } else if (student.house == "Gryffindor") {
    copy2.querySelector(".student").classList.add("gryffindor");
  } else if (student.house == "Ravenclaw") {
    copy2.querySelector(".student").classList.add("ravenclaw");
  } else if (student.house == "Slytherin") {
    copy2.querySelector(".student").classList.add("sltyherin");
  }

  document
    .querySelector("body > table.removed-list > tbody")
    .appendChild(copy2);
}

function showStudents() {
  if (filteredList.exist == undefined) {
    document.querySelector(".student-list-body").innerHTML = "";
    allStudents.forEach(showSingleStudent);
  } else {
    document.querySelector(".student-list-body").innerHTML = "";
    filteredList.forEach(showSingleStudent);
  }
}

function showSingleStudent(student) {
  const copy = myTemplate.cloneNode(true);

  copy.querySelector(".student_name").innerHTML = student.fullname;
  copy.querySelector(".student_house").innerHTML = student.house;
  copy.querySelector(".blood_type").innerHTML = student.bloodtype;

  copy.querySelector(".remove-button").dataset.id = student.id;
  copy.querySelector(".details-button").dataset.id = student.id;
  copy.querySelector(".squad-button").dataset.id = student.id;

  //ADD CLASS FOR STYLING

  if (student.house == "Hufflepuff") {
    copy.querySelector(".student").classList.add("hufflepuff");
  } else if (student.house == "Gryffindor") {
    copy.querySelector(".student").classList.add("gryffindor");
  } else if (student.house == "Ravenclaw") {
    copy.querySelector(".student").classList.add("ravenclaw");
  } else if (student.house == "Slytherin") {
    copy.querySelector(".student").classList.add("sltyherin");
  }

  document.querySelector(".student-list-body").appendChild(copy);
}

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
