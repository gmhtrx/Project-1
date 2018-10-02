//input artist/song/album
//need an onclick function when you click the search bar

//var database = firebase.database()

//database.ref("")

// $("#search").on("click", musicDex);

$(".submit").on("click", function (event) {

    event.preventDefault();

    musicDex();
    $("#youtube").empty();
    $("#genius").empty();

})


function musicDex() {

    var searchStuff = $("#search").val().trim();

    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q="
            + searchStuff + "&key=AIzaSyDTmuq2U1iwoNN7IDwnuJdPTClXjSUQc-o",
        method: 'GET'
    }).then(function (response) {
        // console.log(response.items)
        for (i = 0; i < 5; i++) {
            if (response.items[i].id.kind === "youtube#channel") {
                continue
            }


            var vidId = response.items[i].id.videoId
            // console.log(vidId);
            $("#youtube").append('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + vidId + '" frameborder="100" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
        }
    })

    $.ajax({
        url: "https://api.genius.com/search?q=" + searchStuff +
            "&access_token=A3QFPk4RZGxV8fgT_41uiJiCAeyXq-UhJ-xnxipOkgZSHnShtSRVdesaqTR8axQS",
        method: 'GET'
    }).then(function (response) {

        // console.log(response);

        var artist = response.response.hits[0].result.primary_artist.api_path

        // console.log(artist);

        $.ajax({
            url: "https://api.genius.com" + artist +
                "/?access_token=A3QFPk4RZGxV8fgT_41uiJiCAeyXq-UhJ-xnxipOkgZSHnShtSRVdesaqTR8axQS" +
                "&text_format=html",
            method: 'GET'
        }).then(function (response) {
            var bioPic = $("<div>");
            var img = $("<img>");
            var x = response.response;
            img.attr("src", x.artist.image_url);
            bioPic.append(img);
            $("#genius").prepend(bioPic);
            // console.log(x.artist.name);
            // console.log(x.artist.alternate_names);
            var name = x.artist.alternate_names;
            var moreName = $("<div>");
            moreName.append(name);
            $("#genius").append(moreName)

            var describe = x.artist.description.html;
            // console.log(describe)
            var bio = $("<div>");
            bio.append(describe);
            $("#genius").append(bio);

        })

    })




    function topTrack() {
        $.ajax({
            url: "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=4eb509c03c98813c8a254fc061a34193&format=json",
            method: 'GET'
        }).then(function (response) {
            // console.log(response);
        })
    }

}

function topArtist() {
    $.ajax({
        url: "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=4eb509c03c98813c8a254fc061a34193&format=json",
        method: 'GET'
    }).then(function (response) {
        // console.log(response.artists.artist[0].name);

        var ol = $("<ol>")
        $("#list").append(ol)
        for (var i = 0; i < 10; i++) {
            var li = $("<li>");
            li.html(response.artists.artist[i].name);
            li.addClass("list");
            li.data("artist",response.artists.artist[i].name);
            ol.append(li);
        }

    })
}



topArtist();

    $(document).on("click", ".list", function () {
        $("#youtube").empty();
        $("#genius").empty();

        var liLink = $(this).data("artist");
    $.ajax({

        url: "https://api.genius.com/search?q=" + liLink +
            "&access_token=A3QFPk4RZGxV8fgT_41uiJiCAeyXq-UhJ-xnxipOkgZSHnShtSRVdesaqTR8axQS",
        method: 'GET'
    }).then(function (response) {

        // console.log(response);

        var artist = response.response.hits[0].result.primary_artist.api_path

        // console.log(artist);

        $.ajax({
            url: "https://api.genius.com" + artist +
                "/?access_token=A3QFPk4RZGxV8fgT_41uiJiCAeyXq-UhJ-xnxipOkgZSHnShtSRVdesaqTR8axQS" +
                "&text_format=html",
            method: 'GET'
        }).then(function (response) {
            var bioPic = $("<div>");
            var img = $("<img>");
            var x = response.response;
            img.attr("src", x.artist.image_url);
            bioPic.append(img);
            $("#genius").prepend(bioPic);
            // console.log(x.artist.name);
            // console.log(x.artist.alternate_names);
            var name = x.artist.alternate_names;
            var moreName = $("<div>");
            moreName.append(name);
            $("#genius").append(moreName)

            var describe = x.artist.description.html;
            // console.log(describe)
            var bio = $("<div>");
            bio.append(describe);
            $("#genius").append(bio);
            
            $.ajax({
                url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q="
                    + liLink + "&key=AIzaSyDTmuq2U1iwoNN7IDwnuJdPTClXjSUQc-o",
                method: 'GET'
            }).then(function (response) {
                
                console.log(response.items)
                for (i = 0; i < 5; i++) {
                    if (response.items[i].id.kind === "youtube#channel") {
                        continue
                    }
                    var vidId = response.items[i].id.videoId
                    // console.log(vidId);
                    $("#youtube").append('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + vidId + '" frameborder="100" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
                }
            })
        
        })
    })  

})