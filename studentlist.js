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
  event.preventDefault(event);

  if (action === "remove") {
    clickRemove(event);
  } else if (action === "details") {
    showDetails(event);
  } else if (action === "removed-details") {
    //console.log("removed details");

    //sometimes randomly refreshes the browser window
    showDetails(event);
  } else if (action === "squad") {
    addToSquad(event);
  } else if (action === "removed-squad") {
    addToSquadRemoved(event);
  } else if (action === "squad-details") {
    showSquadDetails(event);
  } else if (action === "squad-remove") {
    removeFromSquad(event);
  }
}

//REMOVE FROM SQUAD
function removeFromSquad(event) {
  let id = event.target.dataset.id;

  removeFromSquadById(id);
  showSquad();
}

function removeFromSquadById(id) {
  let index = removedStudents.findIndex(student => student.id === id);

  let idIndex = listOfIds.findIndex(student => student.id === id);

  listOfIds.splice(index, 1);
  squadList.splice(index, 1);
}

//ADD TO SQUAD
function addToSquadRemoved(event) {
  event.preventDefault();
  let id = event.target.dataset.id;

  addToSquadByIdRemoved(id);

  showStudents();
}

function addToSquadByIdRemoved(id) {
  let index = removedStudents.findIndex(student => student.id === id);

  if (listOfIds.includes(removedStudents[index].id)) {
    console.log("INCLUDES");
  } else {
    if (
      removedStudents[index].house == "Slytherin" ||
      removedStudents[index].bloodtype == "pure-blood"
    ) {
      squadList.push(removedStudents[index]);
    } else {
      alert(
        "Can't add to Inquisitorial Squad. Try to add a pure-blood student or a student from the Slytherin House"
      );
    }
  }
  squadList.forEach(student => {
    listOfIds.push(student.id);
  });

  console.log(listOfIds);

  showSquad();
}

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
    alert("Student already assigned to Inquisitorial Squad.");
  } else {
    if (
      listOfStudents[index].house == "Slytherin" ||
      listOfStudents[index].bloodtype == "pure-blood"
    ) {
      squadList.push(listOfStudents[index]);
    } else {
      alert(
        "Cant add to Inquisitorial Squad. Try to add a pure-blood student or a student from Slytherin House"
      );
    }
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
  document.querySelector(".squad-counter").innerHTML = "";

  squadList.forEach(showSingleSquadMember);
}

function showSingleSquadMember(student) {
  const copy3 = squadTemplate.cloneNode(true);

  document.querySelector(".squad-counter").innerHTML =
    "(" + squadList.length + ")";

  copy3.querySelector(".student_name").innerHTML = student.fullname;
  copy3.querySelector(".student_house").innerHTML = student.house;
  copy3.querySelector(".blood_type").innerHTML = student.bloodtype;
  copy3.querySelector(".student").classList.add("squad-member");

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
function showSquadDetails(event) {
  event.preventDefault();
  let id = event.target.dataset.id;
  event.preventDefault();
  showSquadDetailsById(id);
}
function showSquadDetailsById(id) {
  let index = squadList.findIndex(student => student.id === id);
  //console.log(index);
  if (listOfIds.includes(squadList[index].id)) {
    document.querySelector(".squad-status").innerHTML = "ASSIGNED";
    document.querySelector(".squad-status").style.color = "green";
  } else {
    document.querySelector(".squad-status").innerHTML = "NOT ASSIGNED";
    document.querySelector(".squad-status").style.color = "red";
  }

  document.querySelector(".modal-name").textContent = squadList[index].fullname;
  console.log(squadList[index]);
  document.querySelector(".modal-img").src =
    "images/" + squadList[index].imageSource;

  document.querySelector(".modal-crest").src =
    "images/crests/" + squadList[index].house.toLowerCase() + ".png";

  document.querySelector(".modal-house").textContent = squadList[index].house;

  document.querySelector(".modal-bloodtype").textContent =
    squadList[index].bloodtype;

  modal.style.width = "25%";
  modal.style.opacity = "1";

  document.querySelector(".close-modal").addEventListener("click", () => {
    modal.style.width = "0%";
    modal.style.opacity = "0";
  });
}

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

  if (listOfIds.includes(removedStudents[index].id)) {
    document.querySelector(".squad-status").innerHTML = "ASSIGNED";
    document.querySelector(".squad-status").style.color = "green";
  } else {
    document.querySelector(".squad-status").innerHTML = "NOT ASSIGNED";
    document.querySelector(".squad-status").style.color = "red";
  }

  document.querySelector(".modal-name").textContent =
    removedStudents[index].fullname;
  document.querySelector(".modal-img").src =
    "images/" + removedStudents[index].imageSource;

  document.querySelector(".modal-house").textContent =
    removedStudents[index].house;

  document.querySelector(".modal-bloodtype").textContent =
    removedStudents[index].bloodtype;

  document.querySelector(".modal-crest").src =
    "images/crests/" + removedStudents[index].house.toLowerCase() + ".png";

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

  if (listOfIds.includes(listOfStudents[index].id)) {
    document.querySelector(".squad-status").innerHTML = "ASSIGNED";
    document.querySelector(".squad-status").style.color = "green";
  } else {
    document.querySelector(".squad-status").innerHTML = "NOT ASSIGNED";
    document.querySelector(".squad-status").style.color = "red";
  }

  document.querySelector(".modal-name").textContent =
    listOfStudents[index].fullname;
  console.log(listOfStudents[index]);
  document.querySelector(".modal-img").src =
    "images/" + listOfStudents[index].imageSource;

  document.querySelector(".modal-crest").src =
    "images/crests/" + listOfStudents[index].house.toLowerCase() + ".png";

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
    alert("SORRY I CAN'T LET YOU DO THAT AT ALL!!");
    hackTheSystem();
    hackTheSquad();
  } else {
    removeById(id);
  }
  showStudents();
}

function hackTheSystem() {
  let listOfStudents;
  if (filteredList.exist == undefined) {
    listOfStudents = allStudents;
  } else {
    listOfStudents = filteredList;
  }

  listOfStudents.forEach(student => {
    if (student.bloodtype === "muggle" || student.bloodtype === "half-blood") {
      student.bloodtype = "pure-blood";
    } else {
      //https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
      let randomNumber = Math.floor(Math.random() * (10 - 0 + 1)) + 0;

      if (randomNumber >= 5) {
        student.bloodtype = "half-blood";
      } else {
        student.bloodtype = "muggle";
      }
    }
  });

  removedStudents.forEach(student => {
    if (student.bloodtype === "muggle" || student.bloodtype === "half-blood") {
      student.bloodtype = "pure-blood";
    } else {
      //https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
      let randomNumber = Math.floor(Math.random() * (10 - 0 + 1)) + 0;

      if (randomNumber >= 5) {
        student.bloodtype = "half-blood";
      } else {
        student.bloodtype = "muggle";
      }
    }
  });

  showRemovedStudents();

  squadList.forEach(student => {
    if (student.bloodtype === "muggle" || student.bloodtype === "half-blood") {
      student.bloodtype = "pure-blood";
    } else {
      //https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
      let randomNumber = Math.floor(Math.random() * (10 - 0 + 1)) + 0;

      if (randomNumber >= 5) {
        student.bloodtype = "half-blood";
      } else {
        student.bloodtype = "muggle";
      }
    }
  });

  showSquad();
}
//sometimes runs randomly when opening inspector in chrome
function hackTheSquad() {
  //https://stackoverflow.com/questions/17246275/settimeout-and-array-each
  var offset = 0;
  squadList.forEach(function(person) {
    setTimeout(function() {
      squadList.pop();
      showSquad();
    }, 2000 + offset);
    offset += 2000;
  });
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

  let listOfStudents;
  if (filteredList.exist == undefined) {
    listOfStudents = allStudents;
  } else {
    listOfStudents = filteredList;
  }

  document.querySelector(".student-counter").innerHTML =
    "(" + listOfStudents.length + ")";

  document.querySelector(".removed-student-counter").innerHTML =
    "(" + removedStudents.length + ")";

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

  let listOfStudents;
  if (filteredList.exist == undefined) {
    listOfStudents = allStudents;
  } else {
    listOfStudents = filteredList;
  }

  document.querySelector(".student-counter").innerHTML =
    "(" + listOfStudents.length + ")";

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
