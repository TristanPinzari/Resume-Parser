// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCBvhvxXNxpJLYdX4-N0rMUnsQe0J09dFQ",
  authDomain: "resume-parser-488ed.firebaseapp.com",
  projectId: "resume-parser-488ed",
  storageBucket: "resume-parser-488ed.appspot.com",
  appId: "1:967002194526:web:cc839f6f01f1dbbe2a6acf",
};

firebase.initializeApp(firebaseConfig);

// File input change event listener
document.getElementById("file-input").addEventListener("change", function (event) {
  var selectedFile = event.target.files[0];
  var chooseFileButton = document.getElementById("chooselabel");

  if (selectedFile) {
    chooseFileButton.textContent = selectedFile.name;
    document.getElementById("uploadButton").textContent = "Upload";
  } else {
    chooseFileButton.textContent = "Choose File";
    document.getElementById("uploadButton").textContent = "No File Selected";
  }
});

// Form submission event listener
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  function alertfunction(message) {
    alert(message);
  }

  var fileInput = document.getElementById("file-input");
  var file = fileInput.files[0];
  var uploadButton = document.getElementById("uploadButton");

  if (!file) {
    alertfunction("No File Selected");
    return;
  }

  if (file.type !== "application/pdf") {
    alertfunction("Invalid file type. Please select a PDF file.");
    return;
  }

  uploadButton.textContent = "Uploading";

  var storageRef = firebase.storage().ref();
  var pdfFileRef = storageRef.child(file.name);

  pdfFileRef.put(file)
    .then(function (snapshot) {
      uploadButton.textContent = "Uploaded";
      alertfunction("Upload Successful!");
      // Convert PDF to text
      pdfFileRef.getDownloadURL()
        .then(function (url) {
          fetch(url)
            .then(function (response) {
              return response.arrayBuffer();
            })
            .then(function (arrayBuffer) {
              var uint8Array = new Uint8Array(arrayBuffer);
              return pdfjsLib.getDocument(uint8Array).promise;
            })
            .then(function (pdfDoc) {
              var numPages = pdfDoc.numPages;
              var textContent = "";
              var promises = [];

              for (var i = 1; i <= numPages; i++) {
                promises.push(pdfDoc.getPage(i).then(function (page) {
                  return page.getTextContent().then(function (content) {
                    content.items.forEach(function (item) {
                      textContent += item.str + " ";
                    });
                  });
                }));
              }

              Promise.all(promises).then(function () {
                // Upload the text file to Firebase Storage
                var textFileRef = storageRef.child(file.name + ".txt");
                return textFileRef.putString(textContent);
              }).then(function () {
                // Get the download URL for the text file
                return textFileRef.getDownloadURL();
              }).then(function (textFileUrl) {
                // Display the link to the text file
                var textLink = document.getElementById("textLink");
                textLink.href = textFileUrl;
                textLink.textContent = "View Text File";
                textLink.style.display = "block";
              }).catch(function (error) {
                console.log(error);
              });
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      uploadButton.textContent = "Upload";
      alertfunction("Upload Unsuccessful");
      console.log(error);
    });
});firebase.initializeApp(firebaseConfig);

// File input change event listener
document.getElementById("file-input").addEventListener("change", function (event) {
  var selectedFile = event.target.files[0];
  var chooseFileButton = document.getElementById("chooselabel");

  if (selectedFile) {
    chooseFileButton.textContent = selectedFile.name;
    document.getElementById("uploadButton").textContent = "Upload";
  } else {
    chooseFileButton.textContent = "Choose File";
    document.getElementById("uploadButton").textContent = "No File Selected";
  }
});

// Form submission event listener
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  function alertfunction(message) {
    alert(message);
  }

  var fileInput = document.getElementById("file-input");
  var file = fileInput.files[0];
  var uploadButton = document.getElementById("uploadButton");

  if (!file) {
    alertfunction("No File Selected");
    return;
  }

  if (file.type !== "application/pdf") {
    alertfunction("Invalid file type. Please select a PDF file.");
    return;
  }

  uploadButton.textContent = "Uploading";

  var storageRef = firebase.storage().ref();
  var pdfFileRef = storageRef.child(file.name);

  pdfFileRef.put(file)
    .then(function (snapshot) {
      uploadButton.textContent = "Uploaded";
      alertfunction("Upload Successful!");
      // Convert PDF to text
      pdfFileRef.getDownloadURL()
        .then(function (url) {
          fetch(url)
            .then(function (response) {
              return response.arrayBuffer();
            })
            .then(function (arrayBuffer) {
              var uint8Array = new Uint8Array(arrayBuffer);
              return pdfjsLib.getDocument(uint8Array).promise;
            })
            .then(function (pdfDoc) {
              var numPages = pdfDoc.numPages;
              var textContent = "";
              var promises = [];

              for (var i = 1; i <= numPages; i++) {
                promises.push(pdfDoc.getPage(i).then(function (page) {
                  return page.getTextContent().then(function (content) {
                    content.items.forEach(function (item) {
                      textContent += item.str + " ";
                    });
                  });
                }));
              }

              Promise.all(promises).then(function () {
                // Upload the text file to Firebase Storage
                var textFileRef = storageRef.child(file.name + ".txt");
                return textFileRef.putString(textContent);
              }).then(function () {
                // Get the download URL for the text file
                return textFileRef.getDownloadURL();
              }).then(function (textFileUrl) {
                // Display the link to the text file
                var textLink = document.getElementById("textLink");
                textLink.href = textFileUrl;
                textLink.textContent = "View Text File";
                textLink.style.display = "block";
              }).catch(function (error) {
                console.log(error);
              });
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      uploadButton.textContent = "Upload";
      alertfunction("Upload Unsuccessful");
      console.log(error);
    });
});