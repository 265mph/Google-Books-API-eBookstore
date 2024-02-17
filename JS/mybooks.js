//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//BOOKSHELF SECTION VISIBILITY & STYLING

const favLink = document.getElementById("fav-link");
const bookmarkLink = document.getElementById("bookmark-link");
const readLink = document.getElementById("read-link");

favLink.addEventListener("click", () => {
  document.querySelector(".fav-section").style.display = "block";
  document.querySelector(".bookmark-section").style.display = "none";
  document.querySelector(".read-section").style.display = "none";

  favLink.style.background = '#dddee5'
  bookmarkLink.style.background = 'none'
  readLink.style.background = 'none'
});

if (document.querySelector(".fav-section").style.display = "block") {
  favLink.style.background = '#dddee5'
}


bookmarkLink.addEventListener("click", () => {
  document.querySelector(".fav-section").style.display = "none";
  document.querySelector(".bookmark-section").style.display = "block";
  document.querySelector(".read-section").style.display = "none";

  bookmarkLink.style.background = '#dddee5'
  favLink.style.background = 'none'
  readLink.style.background = 'none'
});


readLink.addEventListener("click", () => {
  document.querySelector(".fav-section").style.display = "none";
  document.querySelector(".bookmark-section").style.display = "none";
  document.querySelector(".read-section").style.display = "block";

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



const displayBookmarks = () => {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];


  bookmarks.forEach(book => {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'saved-book';
    bookDiv.innerHTML = 
    `
      <img src="${book.thumbnail}" alt="Book Cover">
      <h4>${book.title}</h4>
      <p>${book.author}</p>
      <a href="${book.previewLink}" target="_blank">Read Book</a>
    `
    ;

    // Append the bookmark div to the bookmarks container
    document.getElementById('bookmarkbooks-container').appendChild(bookDiv);
  });
}

displayBookmarks();