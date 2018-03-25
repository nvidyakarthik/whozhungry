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

var rowCount = 1;
var itemList = [];

function increaseSideDivHeight(){
  var documentHeight = $(window).height();
  console.log("document height:"+documentHeight);
$(".row.content").height(documentHeight);

}


$("#search-recipe").on("click", function (event) {
  var API_Key = "e5652c4ade8903dab8f300a987914678";
  var applicationID = "c671ae6a";
 

  var queryURL = "https://api.edamam.com/search?q="+itemList+"&app_id=" + applicationID + "&app_key=" + API_Key + "&from=0&to=6";
  console.log(queryURL);
  /***********cors problem fix***************/
  $.ajaxPrefilter(function(options) {
    if (options.crossDomain && $.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
  }); 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function (result) {
    console.log(result);
    $("#recipeList").empty();
    
    for (var i = 0; i < result.hits.length; i++) {
      
      
      var cardDiv=$("<div class='card card-inverse card-info'>");
      var imageDiv=$("<img class='card-img-top' src='"+result.hits[i].recipe.image+"'>");
      var cardBlockDiv=$("<div class='card-block'>");
      var cardTitleDiv=$("<h4 class='card-title'>"+result.hits[i].recipe.label+"</h4>");
      cardBlockDiv.append(cardTitleDiv);
      var cardFooterDiv=$("<div class='card-footer'>");
      var buttonDiv=$("<button class='btn btn-info btn-sm' id='view-recipe' data-url='"+result.hits[i].recipe.url+"'>View Recipe</button>");
      cardFooterDiv.append(buttonDiv);
      
      cardDiv.append(imageDiv).append(cardBlockDiv).append(cardFooterDiv);
      
      $("#recipeList").append(cardDiv);
      

      console.log("recipe label:" + result.hits[i].recipe.label);
      console.log("recipe image:" + result.hits[i].recipe.image);
      console.log("recipe url:" + result.hits[i].recipe.url);
    }
  increaseSideDivHeight();
  });
});

$("#recipeList").on("click","#view-recipe", function (event) {
  var recipeUrl=$(this).attr("data-url");
  
  window.open(recipeUrl);

});

$("#clear-recipe").on("click", function (event) {
  $("#recipeList").empty();
  $("#ingredients-tbody").empty();
  
});


$("#add-ingredients").on("click", function (event) {

  var itemName = $("#add-ingredient").val().trim();
  itemList.push(itemName);
  var tableRow = $("<tr>");
  var cell1 = $("<td>").append(rowCount++);
  var cell2 = $("<td>").append(itemName);
  var cell3 = $("<td>").append("<button type='button' class='btn btn-default btn-sm' id='delete-ingredient' data-name='" + itemName + "'>"
    + "<span class='glyphicon glyphicon-trash'>"
    + "</span> Delete</button>");
  tableRow.append(cell1).append(cell2).append(cell3);
  $("#ingredients-tbody").append(tableRow);
  $("#add-ingredient").val("");
  


});


$("tbody").on("click", '#delete-ingredient', function (event) {
  var deleteItemName = $(this).attr('data-name');
  console.log("Item to be deleted:" + deleteItemName);
  var index = itemList.indexOf(deleteItemName);
  if (index > -1) {
    itemList.splice(index, 1);
  }
  console.log("New item list names:" + itemList);
  var rowId = this.parentNode.parentNode.rowIndex;
  document.getElementById("itemList-table").deleteRow(rowId);


});


