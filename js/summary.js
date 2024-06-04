const BASE_URL = "https://join-78ba4-default-rtdb.europe-west1.firebasedatabase.app/";
let tasks = [];
let result = false;
function init(){
    // includeHTML();
    // hoverSidebar();

    includeHTML().then(function() {
        hoverSidebar();})
    // loadTasks().then((result) => {
    //     hoverSidebar();
    // });
}


async function loadTasks(){
    let response = await fetch(BASE_URL + ".json");
    let responseToJSON = await response.json();
    tasks = responseToJSON;
    result = true;
}