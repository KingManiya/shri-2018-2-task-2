var arrowLeft = document.getElementById('block__scenarios__arrow_left');
var arrowRight = document.getElementById('block__scenarios__arrow_right');

//Перелистывание страницы сценариев
function list(directionRight) {
    var pages = document.getElementById('block__scenarios__cards');

    if (directionRight) {
        window.scenariosPage++;
    } else {
        window.scenariosPage--;
    }
    var pageHeight = pages.parentNode.offsetHeight + 10;
    var pagesHeight = pages.offsetHeight + 10;
    var countPages = Math.ceil(pagesHeight / pageHeight) - 1;

    if (window.scenariosPage > countPages) window.scenariosPage = countPages;
    if (window.scenariosPage < 0) window.scenariosPage = 0;

    if (window.scenariosPage === 0) {
        arrowLeft.classList.remove('arrow_active');
    } else {
        arrowLeft.classList.add('arrow_active');
    }
    if (window.scenariosPage === countPages) {
        arrowRight.classList.remove('arrow_active');
    } else {
        arrowRight.classList.add('arrow_active');
    }

    pages.style.transform = 'translateY(' + (-pageHeight * window.scenariosPage) + 'px)';
}

//Регистрация событий сценариев
function registerScenariosEvents() {
    window.scenariosPage = 0;

    arrowLeft.addEventListener('click', function () {
        list(false);
    });
    arrowRight.addEventListener('click', function () {
        list(true);
    });
}

registerScenariosEvents();