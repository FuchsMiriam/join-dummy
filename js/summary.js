let result = false;
function init(){
    includeHTML();
    loadInfomations().then((result) => {
        hoverSidebar();
    });
}

function loadInfomations(){
    result = true;
}