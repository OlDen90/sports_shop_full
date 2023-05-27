/* ------ Оформление заказа ------- */
document.getElementById("purchase-form").addEventListener("submit", function (event) {
    event.preventDefault();

    var quantity = document.getElementById("quantity").value;
    var color = document.querySelector('input[name="color"]:checked');
    // var comment = document.getElementById("comment").value;

    if (!quantity || !color) {
        alert("Пожалуйста, заполните все обязательные поля.");
        return;
    }

    alert("Поздравляем с покупкой!");
});