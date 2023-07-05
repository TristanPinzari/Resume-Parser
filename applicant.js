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

  var reader = new FileReader();

  reader.onload = function (event) {
    var arrayBuffer = event.target.result;
    var uint8Array = new Uint8Array(arrayBuffer);

    pdfjsLib.getDocument(uint8Array)
      .promise.then(function (pdfDoc) {
        var numPages = pdfDoc.numPages;
        var textContent = "";

        function processPage(pageNum) {
          return pdfDoc.getPage(pageNum).then(function (page) {
            return page.getTextContent().then(function (content) {
              content.items.forEach(function (item) {
                textContent += item.str + " ";
              });
            });
          });
        }

        var promises = [];
        for (var i = 1; i <= numPages; i++) {
          promises.push(processPage(i));
        }

        Promise.all(promises)
          .then(function () {
            // All pages processed, upload the text file to Firebase
            var storageRef = firebase.storage().ref();
            var textFileRef = storageRef.child(file.name + ".txt");

            textFileRef.putString(textContent)
              .then(function (snapshot) {
                uploadButton.textContent = "Uploaded";
                alertfunction("Upload Successful!");
              })
              .catch(function (error) {
                uploadButton.textContent = "Upload";
                alertfunction("Upload Unsuccessful");
                // Handle error during upload
              });
          })
          .catch(function (error) {
            uploadButton.textContent = "Upload";
            alertfunction("Error occurred while processing the PDF file");
            console.log(error);
          });
      })
      .catch(function (error) {
        uploadButton.textContent = "Upload";
        alertfunction("Error occurred while loading the PDF file");
        console.log(error);
      });
  };

  reader.onerror = function (event) {
    uploadButton.textContent = "Upload";
    alertfunction("Error occurred while reading the file");
    console.log(event.target.error);
  };

  reader.readAsArrayBuffer(file);
});