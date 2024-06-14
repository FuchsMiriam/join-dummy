/*Change image media query dot icon*/

document.addEventListener("DOMContentLoaded", (event) => {
  const dotIcon = document.getElementById("dotIcon");

  dotIcon.addEventListener("mouseover", () => {
    dotIcon.src = "../assets/img/dotIconBlue.svg";
  });

  dotIcon.addEventListener("mouseout", () => {
    dotIcon.src = "../assets/img/dotIcon.svg";
  });
});

/*Close small Add contact overlay*/

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("closeAddOverlay").addEventListener("click", function () {
        document.querySelector(".addNewContactOverlay").classList.add("hidden");
        document.querySelector(".addNewContactOverlay").classList.remove("visible");
    });
  });
