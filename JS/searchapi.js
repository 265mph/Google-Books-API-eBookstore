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

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchKeyword}&key=${apiKey}`)
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
//VIEW BOOK FUNCTION

// Function that shows more details about a book in a new modal
function viewBookDetails (title, author, desc, thumbnail) {
  document.getElementById('popup-title').innerHTML = title;
  document.getElementById('popup-author').innerHTML = author;
  document.getElementById('popup-desc').innerHTML = desc;
  document.getElementById('popup-thumbnail').src = thumbnail;


  document.querySelector('.view-details').style.visibility = 'visible';
  document.querySelector('.view-details').style.opacity = '1';
}


// Function that closes the viewBookDetails modal
const closeBookDetails = () => {
  document.querySelector('.view-details').style.visibility = 'hidden';
  document.querySelector('.view-details').style.opacity = '0';
}



//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//DISPLAYING THE RESULTS

// Function to count words in the book description & shorten it 
function countWords(str) {
  if (!str) {
    return 0; // Return 0 for undefined or null input
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

          <button onclick="viewBookDetails('${bookTitle}' , '${bookAuthor}' , '${bookDescription}' , '${bookThumbnail}')" >View Book Details</button>
        </div>
      `
      resultContainer.appendChild(bookLink);
    });
    
  } else {
    resultContainer.innerHTML = `<h2 style='text-align = center'>no results found</h2>`
  }
}



//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//SEARCHING BY PRESSING ENTER
document.getElementById("search-word").addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    searchFunc()
  }
})



