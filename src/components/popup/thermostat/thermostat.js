//Элементы термостата
var thermostat, thermostatYellow, thermostatGrey, thermostatArrow, thermostatTemp;
//Центр термостата
var centerX, centerY;

//Настройки
var tempMin = -23, tempMax = 23, //минимальная и максимальные температуры
    arcMin = -150, arcMax = 150, //минимум и максимум дуг
    radius = 100; //радиус

//Регистрация термостата
function registerThermostat() {
    if (thermostat) return;
    thermostat = document.getElementById('thermostat');
    thermostatYellow = document.getElementById('thermostatYellow');
    thermostatGrey = document.getElementById('thermostatGrey');
    thermostatArrow = document.getElementById('thermostatArrow');
    thermostatTemp = document.getElementById('thermostatTemp');

    centerX = thermostat.offsetWidth / 2;
    centerY = thermostat.offsetHeight / 2;

    registerThermostatEvents();
}

//Регистрация событий термостата
function registerThermostatEvents() {
    thermostat.addEventListener('click', function (e) {
        var deg = Math.atan2(centerY - e.offsetY, centerX - e.offsetX) * 180 / Math.PI - 90;

        renderThermostat(deg)
    });

    thermostat.addEventListener('touchmove', function (e) {
        var stat = thermostat.getBoundingClientRect();
        var centerX = stat.left + stat.width / 2;
        var centerY = stat.top + stat.height / 2;
        var touch = e.touches[0];
        var deg = Math.atan2(centerY - touch.clientY, centerX -touch.clientX) * 180 / Math.PI - 90;

        renderThermostat(deg)
    })
}

//Отрисовка изменяемых данных термостата
export default function renderThermostat(deg) {
    registerThermostat();

    if (deg < -180) deg += 360;
    if (deg > 180) deg -= 360;

    if (deg < arcMin) deg = arcMin;
    if (deg > arcMax) deg = arcMax;

    //Получение центра термостата для корректной отрисовки дуг
    // var thermostat = document.getElementById('thermostat');
    // var centerX = thermostat.offsetWidth / 2;
    // var centerY = thermostat.offsetHeight / 2;

    //Расчет температуры в зависимости от угла (deg - -150) / 300 * 46 + -23
    var temp = (deg - arcMin) / (arcMax - arcMin) * (tempMax - tempMin) + tempMin;

    //Отрисовка дуг термостата
    thermostatYellow.setAttribute("d", describeArc(centerX, centerY, radius, arcMin, arcMax));
    thermostatGrey.setAttribute("d", describeArc(centerX, centerY, radius, deg, arcMax));
    //Поворот стрелки термостата
    thermostatArrow.style.transform = 'rotate('+ deg +'deg)';
    //Вывод текста внутри термостата
    temp = Math.round(temp);
    thermostatTemp.innerText = (temp > 0 ? '+' : '') + temp;
}

//Расчет координат для отрисовки дуги в svg
//Взято с https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle/18473154#18473154
function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}

//Преобразование полярных координаты в Декартовы
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}