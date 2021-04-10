// -------------------------------------------------------------
// Search bar function
// -------------------------------------------------------------

function search_bar() {
    var query = document.querySelector("#header #search_bar").value;
    if(query != ""){
        query = query.toLowerCase().replaceAll(" ", "+");
        var url = "https://amangathing.ddns.net/search.html?title=" + query;
        console.log(query);
        window.location.href = url;
    }
}

document.querySelector("#header #search_bar").addEventListener("keydown", function (e) {
    e = e || window.event;
    if(e.keyCode == 13){
        search_bar();
        e.preventDefault();
    }
});

