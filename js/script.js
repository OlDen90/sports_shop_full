// "use strict"

/* ------ Определяем тип устройства ------- */
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};

if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu__arrow');
    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++) {
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener("click", function (e) {
                menuArrow.parentElement.classList.toggle('_active');
            });
        }
    }

} else {
    document.body.classList.add('_pc');
}

/* ------ Меню бургер ------- */
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {

    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    })
}

/* ------ Прокрутка при клике в шапке ------- */
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            // правильный вариант
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
            // // костыль
            // const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            };

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}
/* ------ Прокрутка при клике в сайдбаре ------- */
const sidebarLinks = document.querySelectorAll('.sidebar__link[data-goto]');
if (sidebarLinks.length > 0) {
    sidebarLinks.forEach(sidebarLink => {
        sidebarLink.addEventListener("click", onSidebarLinkClick);
    });

    function onSidebarLinkClick(e) {
        const sidebarLink = e.target;
        if (sidebarLink.dataset.goto && document.querySelector(sidebarLink.dataset.goto)) {
            const gotoBlock = document.querySelector(sidebarLink.dataset.goto);

            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            };

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

/* ------ Прокрутка при клике в сайдбаре ------- */
const footerLinks = document.querySelectorAll('.footer__link[data-goto]');
if (footerLinks.length > 0) {
    footerLinks.forEach(footerLink => {
        footerLink.addEventListener("click", onFooterLinkClick);
    });

    function onFooterLinkClick(e) {
        const footerLink = e.target;
        if (footerLink.dataset.goto && document.querySelector(footerLink.dataset.goto)) {
            const gotoBlock = document.querySelector(footerLink.dataset.goto);

            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            };

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

/* ------ Кнопка наверх ------- */
const btnUp = {
    el: document.querySelector('.btn-up'),
    scrolling: false,
    show() {
        if (this.el.classList.contains('btn-up_hide') && !this.el.classList.contains('btn-up_hiding')) {
            this.el.classList.remove('btn-up_hide');
            this.el.classList.add('btn-up_hiding');
            window.setTimeout(() => {
                this.el.classList.remove('btn-up_hiding');
            }, 300);
        }
    },
    hide() {
        if (!this.el.classList.contains('btn-up_hide') && !this.el.classList.contains('btn-up_hiding')) {
            this.el.classList.add('btn-up_hiding');
            window.setTimeout(() => {
                this.el.classList.add('btn-up_hide');
                this.el.classList.remove('btn-up_hiding');
            }, 300);
        }
    },
    addEventListener() {
        // при прокрутке окна (window)
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            if (this.scrolling && scrollY > 0) {
                return;
            }
            this.scrolling = false;
            // если пользователь прокрутил страницу более чем на 200px
            if (scrollY > 400) {
                // сделаем кнопку .btn-up видимой
                this.show();
            } else {
                // иначе скроем кнопку .btn-up
                this.hide();
            }
        });
        // при нажатии на кнопку .btn-up
        document.querySelector('.btn-up').onclick = () => {
            this.scrolling = true;
            this.hide();
            // переместиться в верхнюю часть страницы
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
}

btnUp.addEventListener();


/* ------ Дата в формате - Суббота, 1 неделя Января 2022 года ------- */

function getDayInfo(dateString) {
    // Дни недели в соответствии с локализацией
    const weekDays = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота"
    ];

    // Месяцы в соответствии с локализацией
    const months = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря"
    ];

    // Парсим строку с датой или используем текущую дату, если аргумент не задан
    const date = dateString ? new Date(dateString) : new Date();

    // Проверяем, является ли значение даты корректным
    if (isNaN(date)) {
        return "Некорректная дата";
    }

    // Получаем день недели, день, месяц и год
    const weekDay = weekDays[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Получаем первый день месяца
    const firstDayOfMonth = new Date(year, date.getMonth(), 1);

    // Вычисляем номер недели в пределах текущего месяца
    const weekNumber = Math.ceil((day + firstDayOfMonth.getDay() - 1) / 7);

    // Формируем строку с результатом
    const result = `${weekDay}, ${weekNumber} неделя ${month} ${year} года`;

    // Возвращаем результат
    return result;
}

/* ------ Выводим дату в карточку ------- */
// Находим все элементы с классом 'page_section__item' и 'new'
var newElements = document.querySelectorAll('.page_section__item.new');

// Перебираем каждый элемент и добавляем в него текущую дату
for (var i = 0; i < newElements.length; i++) {
    var newElement = newElements[i];
    var dateElement = newElement.querySelector('.date'); // Находим элемент с классом 'date'

    // Проверяем, была ли уже добавлена дата в эту карточку
    if (!newElement.hasAttribute('data-date-added')) {
        var currentDate = getDayInfo(); // Получаем текущую дату

        dateElement.textContent = currentDate; // Вставляем дату в элемент
        newElement.setAttribute('data-date-added', 'true'); // Добавляем атрибут для отметки, что дата уже была добавлена
    }
}


/* ------ Вариант вывода даты в карточку с использованием localStorage ------- */
// function addDateToCard(cardElement, date) {
//     var dateElement = cardElement.querySelector('.date');
//     dateElement.textContent = date;
// }

// function saveDates() {
//     var cards = document.querySelectorAll('.page_section__item.new');
//     var dates = {};

//     for (var i = 0; i < cards.length; i++) {
//         var card = cards[i];
//         var cardId = card.getAttribute('data-card-id');
//         var dateElement = card.querySelector('.date');
//         var date = dateElement.textContent;

//         dates[cardId] = date;
//     }

//     localStorage.setItem('cardDates', JSON.stringify(dates));
// }

// function loadDates() {
//     var dates = localStorage.getItem('cardDates');

//     if (dates) {
//         dates = JSON.parse(dates);
//         var cards = document.querySelectorAll('.page_section__item.new');

//         for (var i = 0; i < cards.length; i++) {
//             var card = cards[i];
//             var cardId = card.getAttribute('data-card-id');

//             if (dates.hasOwnProperty(cardId)) {
//                 var date = dates[cardId];
//                 addDateToCard(card, date);
//             }
//         }
//     }
// }
// loadDates();

