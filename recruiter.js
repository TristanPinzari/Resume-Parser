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
let filecount;
let realcount;

firebase.initializeApp(firebaseConfig);

// Event listener for the display button
searchbar.addEventListener('change', function() {
  filecount = 0;
  realcount = 0;

  while (fileForm.firstChild) {
    fileForm.removeChild(fileForm.firstChild);
  }

  if (searchbar.value === "") {
    fileForm.textContent = "No valid keywords";
    return;
  }

  const keywords = searchbar.value.toLowerCase().split(" ");

  firebase
    .storage()
    .ref()
    .listAll()
    .then(function(result) {
      result.items.forEach(function(fileRef) {
        if (fileRef.name.endsWith(".txt")) { // Check if the file has a .txt extension
          realcount += 1;
          fileRef
            .getDownloadURL()
            .then(function(url) {
              fetch(url, {
                method: "GET"
              })
                .then(function(response) {
                  return response.text();
                })
                .then(function(fileContent) {
                  const foundKeywords = keywords.filter(keyword =>
                    fileContent.toLowerCase().includes(keyword)
                  );

                  if (foundKeywords.length === keywords.length) {
                    const pdfFileName = fileRef.name.replace('.txt', '');
                    const pdfFileRef = firebase.storage().ref().child(pdfFileName);

                    pdfFileRef.getDownloadURL()
                      .then(function(pdfUrl) {
                        const fileLink = document.createElement('a');
                        fileLink.href = pdfUrl;
                        fileLink.textContent = pdfFileName;
                        fileLink.target = '_blank';
                        fileForm.appendChild(fileLink);
                      });
                  } else if (fileRef.name.endsWith(".txt")) {
                    filecount += 1;
                    if (realcount == filecount) {
                      fileForm.textContent = "No files found with keywords";
                    }
                  }
                })
                .catch(function(error) {
                  console.log('Error fetching file:', error);
                });
            })
            .catch(function(error) {
              console.log('Error getting download URL:', error);
            });
        }
      });
    })
    .catch(function(error) {
      console.log('Error retrieving files from Firebase Storage:', error);
    });
});