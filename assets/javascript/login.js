// Initialize Firebase
var config = {
  apiKey: "AIzaSyD_p_80vQAC85hnttvurL1tDF9cR2cSCzA",
  authDomain: "whozhungry-e0979.firebaseapp.com",
  databaseURL: "https://whozhungry-e0979.firebaseio.com",
  projectId: "whozhungry-e0979",
  storageBucket: "whozhungry-e0979.appspot.com",
  messagingSenderId: "235118731232"
};
firebase.initializeApp(config);
var provider = new firebase.auth.GoogleAuthProvider();
//This function is for the user who clicks the google signin button
$("#google-signIn").on("click", function (event) {
  
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        window.location.href="home.html";
        console.log("google userName :"+user);
       
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
});
//This function is for the user who clicks the facebook signin button
$("#facebook-signIn").on("click", function (event) {
  provider=new firebase.auth.FaceBookAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  window.location.href="home.html";
  console.log("google userName :"+user);
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
});

//This function registers new user
$("#register-login").on("click", function (event) {
  event.preventDefault();
  var inputUsernameEmail=$("#inputUsernameEmail").val().trim();
  console.log("username:"+inputUsernameEmail);
  var inputPassword=$("#inputPassword").val().trim();
  console.log(inputPassword);
  //Create user with password
   firebase
   .auth()
   .createUserWithEmailAndPassword(inputUsernameEmail, inputPassword).then(function(user){
    window.location.href="home.html";   
  
  })
   .catch(function(error) {
     // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
     
   //Send user to homepage
   });
});


$("#user-login").on("click", function (event) {
//alert("test");
event.preventDefault();
var email=$("#inputUsernameEmail").val().trim();
console.log("username:"+email);
var password=$("#inputPassword").val().trim();

firebase.auth().signInWithEmailAndPassword(email, password).
then(function(user){
  window.location.href="home.html";
  

}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  $("#errorMessage").empty();
  $("#errorMessage").append("Incorrect Email or Password");
});
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    //alert("signedin");
    var user = firebase.auth().currentUser;
    if(user!=null){
      
      console.log(user.email);
    }
  } else {
    // No user is signed in.
    //alert("signedout");
    console.log("usersignedout");
  }
});
$(document).ready(function() {
  $("#logout").on("click", function () {
  
   firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log("logout successful");
    window.location.href="index.html";
  }).catch(function(error) {
    // An error happened.
  }); 
});
});
