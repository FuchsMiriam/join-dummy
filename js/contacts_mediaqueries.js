/*Change image media query dot icon*/

document.addEventListener('DOMContentLoaded', (event) => {
    const dotIcon = document.getElementById('dotIcon');
  
    dotIcon.addEventListener('mouseover', () => {
        dotIcon.src = '../assets/img/dotIconBlue.svg';
    });
  
    dotIcon.addEventListener('mouseout', () => {
        dotIcon.src = '../assets/img/dotIcon.svg';
    });
  });