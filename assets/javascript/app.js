$(document).ready(function() {

    var pokemon = ["pikachui", "tyranitar", "snorlax", "blastoise", "charizard"]


    $(document).on("click", "button", displayPokemon);

    function generateButtons(){
        $("#buttons-view").empty();

        for (var i = 0; i < addedPokemon.length; i++){
            var newButton = $("<button>");
            newButton.attr("data-name",pokemons[i]);
            newButton.text(pokemons[i]);
            $("#buttons").append(newButton);
       }          
    }

    function displayPokemon() {
        var pokemon= $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        pokemon + "&api_key=EGEKyyvU9sBFaCFAdcVl69RzrlWGiUPI&limit=10";
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
                
                    var imageDiv = $("<div class='item'>");

                    var pokemonImage = $("<img");
                    pokemonImage.attr("src". results[i].images.fixed_height_still.url);
                    pokemonImage.attr("alt", title);
                
                    var ratingP = $("<p>");
                    var ratingInfo = $("<p>").text("Rating: " + rating);
                
                    imageDiv.prepend(ratingInfo);
                    imageDiv.prepend(pokemonImage);
                    $("#image-box").prepend(imageDiv);
                }
        });
    }


    $("#add-pokemon").on("click", function(event) {
        event.preventDefault();

        var addedPokemon = $("#pokemon-input").val().trim();  

        pokemon.push(addedPokemon);
        $("#pokemon-input").val('');

        generateButtons();

    });

});