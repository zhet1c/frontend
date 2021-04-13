// ----------------------------------------------------------------
// Fetch metadata and create a table
// ----------------------------------------------------------------

function load_titles(remote) {
    if(remote == ""){
        return;
    }
    fetch(remote)
    .then(res => res.json())
    .then(function (res) {
        var table = document.querySelector("#title_list #table tbody");
        res.forEach(manga => {
            //row 1
            var first_row = document.createElement("tr");
            first_row.className = "first_row";
            table.appendChild(first_row);

            //thumbnail
            first_row.appendChild(Object.assign(
                document.createElement("td"),
                {rowSpan: "2"}
            ))
            .appendChild(Object.assign(
                document.createElement("a"),
                {href: "./title.html?id="+manga["id"]}
            ))
            .appendChild(Object.assign(
                document.createElement("img"),
                {className: "thumbnail", src: "https://test.cynic,moe/manga/thumbnail?id="+manga["id"]}
            ));

            //title
            first_row.appendChild(Object.assign(
                document.createElement("td"),
                {}
            ))
            .appendChild(Object.assign(
                document.createElement("b"),
                {textContent: manga["titles"][0]}
            ));

            //artist
            first_row.appendChild(Object.assign(
                document.createElement("td"),
                {textContent: manga["artists"][0]}
            ));

            //status
            first_row.appendChild(Object.assign(
                document.createElement("td"),
                {textContent: manga["publication_status"]}
            ));

            //chapters
            first_row.appendChild(Object.assign(
                document.createElement("td"),
                {textContent: ""}
            ));

            //timestamp
            first_row.appendChild(Object.assign(
                document.createElement("td"),
                {textContent: ""}
            ));

            //row 2
            var second_row = document.createElement("tr");
            second_row.className = "second_row";
            table.appendChild(second_row);

            //tags
            var tag_cell = document.createElement("td");
            second_row.appendChild(tag_cell);
            manga["genres"].forEach(tag => {
                tag_cell.appendChild(Object.assign(
                    document.createElement("span"),
                    {className: "tag", textContent: tag}
                ));
            });

            //author
            second_row.appendChild(Object.assign(
                document.createElement("td"),
                {textContent: manga["authors"][0]}
            ));

            //filler
            second_row.appendChild(Object.assign(
                document.createElement("td"),
                {colSpan: "2"}
            ))
            .appendChild(Object.assign(
                document.createElement("a"),
                {href: "https://mangaupdates.com/series.html?id=" + manga["mangaupdates_id"]}
            ))
            .appendChild(Object.assign(
                document.createElement("img"),
                {src: "img/mangaupdates.ico"}
            ));

            //time since last update
            second_row.appendChild(Object.assign(
                document.createElement("td"),
                {textContent: "(" + "ago)"}
            ));
        });
    });
}

function rm_titles() {
    var par = document.querySelector("#title_list #table tbody");
    while(par.firstChild()){
        par.removeChild(par.firstChild());
    }
}
