ymaps.ready(init);
var myMap, myGeoObject, myRectangle;
import {
    data
} from '/sechenovo_ndvi.js';
const images = data.image;
const pallete = data.palette;

function init() {
    let drawMap = true;
    for (const key in images) {
        if (Object.hasOwnProperty.call(images, key)) {
            const element = images[key];

            if (drawMap) {
                myMap = new ymaps.Map('map', {
                    center: [element.latitude, element.longitude],
                    zoom: 15
                }, {
                    searchControlProvider: 'yandex#search'
                });
                drawMap = false;
            };

            const colorValue = getColor(element.value);

            if (colorValue === false) {
                console.log('не нашел цвет');
                continue;
            };
            myGeoObjectRectangle(element.latitude, element.longitude, colorValue);

            console.log('нарисовал');

        }
    }



}

function getColor(colorValue) {

    if (colorValue <= -0.2) {
        return "#000000";
    } else if (colorValue > -0.2 && colorValue < 0) {
        return "#a50026";
    } else if (colorValue > 0 && colorValue <= 0.1) {
        return "#d73027";
    } else if (colorValue > 0.1 && colorValue <= 0.2) {
        return "#f46d43";
    } else if (colorValue > 0.2 && colorValue <= 0.3) {
        return "#fdae61";
    } else if (colorValue > 0.3 && colorValue <= 0.4) {
        return "#fee08b";
    } else if (colorValue > 0.4 && colorValue <= 0.5) {
        return "#ffffbf";
    } else if (colorValue > 0.5 && colorValue <= 0.6) {
        return "#d9ef8b";
    } else if (colorValue > 0.6 && colorValue <= 0.7) {
        return "#a6d96a";
    } else if (colorValue > 0.7 && colorValue <= 0.8) {
        return "#66bd63";
    } else if (colorValue > 0.8 && colorValue <= 0.9) {
        return "#1a9850";
    } else if (colorValue > 0.9 && colorValue <= 1.0) {
        return "#006837";
    } else {
        return false;
    }
}



function myGeoObjectRectangle(latitude, longitude, colorValue) {
    // Cоздаем геообъект с типом геометрии "прямоугольник".
    myGeoObject = new ymaps.GeoObject({
        // Геометрия = тип геометрии + координаты геообъекта.
        geometry: {
            // Тип геометрии - прямоугольник.
            type: 'Rectangle',
            // Координаты.
            coordinates: [
                [latitude, longitude],
                [latitude + 0.0001792, longitude + 0.000313]
            ]
        },
        // Свойства.
        // properties: {
        //     hintContent: 'Перетащи меня!',
        //     balloonContent: 'Прямоугольник 2'
        // }
    }, {
        // Опции.
        // Объект можно перетаскивать.
        draggable: false,
        // Цвет и прозрачность заливки.
        fillColor: `${colorValue}80`, //насыщенность 80%
        // Цвет и прозрачность границ.
        // strokeColor: '#3caa3c88',
        // Ширина линии.
        strokeWidth: 0
    });

    myMap.geoObjects.add(myGeoObject);
};