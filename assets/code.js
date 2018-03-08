

$(document).ready(function () {

    var searchMain = ["Soccer", "Car", "LOL"];

    function displayPic() {
        var searchWas = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchWas + "&api_key=ivZ1e4C58StoCCZcRa3s4zTvf47LqPZ6&limit=8";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            console.log(response)
            searchForGif(response)
            console.log(response)

            $(".gif").mouseover(
                function () {
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
            var rating = results[i].rating;
            var title = results[i].title;
            var urlStill = results[i].images.fixed_height_still.url;
            var urlPlay = results[i].images.fixed_height.url;
            var gif = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlPlay).attr("data-state", "still");
            var dropTitle = $("<div class = 'raiting drop'>").text("#"+title)
            var dropRaiting = $("<div class = 'raiting drop'>").text("Raiting:"+rating)
            imgLocation.append(gif);
            imgLocation.append(dropTitle);
            imgLocation.append(dropRaiting);
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