"use strict";

const myTemplate = document.querySelector("#myTemplate").content;
const student_name = document.querySelector(".student_name");
const link = "http://petlatkea.dk/2019/hogwarts/students.json";
//var student = document.querySelector(".student");
let jsonData;
let allStudents = new Array();
let student;
let currentFilter = "Hufflepuff";
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
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach(jsonObject => {
    //create new object
    student = Object.create(jsonObject);

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

function onlyHufflepuff(i) {
  allStudents.forEach(function(student) {
    if (student.house === "Hufflepuff") {
      console.log("true");
      return true;
    } else {
      console.log("false");
      return false;
    }
  });
}

function filterList() {
  const filteredList = allStudents.filter(
    student => student.house === "Hufflepuff"
  );
  console.log(filteredList);
}

filterList();

function sortList() {}

function showStudents(studentList) {
  studentList.forEach(showSingleStudent);
}

function showSingleStudent(student) {
  const copy = myTemplate.cloneNode(true);

  copy.querySelector(".student_name").innerHTML = student.fullname;
  copy.querySelector(".student_house").innerHTML = student.house;

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
