const popupLinks = document.querySelectorAll('.popup-link'); // при клике на элемент с этим классом будет открываться popup
const body = document.querySelector('body'); // для блокировки скрола основного контента
const lockPadding = document.querySelectorAll('.lock-padding'); // padding вместо скрола основного контента

let unlock = true; // чтобы небыло двойных нажатий (в момент анимации)

const timeout = 800; // длительность анимации, совпадает с css

// вешаем событие click на ссылки popupLink
if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', ''); // получаем чистое имя без #
            const curentPopup = document.getElementById(popupName); // элемент id которого равен popupName
            popupOpen(curentPopup); // передаем результат функции в функцию открывающую popup
            e.preventDefault(); // запрещаем перезагрузку страницы
        });
    }
}

// закрываем popup любым способом (объектом) находящимся внутри popup и имеющим класс .close-popup
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) { // получаем конкретный объект и вешаем на него событие click
            popupClose(el.closest('.popup')); // отправляем в функцию popupClose ближайшего родителя нажатой ссылки
            e.preventDefault(); // запрещаем перезагрузку страницы
        });
    }
}

// функция открывающая popup
function popupOpen(curentPopup) { // передаём готовый объект, по имени (идентификатору)
    if (curentPopup && unlock) { // есть ли такой объект и открыта ли переменная unlock
        const popupActive = document.querySelector('.popup.open'); // получаем открытый popup
        if (popupActive) {
            popupClose(popupActive, false); //если он существует то закрыть его
        } else {
            bodyLock(); // если его нету, тогда блочим body
        }
        curentPopup.classList.add('open'); // к переданому popup добавляем класс open и popup откроется
        curentPopup.addEventListener("click", function (e) { // вешаем событие click
            if (!e.target.closest('.popup__content')) { // если у нажатого объекта нет в родителях объекта (popup контента) с классом popup__content. А это всё что выше popup, т.е. темный фон.
                popupClose(e.target.closest('.popup')); // тогда передаем его в функцию закрывающую popup
            }
        });
    }
}

// закрываем popup. Передаем сюда открытый объект popupActive и значение doUnlock
// чтобы понимать стоит ли дальше использовать блокировку скролла или нет.
// Нужно на случай переоткрытия одного popup на другой popup
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open'); // У активного popup убираем класс open и popup закрывается
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

// скрываем скролл основного контента. Высчитываем разнизу между шириной вьюпорта и шириной объекта внутри него
function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    const btnUp = document.querySelector('.btn-up');

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue; // каждому объекту lockPadding добавляем padding равный ширине скрола
            btnUp.style.marginRight = lockPaddingValue; // кнопке "наверх" добавляем margin равный ширине скрола 
        }
    }
    body.style.paddingRight = lockPaddingValue; // body тоже добавляем padding равный ширине скрола  
    body.classList.add('lock');

    unlock = false; // на время блокируем unlock, чтобы избежать случайных нажатий в момент анимации открытия/закрытия
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

// открываем скролл и убираем padding и margin с интервалом во времени, чтобы небыло смещений popup в момент его закрытия
function bodyUnLock() {
    const btnUp = document.querySelector('.btn-up');

    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px'; // у каждого объекта lockPadding убираем padding
                btnUp.style.marginRight = '0px'; // у кнопки "наверх" убираем padding
            }
        }

        body.style.paddingRight = '0px'; // убираем padding у body
        body.classList.remove('lock');
    }, timeout);

    unlock = false; // на время блокируем unlock, чтобы избежать случайных нажатий в момент анимации открытия/закрытия
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

// закрытие popup по Esc
document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

// функция полифил для IE 11
(function () {
    // проверяем поддержку
    if (!Element.prototype.closest) {
        // реализуем
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();

// функция полифил для IE 11
(function () {
    // проверяем поддержку
    if (!Element.prototype.matches) {
        // определяем свойство
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();

// Подставляем картинку в popup для просмотра в исходном размере
function getImagePath(event) {
    // Получаем элемент, на который кликнули
    var clickedElement = event.target;

    // Проверяем, является ли элемент изображением
    if (clickedElement.tagName === 'IMG') {
        // Получаем путь к картинке
        var imagePath = clickedElement.src;

        // Находим элемент изображения внутри попапа
        var popupImage = document.querySelector('.popup__image img');

        // Устанавливаем полученный путь к картинке в атрибут src изображения
        popupImage.src = imagePath;
    }
}
// Находим все изображения с классом "popup-link_img"
var images = document.querySelectorAll('.popup-link_img img');
// Добавляем обработчик события клика для каждого изображения
images.forEach(function (image) {
    image.addEventListener('click', getImagePath);
});