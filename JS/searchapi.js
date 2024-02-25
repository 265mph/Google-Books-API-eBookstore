//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//CLOSING THE RESULTS POP-UP

// Function to close the Search modal
const closeSearch = () => {
  document.querySelector(".results-bg").style.visibility = "hidden"
  document.getElementById("search-word").value = ""
};




//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//SEARCHING BY PRESSING ENTER
document.getElementById("search-word").addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    searchFunc()
  }
})




//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//WORKING WITH API & SEARCHING

// Using Fetch API to get info. from the API
const apiKey = "AIzaSyDJgJDIocYpDLp3V5bQXFt7AjV2LTmldCA";

const searchFunc = () => {
  let searchKeyword = document.getElementById("search-word").value;

  if (searchKeyword === "") {
    alert("Please enter a search keyword")
  } 
  else {
    document.getElementById("result-info").innerHTML = `Result for "${searchKeyword}"`;
    document.querySelector(".results-bg").style.visibility = "visible";
    document.querySelector(".results-bg").style.opacity = "1";

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchKeyword}&key=${apiKey}&startIndex=0&maxResults=40`)
    .then((response) => {
        console.log('successful', response)
        return response.json();
    })
    .then((data) => {
        console.log(data);
        displayBooks(data);
    })
    .catch((error) => {
        console.log('failed', error);
        alert('Please check your connection');
    })
  }
};




//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//DISPLAYING THE RESULTS

// Function to count words in the book description & shorten it 
function countWords(str) {
  if (!str) {
    return 0;
  }
  const arr = str.split(" ");
  return arr.filter(word => word !== '').length;
}

// Function to display the results gotten from the API in HTML
const displayBooks = (data) => {
  let resultContainer = document.querySelector(".result-output");
  let imgPlaceholder = 'IMG/book-cover-placeholder.png'
  resultContainer.innerHTML = '';

  if (data.items && data.items.length > 0) {
    data.items.forEach(item => {
      const industryIdentifiers = item.volumeInfo.industryIdentifiers || [];
      const isbnObject = industryIdentifiers.find(identifier => identifier.type === 'ISBN_13' || identifier.type === 'ISBN_10');
      const bookISBN = isbnObject ? isbnObject.identifier : 'ISBN not available';
      const bookThumbnail = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : imgPlaceholder;
      const bookTitle = item.volumeInfo.title;
      const bookAuthor = item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Authors';
      const bookDescription = item.volumeInfo.description ? item.volumeInfo.description : 'No Book description';
      const longDescription = (countWords(bookDescription) > 30);

  
      let bookLink = document.createElement('div');
      bookLink.className = 'book-div'
      bookLink.innerHTML = 
      `
        <div>
          <img src="${bookThumbnail}">
        </div>
        <div class="book-div-info">
          <h4>${bookTitle}</h4>
          <p>Authors: ${bookAuthor}</p>
       
          <p>${longDescription ? bookDescription.substring(0, 200) + '... <a href="#">See more</a>' : bookDescription}</p>

          <button class="show-details-btn">Show Details</button>
        </div>
      `
      
      let showDetailsButton = bookLink.querySelector('.show-details-btn');
      showDetailsButton.addEventListener('click', function() {
        document.getElementById('popup-title').innerHTML = bookTitle;
        document.getElementById('popup-author').innerHTML = bookAuthor;
        document.getElementById('popup-desc').innerHTML = bookDescription;
        document.getElementById('popup-isbn').innerHTML = bookISBN;
        document.getElementById('popup-thumbnail').src = bookThumbnail;
        
        
        document.querySelector('.view-details').style.visibility = 'visible';
        document.querySelector('.view-details').style.opacity = '1';

      });

      resultContainer.appendChild(bookLink);
    });
  } else {
    resultContainer.innerHTML = `<h2 style='text-align = center'>no results found</h2>`
  }
}



//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//VIEW BOOK FUNCTION

// Function that closes the viewBookDetails modal
const closeBookDetails = () => {
  document.querySelector('.view-details').style.visibility = 'hidden';
  document.querySelector('.view-details').style.opacity = '0';
}




//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//STORING BOOKMARKED BOOK TO LOCAL STORAGE
const bookmarkBook = (bookmarkData) => {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

  const isBookmarked = bookmarks.some(book => book.id === bookmarkData.id);
    if (!isBookmarked) {
      bookmarks.push(bookmarkData);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    };
}

document.getElementById('bookmark-book').addEventListener('click', () => {
  let bookmarkData = {
    id: document.getElementById('popup-isbn').innerText,
    title: document.getElementById('popup-title').innerText,
    author: document.getElementById('popup-author').innerText,
    thumbnail: document.getElementById('popup-thumbnail').src
  }

  bookmarkBook(bookmarkData);

  alert('Book has been bookmarked!');
})




//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//STORING LIKED BOOK TO LOCAL STORAGE
const favBook = (favouriteData) => {
  let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

  const isFavourited = favourites.some(book => book.id === favouriteData.id);
    if (!isFavourited) {
      favourites.push(favouriteData);
      localStorage.setItem('favourites', JSON.stringify(favourites));
    };
}

document.getElementById('fav-book').addEventListener('click', () => {
  let favouriteData = {
    id: document.getElementById('popup-isbn').innerText,
    title: document.getElementById('popup-title').innerText,
    author: document.getElementById('popup-author').innerText,
    thumbnail: document.getElementById('popup-thumbnail').src
  }

  favBook(favouriteData);

  alert('Book has been added to Favourites!');
})




//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//STORING READ BOOKS TO LOCAL STORAGE
const readBooks = (readBookData) => {
  let booksread = JSON.parse(localStorage.getItem('booksread')) || [];

  const hasBeenRead = booksread.some(book => book.id === booksread.id);
    if (!hasBeenRead) {
      booksread.push(readBookData);
      localStorage.setItem('booksread', JSON.stringify(booksread));
    };
}

document.getElementById('read-book').addEventListener('click', () => {
  let readBookData = {
    id: document.getElementById('popup-isbn').innerText,
    title: document.getElementById('popup-title').innerText,
    author: document.getElementById('popup-author').innerText,
    thumbnail: document.getElementById('popup-thumbnail').src
  }

  readBooks(readBookData);
})




const readBook = () => {
  let bookISBN = document.getElementById('popup-isbn').innerText
  let viewerUrl = 'bookreader.html?isbn='+bookISBN;
  document.getElementById('book-content').href = viewerUrl;
}

document.getElementById('read-book').addEventListener('click', () => {
  readBook()
})
