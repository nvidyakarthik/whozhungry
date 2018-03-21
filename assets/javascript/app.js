// Initialize Firebase
/* var config = {
  apiKey: "AIzaSyA9tVVn3wQqqKXakDkpHXoO87urw_zsH6c",
  authDomain: "whozhungry-62afa.firebaseapp.com",
  databaseURL: "https://whozhungry-62afa.firebaseio.com",
  projectId: "whozhungry-62afa",
  storageBucket: "",
  messagingSenderId: "488877449483"
};
firebase.initializeApp(config); */

var rowCount=1;
$("#search-recipe").on("click", function (event) {
var API_Key = "e5652c4ade8903dab8f300a987914678";
        var applicationID="c671ae6a";

    
    var queryURL= "https://api.edamam.com/search?q=chicken&app_id="+applicationID+"&app_key="+API_Key+"&from=0&to=3";
    
    
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (result) {
        console.log(result);
        for(var i=0;i<result.hits.length;i++){
        console.log("recipe label:"+result.hits[i].recipe.label);
        console.log("recipe image:"+result.hits[i].recipe.image);
        console.log("recipe url:"+result.hits[i].recipe.url);
        }
        
    });
  });
$("#add-ingredients").on("click", function (event) {
  
  var itemName = $("#add-ingredient").val().trim();
  var tableRow = $("<tr>");
  var cell1 = $("<td>").append(rowCount++);
  var cell2 = $("<td>").append(itemName);
  var cell3 = $("<td>").append("<button type='button' class='btn btn-default btn-sm' id='delete-ingredient'>"
                                +"<span class='glyphicon glyphicon-trash'>"
                                +"</span> Delete</button>");
  tableRow.append(cell1).append(cell2).append(cell3);
  $("tbody").append(tableRow);
  $("#add-ingredient").val("");
  var documentHeight=$( document ).height();
  $(".row.content").height(documentHeight);


});


$("tbody").on("click", '#delete-ingredient', function (event) {

  var rowId = this.parentNode.parentNode.rowIndex;
  document.getElementById("itemList-table").deleteRow(rowId);


});


