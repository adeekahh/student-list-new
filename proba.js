function show(plist) {
  plist.forEach(product => {
    const parent = document.querySelector("#" + product.category);
    const clone = template.cloneNode(true);
    clone.querySelector("h2").textContent = product.name;
    clone.querySelector(".short-description").textContent =
      product.shortdescription;
    clone.querySelector(".price").textContent = product.price + " kr. ";
    clone.querySelector("button").addEventListener("click", () =>
      fetch(pLink + product.id)
        .then(promise => promise.json())
        .then(data => showDetails(data))
    );

    clone.querySelector("img").src =
      imgbase + "medium/" + product.image + "-md.jpg";
    //discount-animation
    if (product.discount == 0) {
      clone.querySelector(".discount-anim").style.display = "none";
    }
    //soldout
    if (product.soldout == false) {
      clone.querySelector(".soldout-anim").style.display = "none";
    }
    //vegetarian
    if (product.vegetarian) {
      clone.querySelector(".vegetarian-label").innerHTML = "&#x2714;";
    } else {
      clone.querySelector(".vegetarian-label").innerHTML = "&#10006;";
      clone.querySelector(".vegetarian-label").style.color = "red";
    }
    //discount price + sizes
    //if there is a discount make normal price smaller and the discount price bigger
    if (product.discount) {
      const newPrice = Math.round(
        product.price - (product.price * product.discount) / 100
      );
      //	 console.log(newPrice);
      clone.querySelector(".price").style.fontSize = "16px";
      clone.querySelector(".discount-price").textContent = newPrice + " kr. ";
      clone.querySelector(".discount-price").style.fontSize = "2em";
    } else {
      clone.querySelector(".discount-price").style.display = "none";
      clone.querySelector(".price").style.textDecoration = "none";
    }
    parent.appendChild(clone);
  });
}

function showDetails(product) {
  console.log(product.longdescription);

  modal.querySelector("h2").textContent = product.name;
  modal.querySelector("img").src =
    imgbase + "medium/" + product.image + "-md.jpg";
  modal.querySelector("p").textContent = product.longdescription;
  modal.classList.remove("hide");
}
function show(plist) {
  plist.forEach(product => {
    const parent = document.querySelector("#" + product.category);
    const clone = template.cloneNode(true);
    clone.querySelector("h2").textContent = product.name;
    clone.querySelector(".short-description").textContent =
      product.shortdescription;
    clone.querySelector(".price").textContent = product.price + " kr. ";
    clone.querySelector("button").addEventListener("click", () =>
      fetch(pLink + product.id)
        .then(promise => promise.json())
        .then(data => showDetails(data))
    );

    clone.querySelector("img").src =
      imgbase + "medium/" + product.image + "-md.jpg";
    //discount-animation
    if (product.discount == 0) {
      clone.querySelector(".discount-anim").style.display = "none";
    }
    //soldout
    if (product.soldout == false) {
      clone.querySelector(".soldout-anim").style.display = "none";
    }
    //vegetarian
    if (product.vegetarian) {
      clone.querySelector(".vegetarian-label").innerHTML = "&#x2714;";
    } else {
      clone.querySelector(".vegetarian-label").innerHTML = "&#10006;";
      clone.querySelector(".vegetarian-label").style.color = "red";
    }
    //discount price + sizes
    //if there is a discount make normal price smaller and the discount price bigger
    if (product.discount) {
      const newPrice = Math.round(
        product.price - (product.price * product.discount) / 100
      );
      //	 console.log(newPrice);
      clone.querySelector(".price").style.fontSize = "16px";
      clone.querySelector(".discount-price").textContent = newPrice + " kr. ";
      clone.querySelector(".discount-price").style.fontSize = "2em";
    } else {
      clone.querySelector(".discount-price").style.display = "none";
      clone.querySelector(".price").style.textDecoration = "none";
    }
    parent.appendChild(clone);
  });
}

function showDetails(product) {
  console.log(product.longdescription);

  modal.querySelector("h2").textContent = product.name;
  modal.querySelector("img").src =
    imgbase + "medium/" + product.image + "-md.jpg";
  modal.querySelector("p").textContent = product.longdescription;
  modal.classList.remove("hide");
}
