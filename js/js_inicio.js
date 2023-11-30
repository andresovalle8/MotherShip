$(document).ready(function () {
    function showPopup(popupSelector) {
        $(popupSelector).addClass('show');
        $(popupSelector + ' .pop-wrap').addClass('show');
    }

    function hidePopup(popupSelector) {
        $(popupSelector).removeClass('show');
        $(popupSelector + ' .pop-wrap').removeClass('show');
    }

    $("#close").click(function () {
        hidePopup('.pop-up');
        hidePopup('.register');
    });

    $(".header-button-inicio").click(function () {
        hidePopup('.register');  // Oculta el pop-up de registro si está abierto
        showPopup('.pop-up');
    });

    $(".registro").click(function () {
        hidePopup('.pop-up');  // Oculta el pop-up de inicio si está abierto
        showPopup('.register');
    });
});
