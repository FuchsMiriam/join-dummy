// Funktion für die Animation auf der Login-Seite

window.onload = function() {
    const logo = document.getElementById('animatedLogo');
    const content = document.getElementById('contentMainpage');

    setTimeout(() => {
        logo.style.width = '100.03px';
        logo.style.height = '121.97px';
        logo.style.top = '80px';
        logo.style.left = '77px';
    }, 1000);

    function onTransitionEnd() {
        logo.removeEventListener('transitionend', onTransitionEnd);

        content.classList.remove('hiddenMainpage');
        /*content.classList.add('visibleMainpage');*/
    }

    logo.addEventListener('transitionend', onTransitionEnd);
};

// Funktion zur Weiterleitung auf die Sign-up-Seite

function redirectToSignUpPage() {
    window.location.href = './signup.html';
  }
