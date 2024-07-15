//Change image media query dot icon

document.addEventListener("DOMContentLoaded", (event) => {
  const dotIconContainer = document.getElementById("dotIcon");

  if (dotIconContainer) {
    dotIconContainer.addEventListener("mouseover", () => {
      const dotIcon = dotIconContainer.querySelector(".dotIcon");
      if (dotIcon) {
        dotIcon.src = "../assets/img/dotIconBlue.svg";
      }
    });

    dotIconContainer.addEventListener("mouseout", () => {
      const dotIcon = dotIconContainer.querySelector(".dotIcon");
      if (dotIcon) {
        dotIcon.src = "../assets/img/dotIcon.svg";
      }
    });
  }
});

//Close small Add contact overlay

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("closeAddOverlay").addEventListener("click", function () {
        document.querySelector(".addNewContactOverlay").classList.add("hidden");
    });
  });
