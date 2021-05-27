function get_instance() {
    var addr = "test.cynic.moe";
    var cookie = document.cookie;
    if(cookie != "") {
	 addr = decodeURIComponent(cookie).split(";")[0].split("=")[1];
    }
    return addr;
}

function set_instance(addr) {
    var str = "Instance="+addr+"; SameSite=Lax;";
    document.cookie = str;
}

function clear_instance() {
    document.cookie = "Instance=test.cynic.moe; SameSite=Lax;";
}
