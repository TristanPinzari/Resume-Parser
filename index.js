// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCBvhvxXNxpJLYdX4-N0rMUnsQe0J09dFQ",
  authDomain: "resume-parser-488ed.firebaseapp.com",
  projectId: "resume-parser-488ed",
  storageBucket: "resume-parser-488ed.appspot.com",
  appId: "1:967002194526:web:cc839f6f01f1dbbe2a6acf",
};
firebase.initializeApp(firebaseConfig);


document.querySelector("form").addEventListener("submit", function (e) {
e.preventDefault(); // Prevent form submission


function alertfunction(e) {
  alert(e);
}


var fileInput = document.getElementById("file-input");
var file = fileInput.files[0];


if (file.type !== "application/pdf") {
  alertfunction("Invalid file type. Please select a PDF file.");
  return;
}


var storageRef = firebase.storage().ref();
var fileRef = storageRef.child(file.name);


fileRef
.put(file)
.then(function (snapshot) {
 alertfunction("Upload Successful!");
  // Do something after successful upload
})
.catch(function (error) {
 alertfunction("Upload Unsuccessful");
  // Handle error during upload
});
});