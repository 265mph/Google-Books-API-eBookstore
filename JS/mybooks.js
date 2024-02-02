//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//CLOSING THE RESULTS POP-UP

const favLink = document.getElementById("fav-link");
const bookmarkLink = document.getElementById("bookmark-link");
const readLink = document.getElementById("read-link");

favLink.addEventListener("click", () => {
  document.querySelector(".fav-section").style.display = "flex";
  document.querySelector(".bookmark-section").style.display = "none";
  document.querySelector(".read-section").style.display = "none";

  favLink.style.color = "#ea6258";
  readLink.style.color = "#002c83;";
  bookmarkLink.style.color = "#002c83";
});

bookmarkLink.addEventListener("click", () => {
  document.querySelector(".fav-section").style.display = "none";
  document.querySelector(".bookmark-section").style.display = "flex";
  document.querySelector(".read-section").style.display = "none";

  bookmarkLink.style.color = "#ea6258";
  favLink.style.color = "#002c83";
  readLink.style.color = "#002c83";
});

readLink.addEventListener("click", () => {
  document.querySelector(".fav-section").style.display = "none";
  document.querySelector(".bookmark-section").style.display = "none";
  document.querySelector(".read-section").style.display = "flex";

  readLink.style.color = "#ea6258";
  bookmarkLink.style.color = "#002c83";
  favLink.style.color = "#002c83";
});

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//LOGGING OUT
const logout = () => {
  localStorage.removeItem("user_id");
  localStorage.removeItem("user_pass");
  localStorage.removeItem("confirm_pass");
  window.location.href = "landing.html";
};
