const DEFAULT_INSTANCE = "test.cynic.moe";

function get_instance() {
    return localStorage.getItem("instance") || DEFAULT_INSTANCE;
}

function set_instance(addr) {
    localStorage.setItem("instance", addr);
}

function clear_instance() {
    localStorage.setItem("instance", DEFAULT_INSTANCE);
}
