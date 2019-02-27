"use strict";

const myTemplate = document.querySelector("#myTemplate").content;
const student_name = document.querySelector(".student_name");
const link = "http://petlatkea.dk/2019/hogwarts/students.json";
//var student = document.querySelector(".student");
let jsonData;
let allStudents = new Array();
let filteredList = new Array();

let currentFilter = null;
let firstname, lastname;

window.addEventListener("DOMContentLoaded", init());

function init() {
  loadJSON();
}

function loadJSON() {
  fetch(link)
    .then(res => res.json())
    .then(jsonData => {
      //prepare objects
      prepareObjects(jsonData);
      showStudents();
    });
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
    //    student.fullname = student.fullname;

    //store data in a global array
    allStudents.push(student);
  });
}

/*FILTERING*/
/*MAKE BUTTONS FILTER*/
function filterAll() {
  filteredList = allStudents;
  console.log(filteredList);
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
  showStudents();
}

function sortByFirstName() {
  if (filteredList.length == 0) {
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
  if (filteredList.length == 0) {
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
  if (filteredList.length == 0) {
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

function showStudents() {
  if (filteredList.length == 0) {
    document.querySelector(".student-list").innerHTML = "";
    allStudents.forEach(showSingleStudent);
  } else {
    document.querySelector(".student-list").innerHTML = "";
    filteredList.forEach(showSingleStudent);
  }
}

function showSingleStudent(student) {
  const copy = myTemplate.cloneNode(true);

  copy.querySelector(".student_name").innerHTML = student.fullname;
  copy.querySelector(".student_house").innerHTML = student.house;

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

  document.querySelector(".student-list").appendChild(copy);
}
