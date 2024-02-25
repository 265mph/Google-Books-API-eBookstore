//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//FUNCTION TO UPDATE PREVIEWLINKS OF BEST SELLER BOOKS 

const bestSellerLInk = (isbn) => {
    const apiKey = "AIzaSyDJgJDIocYpDLp3V5bQXFt7AjV2LTmldCA";

    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}`)
    .then((response) => {
        console.log('successful', response)
        return response.json();
    })
    .then(data => {
        if (data.items && data.items.length >  0) {
          const previewLink = data.items[0].volumeInfo.previewLink;

          // Find the <a> tag with the matching data-isbn attribute
          const previewLinkElement = document.querySelector(`a[data-isbn="${isbn}"]`);
          if (previewLinkElement) {
            previewLinkElement.href = previewLink;
            previewLinkElement.target = "_blank"
            previewLinkElement.textContent = 'See Preview';
          }
        } else {
          console.log('No book found with the given ISBN.');
        }
    })
    .catch((error) => {
        console.error('Error fetching book preview:', error)
        alert('Unable to open this page. Please check your connection')
    });
}

const isbns = [
    '9780008532796',
    '9780385697385',
    '9780399590948',
    '9780593682937',
    '1529151813' 
  ];
  
isbns.forEach(isbn => bestSellerLInk(isbn));