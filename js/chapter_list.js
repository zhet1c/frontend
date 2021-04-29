// ----------------------------------------------------
// Fetch metadata for one title and fill out a page
// ----------------------------------------------------

function load_info(remote, id) {
    base = remote;
    remote += "/manga/from_id?id=" + id;
    fetch(remote)
    .then(manga => manga.json())
    .then(function (manga) {
        var text = document.querySelector("#info #text");
        document.getElementById("cover").src = base+"/thumbnail/"+id+".webp";

        text.appendChild(Object.assign(
            document.createElement("h2"),
            {textContent: manga["titles"][0]}
        ));
        text.appendChild(Object.assign(
            document.createElement("span"),
            {textContent: get_utf_kanji(manga["titles"].slice(1).join(" | ")), className: "subtitle"}
        ));

        text.appendChild(document.createElement("hr"));

        text.appendChild(Object.assign(
            document.createElement("p"),
            {textContent: "Artist(s): " + manga["artists"].join(", ")}
        ));

        text.appendChild(Object.assign(
            document.createElement("p"),
            {textContent: "Author(s): " + manga["authors"].join(", ")}
        ));

        text.appendChild(Object.assign(
            document.createElement("p"),
            {textContent: "Status: " + manga["publication_status"]}
        ));

        text.appendChild(Object.assign(
            document.createElement("p"),
            {textContent: "Last Updated: "}
        ));

        var tags = document.createElement("p");
        text.appendChild(tags);
        manga["genres"].forEach(tag => {
            tags.appendChild(Object.assign(
                document.createElement("span"),
                {className: "tag", textContent: tag}
            ));
        });
    });
}

function load_chapters(remote, id) {
    remote += "/manga/get_chapters?id=" + id;
    fetch(remote)
    .then(res => res.json())
    .then(function (res) {
        var table = document.querySelector("#chapters #table tbody");

        res.forEach(function (chapter, index) {
            var row = table.appendChild(document.createElement("tr"));

            //number
            row.appendChild(document.createElement("td"))
            .appendChild(Object.assign(
                document.createElement("p"),
                {textContent: chapter["chapter_no"]+"."+chapter["chapter_postfix"]}
            ));

            //title
            row.appendChild(document.createElement("td"))
            .appendChild(Object.assign(
                document.createElement("a"),
                {textContent: chapter["title"], href: "./reader.html?cid="+chapter["ipfs_link"]+"&pages="+chapter["page_count"]+"&title="+chapter["title"].replaceAll(" ", "+")}
            ));

            //group
            row.appendChild(Object.assign(
                document.createElement("td"),
                {textContent: chapter["group_id"]}
            ));

            //page count
            row.appendChild(Object.assign(
                document.createElement("td"),
                {textContent: chapter["page_count"]}
            ));

            //date
            row.appendChild(Object.assign(
                document.createElement("td"),
                {textContent: new Date(chapter["date_added"]).toLocaleString()}
            ));
        });
    });
}

function get_utf_kanji(str) {
    return str.replace(
        /[\uff01-\uff5e]/g,
        function(ch) { return String.fromCharCode(ch.charCodeAt(0) - 0xfee0); }
    );
}

function load(remote){
    var url = new URL(window.location.href);
    if(url.searchParams.has("id")){
        var id = url.searchParams.get("id");
        load_info(remote, id);
        load_chapters(remote, id);
    }
}
