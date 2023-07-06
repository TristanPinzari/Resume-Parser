var firebaseConfig = {
  apiKey: "AIzaSyCBvhvxXNxpJLYdX4-N0rMUnsQe0J09dFQ",
  authDomain: "resume-parser-488ed.firebaseapp.com",
  projectId: "resume-parser-488ed",
  storageBucket: "resume-parser-488ed.appspot.com",
  appId: "1:967002194526:web:cc839f6f01f1dbbe2a6acf",
};

// Get references to the necessary elements
const searchbar = document.getElementById('searchbar');
const fileForm = document.getElementById('keywordfiles');

firebase.initializeApp(firebaseConfig);

// Event listener for the display button
searchbar.addEventListener('change', function() {

  while (fileForm.firstChild) {
      fileForm.removeChild(fileForm.firstChild);
  }

  if (searchbar.value === "") {
    fileForm.textContent = "No files found"
    return;
  }

  firebase
  .storage()
  .ref()
  .listAll()
  .then(function(result) {
    result.items.forEach(function(fileRef) {
      // Get the download URL for the file
      fileRef
        .getDownloadURL()
        .then(function(url) {
          // Fetch the file content from the URL
          fetch(url, {
            method: "GET"
        })
            .then(function(response) {
              return response.text();
            })
            .then(function(fileContent) {
              if (fileContent.toLowerCase().includes(searchbar.value)) {
                const pdfFileName = fileRef.name.replace('.txt', '');
                const pdfFileRef = firebase.storage().ref().child(pdfFileName);
                fileForm.textContent = fileForm.textContent.replace("No files found with this keyword", "")

                pdfFileRef.getDownloadURL()
                  .then(function(pdfUrl) {
                    // Create a link element for the PDF file
                    const fileLink = document.createElement('a');
                    fileLink.href = pdfUrl;
                    fileLink.textContent = pdfFileName;
                    fileLink.target = '_blank';
                    // Append the link to the wrapper form
                    fileForm.appendChild(fileLink);
                  })
              }
            })
            
            .catch(function(error) {
              console.log('Error fetching file:', error);
            });
        })

        .catch(function(error) {
          console.log('Error getting download URL:', error);
        });
    });
  })
  .catch(function(error) {
    console.log('Error retrieving files from Firebase Storage:', error);
  });

  while (fileForm.textContent === "") {
    fileForm.textContent = "No files found with this keyword"
  }

});