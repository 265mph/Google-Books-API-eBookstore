//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//BOOKSHELF SECTION VISIBILITY & STYLING

const favLink = document.getElementById("fav-link");
const bookmarkLink = document.getElementById("bookmark-link");
const readLink = document.getElementById("read-link");

favLink.addEventListener("click", () => {
  document.querySelector(".fav-section").style.display = "flex";
  document.querySelector(".bookmark-section").style.display = "none";
  document.querySelector(".read-section").style.display = "none";

  favLink.style.background = '#dddee5'
  bookmarkLink.style.background = 'none'
  readLink.style.background = 'none'
});

if (document.querySelector(".fav-section").style.display = "flex") {
  favLink.style.background = '#dddee5'
}


bookmarkLink.addEventListener("click", () => {
  document.querySelector(".fav-section").style.display = "none";
  document.querySelector(".bookmark-section").style.display = "flex";
  document.querySelector(".read-section").style.display = "none";

  bookmarkLink.style.background = '#dddee5'
  favLink.style.background = 'none'
  readLink.style.background = 'none'
});


readLink.addEventListener("click", () => {
  document.querySelector(".fav-section").style.display = "none";
  document.querySelector(".bookmark-section").style.display = "none";
  document.querySelector(".read-section").style.display = "flex";

  readLink.style.background = '#dddee5'
  favLink.style.background = 'none'
  bookmarkLink.style.background = 'none'
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
