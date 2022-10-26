/*
 * Views for different games
 * Hides and shows games on menu clicks
 *
 */
$("#dice").hide();
$("#cards").hide();
$("#pandemic").hide();
$(".one-dice-config").hide();

$(".dice-nav-link").on("click", function() {

                                $("#cards").hide();
                                $("#pandemic").hide();
                                $("#dice").show();
                              });

$(".cards-nav-link").on("click", function() {

                                $("#dice").hide();
                                $("#pandemic").hide();
                                $("#cards").show();
                              });

$(".pandemic-nav-link").on("click", function() {

                                $("#dice").hide();
                                $("#cards").hide();
                                $("#pandemic").show();
                              });





/***** DICE SECTION *****/
/*
 * Event listener to display number of dice selected
 *
 */
$(".select-text").on("click", function() {

                                var numDice = $(this).text();

                                if( numDice == 1 ){
                                  $(".two-dice-config").hide();
                                  $(".one-dice-config").show();
                                  rollDice();
                                }
                                else if( numDice == 2 ){
                                  $(".one-dice-config").hide();
                                  $(".two-dice-config").show();
                                  rollDice();
                                }
                              });


/*
 * Event listener to roll dice when clicked
 *
 */
$(".dice").on("click", rollDice);



/*
 * Rolls 1 or 2 dice based on the current view and updates results
 *
 *
 */
function rollDice(){

  var roll1 = diceRNG();
  var roll2 = diceRNG();

  var total = roll1;

  var imageString1 = "images/dice" + roll1 + ".png";
  var imageString2 = "images/dice" + roll2 + ".png";

  $(".dice1").attr("src", imageString1);

  if( $(".two-dice-config").is(":visible") ){

    total = roll1 + roll2;

    $(".dice2").attr("src", imageString2);
  }

  $(".result").html("Result: " + total);
}


/*
 * RNG function for six sided dice roll
 *
 */
function diceRNG(){

  return Math.floor( (Math.random()*6) + 1 );
}





/***** CARDS SECTION *****/
/*
 * Section variables
 *
 */
var hand = [];  //Holds cards in hand



/*
 * Event listeners for click draw and reshuffle events
 *
 */
$(".deck-img").click(drawCard);
$(".draw-button").click(drawCard);
$(".reshuffle-button").click(reshuffle);



/*
 * Draws a random card from the deck (without replacement) and adds it to the hand
 *
 */
function drawCard(){

  var cardDrawn = cardRNG();

  //Uniqueness check - cannot draw card already drawn
  while( hand.includes(cardDrawn) ){

    cardDrawn = cardRNG();
  }

  hand.push(cardDrawn);

  //Display card in hand, with black or red text depending on suit
  var cardPos = ".card" + (hand.length);
  var cardName = hand[hand.length-1];
  $(cardPos).html( cardName );
  if( cardName.includes("♠︎") || cardName.includes("♣︎") )
    $(cardPos).addClass('black');
  else if( cardName.includes("♥︎") || cardName.includes("♦︎") )
    $(cardPos).addClass('red');


  //Grey out and disable once 5 cards in hand
  if( hand.length >= 5 ){

    $(".draw-button").prop('disabled', true);
    $(".deck-img").addClass('grey');
  }
}




/*
 * Sets up a new deck and clears the hand
 *
 */
function reshuffle(){

  hand = [];
  $(".card-val").empty();
  $(".card-val").removeClass('red');
  $(".card-val").removeClass('black');

  $(".draw-button").prop('disabled', false);
  $(".deck-img").removeClass('grey');
}



/*
 * RNG function for picking a card from standard 52 card deck
 *
 */
function cardRNG(){

  var result = "";
  var num = Math.floor( (Math.random()*13) + 1 );
  var suit = Math.floor( (Math.random()*4) + 1 );

  switch(num){

    case 1:
      result += "A"; break;
    case 11:
      result += "J"; break;
    case 12:
      result += "Q"; break;
    case 13:
      result += "K"; break;
    default:
      result += num; break;
    }

  if( suit == 1 )  result += " ♠︎";
  if( suit == 2 )  result += " ♣︎";
  if( suit == 3 )  result += " ♥︎";
  if( suit == 4 )  result += " ♦︎";

  return result;
}





/***** PANDEMIC SECTION *****/
/*
 * Section variables
 *
 */
const infectionDeckConst = [
"K:Algiers",
"B:Atlanta",
"K:Baghdad",
"R:Bangkok",
"R:Beijing",
"Y:Bogota",
"Y:Buenos Aries",
"K:Cairo",
"K:Chennai",
"B:Chicago",
"K:Delhi",
"B:Essen",
"R:Ho Chi Minh City",
"R:Hong Kong",
"K:Istanbul",
"R:Jakarta",
"Y:Johannesburg",
"K:Karachi",
"Y:Khartoum",
"Y:Kinshasa",
"K:Kolkata",
"Y:Lagos",
"Y:Lima",
"B:London",
"Y:Los Angeles",
"B:Madrid",
"R:Manila",
"Y:Mexico City",
"Y:Miami",
"B:Milan",
"B:Montreal",
"K:Moscow",
"K:Mumbai",
"B:New York",
"R:Osaka",
"B:Paris",
"K:Riyadh",
"B:San Francisco",
"Y:Santiago",
"Y:Sao Paulo",
"R:Seoul",
"R:Shanghai",
"B:St. Petersburg",
"R:Sydney",
"R:Taipei",
"K:Tehran",
"R:Tokyo",
"B:Washington"];

var infectionRate = 2;
var infectionDeck = infectionDeckConst;
var infectionPile = [];



/*
 * Event listeners from draw, shuffle, new game, buttons, and rate slider
 *
 */
$("#infection-button").click(infectionDraw);
$("#epidemic-button").click(epidemicDraw);
$("#epidemic-reshuffle").click(epidemicReshuffle);
$("#new-game").click(newGame);
$("#slider").on("change", function(){
                                    var sliderPos = $("#slider").val();

                                    if( sliderPos==1 || sliderPos==2 || sliderPos==3 )
                                      infectionRate = 2;
                                    else if( sliderPos==4 || sliderPos==5 )
                                      infectionRate = 3;
                                    else if( sliderPos==6 || sliderPos==7 )
                                      infectionRate = 4;
                                    });



/*
 * Resets the infection deck and pile to start a new game
 *
 */
function newGame(){

  infectionDeck = infectionDeckConst;
  infectionPile = [];
  $("#infection-pile").empty();
  $(".cube-space").empty();
  shuffle(infectionDeck);

  $(".infection-color").css("backgroundColor", "white");
  $(".infection-city").css("color", "");
  $(".infection-city").html("City");
}



/*
 * Draws one card from the deck and shows it in the pile
 * Adds city to dropdown list
 *
 */
function infectionDraw(){

  //Pop a city from infection array
  var draw = infectionDeck.pop();

  //Parse color and city name
  var color = draw.charAt(0);
  var city = draw.substring(2);

  //Display city card on table
  displayColor(color);
  displayCubes(1, color);
  $(".infection-city").html(city);

  //Update infection pile array and display
  infectionPile.push(draw);
  $('#infection-pile').append("<option value='" + city + "'>");
}



/*
 * Draws 1 card from the bottom of the deck and shows it in the pile
 * Adds city to dropdown list
 *
 */
function epidemicDraw(){

  //Shift a city from infection array
  var draw = infectionDeck.shift();

  //Parse color and city name
  var color = draw.charAt(0);
  var city = draw.substring(2);

  //Display city card on table
  displayColor(color);
  displayCubes(3, color);
  $(".infection-city").html(city);

  //Update infection pile array and display
  infectionPile.push(draw);
  $('#infection-pile').append("<option value='" + city + "'>");
}



/*
 * Reshuffles all the cities in the infection pile and puts shuffled cards on top of the deck
 * Clears dropdown list
 *
 */
function epidemicReshuffle(){


  infectionDeck = infectionDeck.concat(shuffle(infectionPile));
  console.log(infectionDeck);

  infectionPile = [];

  $("#infection-pile").empty();
  $(".cube-space").empty();

  $(".infection-color").css("backgroundColor", "white");
  $(".infection-city").css("color", "");
  $(".infection-city").html("City");
}



/*
 * Displays number of cubes on infection card based on infection rate and color
 *
 */
function displayCubes( num, color ){

  $(".cube-space").empty();

  for( var i=0; i<num; i++ )
    $(".cube-space").prepend("<img class='cube-img' src='images/" + color + "_cube.png'>");

}



/*
 * Gets color of city and displays city on infection card
 *
 * Takes input color character parsed from cities array
 *
 */
function displayColor( color ){

  switch( color ){

    case "R":
      $(".infection-color").css("backgroundColor", "red");
      $(".infection-city").css("color", "red");
      break;
    case "B":
      $(".infection-color").css("backgroundColor", "blue");
      $(".infection-city").css("color", "blue");
      break;
    case "Y":
      $(".infection-color").css("backgroundColor", "#FFB200");
      $(".infection-city").css("color", "#FFB200");
      break;
    case "K":
      $(".infection-color").css("backgroundColor", "black");
      $(".infection-city").css("color", "black");
      break;
    default:
      break;
  };
}



/*
 * Shuffle function
 *
 * Takes in array
 * Returns array with elements randomized
 *
 */
function shuffle( array ){

    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}
