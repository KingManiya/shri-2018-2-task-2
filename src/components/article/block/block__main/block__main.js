//Отображение двойной стрелочки
var mainCards = document.getElementById('block__main__cards');
const mainDoubleArrow = document.getElementById('block__main__doubleArrow');
mainCards.addEventListener('scroll', function () {
    mainDoubleArrow.hidden = !!mainCards.scrollTop;
});