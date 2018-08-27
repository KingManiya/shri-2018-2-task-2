import renderThermostat from "./thermostat/thermostat";
import "./slider/slider";

renderThermostat(108); //+17 градусов

var popup;
function togglePopup(type) {
    document.body.classList.toggle('with_popup');
    if (type) {
        popup = document.getElementById(type);
    } else {
        popup = document.querySelector('.popup__wrapper.show');
    }
    popup.classList.toggle('show');
}
window.togglePopup = togglePopup;