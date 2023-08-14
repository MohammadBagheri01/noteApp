function _id(id) {
  return document.getElementById(id);
}
function _class(className) {
  return document.getElementsByClassName(className);
}
function _queryAll(clas) {
  return document.querySelectorAll(clas);
}
let input = _id("inp");
let colors = _queryAll(".colors");
let colorsDiv = _queryAll(".colors-div");
let spanAdd = _id("span-add");
let spanRemove = _id("span-remove");
let boxs = _id("boxs");
let closeAll = _id("span-closeAll");
let box;
let editt;
let closeIcon;
let boxTxt;
let tik;
let sure = _id("sure");
let yesBtn = _id("yes-btn");
let noBtn = _id("no-btn");

colorsDiv[0].addEventListener("mouseenter", () => {
  colors.forEach((color) => {
    if (color.id != "beige") {
      color.style.marginLeft = "0";
    }
  });
});
colorsDiv[0].addEventListener("mouseleave", () => {
  colors.forEach((color) => {
    if (color.id != "beige") {
      color.style.marginLeft = "-2.5rem";
    }
  });
});

colors.forEach((color) => {
  color.addEventListener("click", function (event) {
    input.style.backgroundColor = event.target.id;
  });
});
spanRemove.addEventListener("click", function () {
  input.value = "";
});
let textInput = input.value;
let BGInput = input.style.backgroundColor;
input.addEventListener("keydown", function (event) {
  if (event.keyCode == 13) {
    if (input.value == "") {
      alert("write note...");
    } else {
      let textInput = input.value;
      let BGInput = input.style.backgroundColor;
      contoroler(textInput, BGInput);
    }
  }
});
spanAdd.addEventListener("click", () => {
  if (input.value == "") {
    alert("write note...");
  } else {
    let textInput = input.value;
    let BGInput = input.style.backgroundColor;
    contoroler(textInput, BGInput);
  }
});
closeAll.addEventListener("click", () => {
  boxs.innerHTML = "";
});
function contoroler(text, bg) {
  box = document.createElement("div");
  box.classList.add("box");
  box.style.backgroundColor = bg;
  boxTxt = document.createElement("p");
  boxTxt.classList.add("box-text");
  boxTxt.innerHTML = text;
  closeIcon = document.createElement("i");
  closeIcon.setAttribute("class", "fa fa-close");
  closeIcon.classList.add("close");
  closeIcon.addEventListener("click", (thiss) => {
    sure.style.top = "1%";
    noBtn.addEventListener("click", () => {
      sure.style.top = "-100%";
    });
    yesBtn.addEventListener("click", () => {
      sure.style.top = "-100%";
      thiss.target.parentElement.remove();
    });
  });

  editt = document.createElement("i");
  editt.setAttribute("class", "fa fa-pencil");
  editt.classList.add("edit");
  editt.addEventListener("click", (thiss) => {
    input.value =
      thiss.target.previousElementSibling.previousElementSibling.innerHTML;
    thiss.target.nextElementSibling.style.display = "block";
  });
  tik = document.createElement("i");
  tik.setAttribute("class", "fa fa-check");
  tik.classList.add("tik");
  tik.addEventListener("click", (thiss) => {
    thiss.target.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML =
      "";
    thiss.target.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML =
      input.value;
    thiss.target.style.display = "none";
    input.value = "";
  });
  boxs.append(box);
  box.append(boxTxt, closeIcon, editt, tik);
  input.value = "";
  input.focus();
}
let boxTxts = _class("box-text");
let boxBG;
let b = _id("bbb");
let texArray = [];
window.addEventListener("unload", () => {
  Array.from(boxTxts).forEach((e) => {
    boxBG = e.parentElement.style.backgroundColor;
    if (boxBG == "") {
      boxBG = "beige";
    }
    texArray.push({
      text: e.innerHTML,
      bg: boxBG,
    });
  });
  localStorage.setItem("text-boxs", JSON.stringify(texArray));
});
window.addEventListener("DOMContentLoaded", () => {
  let boxArray = JSON.parse(localStorage.getItem("text-boxs"));
  boxArray.forEach((e) => {
    contoroler(e.text, e.bg);
  });
});
