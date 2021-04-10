// ----------------------------------------------------
// Search function
// ----------------------------------------------------

function search_full() {
    var parameter = [];
    //get search string
    var title = document.querySelector("#search input.title").value;
    if(title != ""){
        title = title.toLowerCase().replaceAll(" ", "+");
        parameter.push("title="+title);
    }
    //get author
    var author = document.querySelector("#search input.author").value;
    if(author != ""){
        author = author.toLowerCase().split(",").map(s => s.trim()).map(s => s.replaceAll(" ", "+"));
        parameter.push("authors="+author.join(","));
    }
    //get artist
    var artist = document.querySelector("#search input.artist").value;
    if(artist != ""){
        artist = artist.toLowerCase().split(",").map(s => s.trim()).map(s => s.replaceAll(" ", "+"));
        parameter.push("artists="+artist.join(","));
    }
    //get tags
    var tag = document.querySelector("#search input.tags").value;
    if(tag != ""){
        tag = tag.toLowerCase().split(/(?=\+|\-)/).map(s => s.trim()).map(s => s.replaceAll(" ", "+"));
        parameter.push("tags="+tag.join(","));
    }
    //sort
    var sort = document.querySelector("#content select.sort").value;
    if(sort != ""){
        parameter.push("sortby="+sort);
    }
    var query = parameter.join("&");
    return query;
}

// ----------------------------------------------------
// Event handlers
// ----------------------------------------------------

var fields = document.getElementsByTagName("input");
Array.from(fields).map(field => field.addEventListener("keydown", function (e) {
    e = e || window.event;
    if(e.keyCode == 13){
        e.preventDefault();
        search_full();
    }
}));

