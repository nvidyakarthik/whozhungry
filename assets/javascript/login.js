
var provider = new firebase.auth.GoogleAuthProvider();
$("#google-signIn").on("click", function (event) {
  
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log("userName :"+user);
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

$("#google-signOut").on("click", function (event) {
firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
});

$("#user-login").on("click", function (event) {
//alert("test");
var userName=$("username").val().trim();
console.log(username);
var password=$("password").val().trim();
console.log(password);
firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    //alert("signedin");
    var user = firebase.auth().currentUser;
    if(user!=null){
      window.location("home.html");
      console.log(user.email);
    }
  } else {
    // No user is signed in.
    //alert("signedout");
    console.log("usersignedout");
  }
});

$("#logout").on("click", function (event) {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log("logout");
  }).catch(function(error) {
    // An error happened.
  });
});