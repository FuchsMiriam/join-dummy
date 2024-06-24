//Template einbinden
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
      return;
    }
  }
}


function hoverSidebar(){
  var path = window.location.pathname;
  var page = path.split("/").pop();
  
  if(page == "summary.html")
  {
    document.getElementById("frameSummary").classList.add("nohover");
    document.getElementById("frameSummary").classList.add("menuFramesHover");
    document.getElementById("imgFrameSummary").classList.add("imgHoverSummary");
  }

  if(page == "add_task.html")
  {
    document.getElementById("frameAddtasks").classList.add("nohover");
    document.getElementById("frameAddtasks").classList.add("menuFramesHover");
    document.getElementById("imgFrameAddtask").classList.add("imgHoverAddtask");
  }

  if(page == "board.html")
  {
    document.getElementById("frameBoard").classList.add("nohover");
    document.getElementById("frameBoard").classList.add("menuFramesHover");
    document.getElementById("imgFrameBoard").classList.add("imgBoardHover");
  }

  if(page == "contacts.html")
  {
    document.getElementById("frameContacts").classList.add("nohover");
    document.getElementById("frameContacts").classList.add("menuFramesHover");
    document.getElementById("imgFrameContacts").classList.add("imgHoverContacts");
  }
  setInitialsName(); 
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