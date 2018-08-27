var sliders = document.getElementsByClassName('slider');

sliders[0].addEventListener('click', moveSliderValue.bind(undefined, sliders[0]));
sliders[1].addEventListener('click', moveSliderValue.bind(undefined, sliders[1]));

function moveSliderValue(slider, e) {
    var sliderValue = document.querySelector('.popup__wrapper.show .slider__value');
    var sliderRect = slider.getBoundingClientRect();

    var value;
    var valueMax;
    var vertical = sliderRect.width < sliderRect.height;

    if (vertical) {
        value = e.clientY - sliderRect.top - sliderValue.offsetHeight / 2;
        valueMax = sliderRect.height - sliderValue.offsetHeight;

    } else {
        value = e.clientX - sliderRect.left - sliderValue.offsetWidth / 2;
        valueMax = sliderRect.width - sliderValue.offsetWidth;
    }

    if (value < 0) value = 0;
    if (value > valueMax) value = valueMax;

    if (vertical) {
        sliderValue.style.top =  value + 'px';
        sliderValue.style.left = 0;
    } else {
        sliderValue.style.top = 0;
        sliderValue.style.left = value + 'px';
    }


}