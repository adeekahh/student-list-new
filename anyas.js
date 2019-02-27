var cars = [
  { type: "Fiat", model: "500", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Porsche", model: "911", color: "white" },
  { type: "Ferrari", model: "LaFerrari", color: "red" }
];

function filterList() {
  const filteredList = cars.filter(car => car.type === "Porsche");
  console.log(cars);
}

filterList();
