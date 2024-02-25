//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//LOGGING OUT FROM WEBSITE
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
      <a target="_blank" href="" class="read-bookmark">Read Book</a>
      <button class="remove-bookmark" data-isbn="${book.id}">Remove</button>
    `
    ;


    //function to read a bookmarked book
    const readBookmark = bookDiv.querySelector('.read-bookmark');
    readBookmark.addEventListener('click', () => {
      let bookISBN = book.id;
      let viewerUrl = 'bookreader.html?isbn='+bookISBN;
      readBookmark.href = viewerUrl
    })

    // Function to remove books from bookmarks
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
      <a href="" class="read-fav" target="_blank" >Read Book</a>
      <button class="remove-bookmark" data-isbn="${book.id}">Remove</button>
    `
    ;


    // Function to read book in FAVOURITES
    const readFavbook = bookDiv.querySelector('.read-fav');
    readFavbook.addEventListener('click', () => {
      let bookISBN = book.id;
      let viewerUrl = 'bookreader.html?isbn='+bookISBN;
      readFavbook.href = viewerUrl
    })

    // Function to remove books from FAVOURITES
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
//FUNCTION TO REMOVE A BOOKS FROM FAVOURITES
const removeFavbook = (isbn) => {
  let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
  
  // Filter out the bookmark with the provided ISBN
  favourites = favourites.filter(book => book.id !== isbn);
  
  // Update the bookmarks in local storage
  localStorage.setItem('favourites', JSON.stringify(favourites));
  
  window.location.reload();
}

displayFavourites();




//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//FUNCTION TO RETREIVE BOOKS FROM STORAGE & DISPLAY IN READ
const displayReadBooks = () => {
  const readBooks = JSON.parse(localStorage.getItem('booksread')) || [];


  readBooks.forEach(book => {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'saved-book';
    bookDiv.innerHTML = 
    `
      <img src="${book.thumbnail}" alt="Book Cover">
      <h4>${book.title}</h4>
      <p>${book.author}</p>
      <a href="" class="read-book" target="_blank" >Read Book</a>
      <button class="remove-read" data-isbn="${book.id}">Remove</button>
    `
    ;


    // Function to read book in READ
    const readbook = bookDiv.querySelector('.read-book');
    readbook.addEventListener('click', () => {
      let bookISBN = book.id;
      let viewerUrl = 'bookreader.html?isbn='+bookISBN;
      readbook.href = viewerUrl
    })

    // Function to remove books from READ
    const removeButton = bookDiv.querySelector('.remove-read');
    removeButton.addEventListener('click', () => {
      const isbn = removeButton.getAttribute('data-isbn');
      removeReadbook(isbn);
    })
    
    document.getElementById('readbooks-container').appendChild(bookDiv);
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//FUNCTION TO REMOVE A BOOKS FROM READ
const removeReadbook = (isbn) => {
  let readBooks = JSON.parse(localStorage.getItem('booksread')) || [];
  
  // Filter out the read with the provided ISBN
  readBooks = readBooks.filter(book => book.id !== isbn);
  
  // Update the read in local storage
  localStorage.setItem('readBooks', JSON.stringify(readBooks));
  
  window.location.reload();
}

displayReadBooks();