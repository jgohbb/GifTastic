$(document).ready(function() {

    var pokemon = ["pikachui", "tyranitar", "snorlax", "blastoise", "charizard"]


    $(document).on("click", "button", displayPokemon);

    function generateButtons(){
        $("#top-buttons").empty();

        for (var i = 0; i < pokemon.length; i++){
            var newButton = $("<button>");
            newButton.attr("data-name",pokemon[i]);
            newButton.text(pokemon[i]);
            $("#top-buttons").append(newButton);
       }          
    }

    function displayPokemon() {
        var selectPokemon= $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        selectPokemon + "&api_key=EGEKyyvU9sBFaCFAdcVl69RzrlWGiUPI&limit=10";
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;
            console.log(results);

            for (var i=0; i < results.length; i++) {
                var title = results[i].title;
                var rating = results[i].rating;
            
                var pokemonImage = $("<img>");
                pokemonImage.attr("src", results[i].images.fixed_height_still.url);
                pokemonImage.attr("alt", title);
            
                var ratingP = $("<p>");
                var ratingInfo = $("<p>").text("Rating: " + rating);
            
                $("#image-box").prepend(ratingInfo);  
                $("#image-box").prepend(pokemonImage);
           

            }
        });
    }


    $("#add-pokemon").on("click", function(event) {
        event.preventDefault();

        var addedPokemon = $("#pokemon-input").val().trim();  

        pokemon.push(addedPokemon);
        // $("#top-buttons").val('');

        generateButtons();

    });
    
    generateButtons();

    $(document).on("click", "img", function() {
        var src = $(this).attr("src");
      if($(this).hasClass('playing')){
         //stop
         $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
         $(this).removeClass('playing');
      } else {
        //play
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
      }
    });

});