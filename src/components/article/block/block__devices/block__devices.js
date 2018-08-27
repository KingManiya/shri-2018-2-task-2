//Плавная прокрутка при клике
function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollLeft;
    var perTick = difference / duration * 10;

    clearTimeout(window.devicesTimeout);
    window.devicesTimeout = setTimeout(function () {
        element.scrollLeft = element.scrollLeft + perTick;
        if (element.scrollLeft === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}

//Регистрация событий сценариев
function registerDevicesEvents() {
    var devicesCards = document.getElementById('block__devices__cards');
    var arrowLeft = document.getElementById('block__devices__arrow_left');
    var arrowRight = document.getElementById('block__devices__arrow_right');

    //При прокрутке меняет стили стрелочек
    devicesCards.addEventListener('scroll', function () {
        if (devicesCards.scrollLeft) {
            arrowLeft.classList.add('arrow_active');
        } else {
            arrowLeft.classList.remove('arrow_active');
        }
        if (devicesCards.scrollWidth - devicesCards.scrollLeft - devicesCards.offsetWidth) {
            arrowRight.classList.add('arrow_active');
        } else {
            arrowRight.classList.remove('arrow_active');
        }
    });
    //При клике на стрелки плавно листаем избранные устройства
    arrowLeft.addEventListener('click', function () {
        scrollTo(devicesCards, devicesCards.scrollLeft - devicesCards.offsetWidth, 1000);
    });
    arrowRight.addEventListener('click', function () {
        scrollTo(devicesCards, devicesCards.scrollLeft + devicesCards.offsetWidth, 1000);
    });
}

registerDevicesEvents();

