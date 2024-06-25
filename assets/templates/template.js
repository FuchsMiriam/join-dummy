//Template einbinden
let resultTemplate = false;
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      resultTemplate = true;
      return;
    }
  }
}

function initHTML(){
  includeHTML();
  setTimeout(() => {
    hoverSidebar();
  }, 500);
}

function hoverSidebar(){
  var path = window.location.pathname;
  var page = path.split("/").pop();
  let docu = document.referrer;
  const index = docu.lastIndexOf('/') + 1; // Find the position of the last '/'
  const fileName = docu.substring(index);

  if((fileName == "index.html") && ((page == "privacy_policy.html") || (page == "legal_notice.html")))
    document.getElementById("menu_Sidebar").classList.add("d-none");
  else
  document.getElementById("menu_Sidebar").classList.remove("d-none");
  
  setHoverFrames(page)
  setInitialsName(); 
}

function setHoverFrames(page){
  if(page == "summary.html")
    setHover("frameSummary", "imgFrameSummary", "imgHoverSummary");
  if(page == "add_task.html")
    setHover("frameAddtasks", "imgFrameAddtask", "imgHoverAddtask");
  if(page == "board.html")
    setHover("frameBoard", "imgFrameBoard", "imgBoardHover");
  if(page == "contacts.html")
    setHover("frameContacts", "imgFrameContacts", "imgHoverContacts");
  if(page == "privacy_policy.html")
    document.getElementById("framePolicy").classList.add("framesPolicy");
  if(page == "legal_notice.html")
    document.getElementById("frameNotice").classList.add("framesPolicy");
}

function setHover(frame, imgFrame, imgHover){
  document.getElementById(frame).classList.add("nohover");
  document.getElementById(frame).classList.add("menuFramesHover");
  document.getElementById(imgFrame).classList.add(imgHover);
}

function setInitialsName(){
  let name = loadLoginName();
  if(name == null)
    document.getElementById("idLoginName").innerHTML = "G";
  else{
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part.charAt(0)).join('');
  
    document.getElementById("idLoginName").innerHTML =  initials;
  }
}

function getInitials(name) {
  if(name == null)
    return "G";
  const nameParts = name.split(' ');
  const initials = nameParts.map(part => part.charAt(0)).join('');

  return initials;
}

let clickName = 0;
function openNoteHeader(){
  if(clickName)
    clickName = 0;
  else
  clickName = 1;
}

window.addEventListener("click", function(event) {
  if(clickName == 1){
    document.getElementById("headerNote").classList.remove("d-none");
    clickName = 2;
  }
  else{
    document.getElementById("headerNote").classList.add("d-none");
    clickName = 0;
  }
});

function openIndex() {
  window.location.href = "../index.html";
}