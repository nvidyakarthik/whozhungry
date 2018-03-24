
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
var database = firebase.database();
//This function adds contents whenever you post a message for donations
database.ref("/Donations").on("child_added", function (childSnapshot) {
  console.log("title " + childSnapshot.val().title);

  var cardDiv = $("<div class='card card-inverse card-info' id='detailView' data-key="+childSnapshot.key+">");
  var imageDiv = $("<img class='card-img-top' src='" + childSnapshot.val().imageUrl + "'>");
  var cardBlockDiv = $("<div class='card-block'>");
  var cardTitleDiv = $("<h4 class='card-title'>" + childSnapshot.val().title + "</h4>");
  cardBlockDiv.append(cardTitleDiv);
  var cardFooterDiv = $("<div class='card-footer'>");
  var citySpan = $("<span> . " + childSnapshot.val().city + "</span>");
  var ExpDateSpan = $("<span>Expires " + childSnapshot.val().expirateDate + "</span>");

  cardFooterDiv.append(ExpDateSpan).append(citySpan);

  cardDiv.append(imageDiv).append(cardBlockDiv).append(cardFooterDiv);

  $("#postDonations-List").append(cardDiv);


  /*  console.log("recipe label:" + result.hits[i].recipe.label);
   console.log("recipe image:" + result.hits[i].recipe.image);
   console.log("recipe url:" + result.hits[i].recipe.url);  */

});
/* <div class="container py-3" id="horizontalcard">
              <div class="card">
                <div class="row ">
                  <div class="col-md-4">
                      <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=200&h=200" class="w-100">
                    </div>
                    <div class="col-md-8 px-3">
                      <div class="card-block px-3">
                        <h4 class="card-title">Title</h4>
                        <p class="card-text">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        <p class="card-text"><span>ExpirationDate</span><span>City</span></p>
                        
                        <a href="#" class="btn btn-primary">Send Message</a>
                      </div>
                    </div>
          
                  </div>
                </div>
              </div> */
$("#postDonations-List").on('click', "#detailView", function (event) {
  $("#detailViewCard").empty();
  var childkey=$(this).attr("data-key");
  database.ref("/Donations").child(childkey).once("value", function (childSnapshot) {
  var horizontalCardDiv=$("<div class='container py-3' id='horizontalcard'>");  
  var cardDiv=$("<div class='card'>");
  var rowDiv=$("<div class='row'>");
  var colmd4Div=$("<div class='col-md-4'>");
  colmd4Div.append($("<img src="+childSnapshot.val().imageUrl+" class='w-100'>"));
  var colmd8Div=$("<div class='col-md-8 px-3'>");
  var cardBlockDiv=$("<div class='card-block px-3'>");
  var title=$("<h4 class='card-title'>"+childSnapshot.val().title+"</h4>");
  var message=$("<p class='card-text'>"+childSnapshot.val().message+"</p>");
  var ExpLoc=$("<p class='card-text'><span>"+childSnapshot.val().expirateDate+"</span><span>"+childSnapshot.val().city+"</span></p>");
  var button=$("<a href='#' class='btn btn-primary'>Send Message</a>");
  colmd8Div.append(cardBlockDiv).append(title).append(message).append(ExpLoc).append(button);
  horizontalCardDiv.append(cardDiv).append(rowDiv).append(colmd4Div).append(colmd8Div);
  $("#detailViewCard").append(horizontalCardDiv);
  });



  
});
//function to add donations. pushes data in firebase
$("#myModalHorizontal").on("click", "#add-donations", function (event) {

  var addtitle = $("#title").val().trim();
  var addMessage = $("#message").val().trim();
  var addCity = $("#city").val().trim();
  var addZipCode = $("#zipCode").val().trim();
  var addExpirationDate = $("#expirationDate").val().trim();
  const file = document.querySelector('#donation-image').files[0];
  console.log($('#donation-image').val());
  if (file != undefined) {
    const storageRef = firebase.storage().ref("/donationImages" + file.name);
    var uploadTask = storageRef.put(file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function (snapshot) {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function (error) {
      // Handle unsuccessful uploads
    }, function () {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      downloadURL = uploadTask.snapshot.downloadURL;
      database.ref("/Donations").push({
        title: addtitle,
        message: addMessage,
        city: addCity,
        zipcode: addZipCode,
        expirateDate: addExpirationDate,
        imageUrl: downloadURL,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
      console.log(downloadURL);
    });
  }

  if (file == undefined) {
    var imageURL = "assets/images/noImageIcon.png"

    database.ref("/Donations").push({
      title: addtitle,
      message: addMessage,
      city: addCity,
      zipcode: addZipCode,
      expirateDate: addExpirationDate,
      imageUrl: imageURL,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  }
  $("#title").val("");
  $("#message").val("");
  $("#city").val("");
  $("#zipCode").val("");
  $("#expirationDate").val("");
  $("#donation-image").val("");
  $('#myModalHorizontal').modal('hide');



});