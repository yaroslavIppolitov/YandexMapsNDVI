ymaps.ready(init);
import {
    data
} from '/Sechenovo_2022052514.js';
const geometry = data.geometry;
const coordinatesLonLat = geometry.coordinates[0][0];
const coordinates = [];
coordinatesLonLat.forEach(element => {
    coordinates.push([element[1], element[0]]);
});
// console.log(coordinates);

function init() {
    var myMap = new ymaps.Map("map", {
        center: coordinates[0],
        zoom: 12
    }, {
        searchControlProvider: 'yandex#search'
    });

    // Создаем многоугольник, используя вспомогательный класс Polygon.
    var myPolygon = new ymaps.Polygon([
            // Указываем координаты вершин многоугольника.
            coordinates
        ],
        // Описываем свойства геообъекта.
        {
            // Содержимое балуна.
            balloonContent: "Рыбные места"
        }, {
            // Описываем опции геообъекта.
            // Фоновое изображение.
            fillImageHref: './images/tested_ndvi_2022-07-01.jpeg',
            // Тип заливки фоном.
            fillMethod: 'stretch',
            // Убираем видимость обводки.
            stroke: false
        }
    );

    // Добавляем многоугольник на карту.
    myMap.geoObjects.add(myPolygon);
}