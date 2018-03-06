

$(document).ready(function () {

    var searchMain = ["Soccer", "Car", "LOL"];

    function displayPic() {
        var searchWas = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchWas + "&api_key=N1GOuKpOBUZYbPYyfNR3HHJGyeKUsrGu&limit=8";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            console.log(response)
            searchForGif(response)
            console.log(response)

            $(".gif").mouseover(
                function(){
                    var state = $(this).attr("data-state");
    
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
    

             
        
                });

        });
    }
    function searchForGif(response) {
        $("#dopring").empty()
        var results = response.data;


        for (var i = 0; i < results.length; i++) {

            var imgLocation = $("<div class='userPick'>");

            var urlStill = results[i].images.fixed_height_still.url;
            var urlPlay = results[i].images.fixed_height.url;

            var gif = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlPlay).attr("data-state", "still");

            imgLocation.append(gif)
            $("#dopring").append(imgLocation);


        }
    }


    function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < searchMain.length; i++) {
            var a = $("<button>");
            a.addClass("pic btn btn-outline-primary");
            a.attr("data-name", searchMain[i]);
            a.text(searchMain[i]);
            $("#buttons-view").append(a);
        }
    }

    $("#add-pic").on("click", function (event) {
        event.preventDefault();
        var searchWas = $("#search-input").val().trim();
        searchMain.push(searchWas)
        renderButtons()
    });


    $(document).on("click", ".pic", displayPic);


    // Calling the renderButtons function to display the intial buttons
    renderButtons();

});