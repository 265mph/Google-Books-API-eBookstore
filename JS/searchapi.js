//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//CLOSING THE RESULTS POP-UP
const closePopup = () => {
  document.querySelector(".results-bg").style.visibility = "hidden"
  document.getElementById("search-word").value = ""
};



//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//WORKING WITH API & SEARCHING
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



function viewBookDetails (title, author, desc, thumbnail) {
  
  document.getElementById('popuptitle').innerHTML = title;
  document.getElementById('popupauhtor').innerHTML = author;
  document.getElementById('popupdesc').innerHTML = desc;
  document.getElementById('popupthumbnail').src = thumbnail;

  document.querySelector('.view-details').style.visibility = 'visible';
  document.querySelector('.view-details').style.opacity = '1';
}



//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//DISPLAYING THE RESULTS

// function to count words in description 
function countWords(str) {
  if (!str) {
    return 0; // Return 0 for undefined or null input
  }
  const arr = str.split(" ");
  return arr.filter(word => word !== '').length;
}

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

          <button onclick="viewBookDetails('${bookTitle}', '${bookAuthor}', '${bookDescription}', '${bookThumbnail}')">View Book Details</button>
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



