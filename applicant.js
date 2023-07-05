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
    document.getElementById("uploadButton").textContent = "Upload"
  } else {
    chooseFileButton.textContent = "Choose File";
    document.getElementById("uploadButton").textContent = "No File Selected"
  }
});

// Form submission event listener
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  function alertfunction(e) {
    alert(e);
  }

  var fileInput = document.getElementById("file-input");
  var file = fileInput.files[0];
  var uploadbutton = document.getElementById("uploadButton");

if (file) {
  uploadbutton.textContent = "Uploading"
}

//  if (file.type !== "application/pdf") {
//    alertfunction("Invalid file type. Please select a PDF file.");
//    return;
//  }

  var storageRef = firebase.storage().ref();
  var fileRef = storageRef.child(file.name);

  fileRef
    .put(file)
    .then(function (snapshot) {
      uploadbutton.textContent = "Uploaded"
      alertfunction("Upload Successful!");
    })
    .catch(function (error) {
      alertfunction("Upload Unsuccessful");
      // Handle error during upload
    });
});
