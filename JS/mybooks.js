//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//LOGGING OUT
const logout = () => {
  localStorage.removeItem("user_id");
  localStorage.removeItem("user_pass");
  localStorage.removeItem("confirm_pass");
  window.location.href = "landing.html";
};




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
//FUNCTION TO RETREIVE BOOKS FROM STORAGE & DISPLAY IN BOOKMARKS
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
      <button class="remove-bookmark" data-isbn="${book.id}">Remove</button>
    `
    ;

    const removeButton = bookDiv.querySelector('.remove-bookmark');
    removeButton.addEventListener('click', () => {
      const isbn = removeButton.getAttribute('data-isbn');
      removeBookmark(isbn);
    })
    
    document.getElementById('bookmarkbooks-container').appendChild(bookDiv);
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//FUNCTION TO REMOVE A BOOKS FROM BOOKMARKS
const removeBookmark = (isbn) => {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  
  // Filter out the bookmark with the provided ISBN
  bookmarks = bookmarks.filter(book => book.id !== isbn);
  
  // Update the bookmarks in local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  
  window.location.reload();
}

displayBookmarks();




//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//FUNCTION TO RETREIVE BOOKS FROM STORAGE & DISPLAY IN FAVOURITES
const displayFavourites = () => {
  const favourites = JSON.parse(localStorage.getItem('favourites')) || [];


  favourites.forEach(book => {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'saved-book';
    bookDiv.innerHTML = 
    `
      <img src="${book.thumbnail}" alt="Book Cover">
      <h4>${book.title}</h4>
      <p>${book.author}</p>
      <a href="${book.previewLink}" target="_blank">Read Book</a>
      <button class="remove-bookmark" data-isbn="${book.id}">Remove</button>
    `
    ;

    const removeButton = bookDiv.querySelector('.remove-bookmark');
    removeButton.addEventListener('click', () => {
      const isbn = removeButton.getAttribute('data-isbn');
      removeFavbook(isbn);
    })
    
    document.getElementById('favbooks-container').appendChild(bookDiv);
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//FUNCTION TO REMOVE A BOOKS FROM FVOURITES
const removeFavbook = (isbn) => {
  let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
  
  // Filter out the bookmark with the provided ISBN
  favourites = favourites.filter(book => book.id !== isbn);
  
  // Update the bookmarks in local storage
  localStorage.setItem('favourites', JSON.stringify(favourites));
  
  window.location.reload();
}

displayFavourites();