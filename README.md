<h1 align="center">Movies. Поиск фильмов через сервис BeatFilm</h1>
<h2 align="center">Дипломная работа в рамках обучения на Я.Практикуме</h2>
<img src="./readme/main.png" width="100%">
<h2 align="center"> Используемые технологии &#128187;</h2>

- JavaScript
- React.js
- Git
- Express.js
- mongoDB
- HTML
- CSS

<h2 align="center">Описание проекта &#128444</h2>

Проект представляет собой поисковый сервис с помощью которого можно с помощью поиска найти фильмы на стороннем ресурсе BeatFilm.

При первом входе пользователь попадает на главную страницу с описанием информации по созданному проекту.

Пользователю предоставляется возможность перейти на страницу регистрации или входа в правой верхней части экрана.

После успешной регистрации/авторизации, пользователь попадает на страницу поиска фильмов - необходимо ввести ключевое слово и нажать на кнопку поиск, также среди найденных фильсов можно произвести фильтрацию на короткометражные фильмы (менее 40 минут включительно), нажав на переключатель. При нажатии на фильм на новой вкладке открывается трейлер данного фильма.

Понравившиеся фильмы можно добавить в Сохраненные - поставить лайк &#128156;. Удалить фильм из любимых можно повторным нажатием на сердечко либо со страницы Сохраненные фильмы при нажатии на крестик &#10006;. На странице Сохраненные фильмы можно также произвести аналогичный поиск.

Имеется возможность изменения данных пользователя при переходе на страницу профиля - имя пользователя и его электронную почту.

<img src="./readme/video.gif" width="100%">
<h2 align="center"> Инструкция по развертыванию &#128212;</h2>
<p align="center">Хотите попробовать в использовании данный ресурс?</p>

1. Клонируйте данный репозиторий локально
2. Клонируйте репозиторий с бэкендом - [&#128073;&#128161;](https://github.com/MariaRez/movies-explorer-api)
3. В бэкенде на строке 32 измените порт на 3001
4. Запустите бэкенд командой npm run dev
5.  В клонированном фронтенде в файлах /src/utils/auth.js и /src/utils/MainApi.jsна 56 и 83 строках соответственно замените baseUrl на "http://localhost:3001"
6. Запустите фронтенд командой npm run start
7. Наслаждайтесь функционалом &#127881;

<h2 align="center"> Планы по доработке проекта &#128221; </h2>

- Закрытие модальных окон при нажатии на Escape
- Закрытие модальных окон при нажатии на клику все окна
- Фильтрация фильмов по различным критериям - страна производства, язык фильма и другие критерии
- Возможность добавления и изменения аватара пользователя
- Функция восстановления пароля
- Изменение пароля пользователя

<h2 align="center"> Дополнительная информация &#128222;</h2>

- Публичный IP 158.160.57.76
- [Ссылка на фронтенд (ограниченный срок гранта - может не работать)](https://mariarez.students.nomoredomainsclub.ru)
- [Ссылка на бэкенд (ограниченный срок гранта - может не работать)](https://api.mariarez.students.nomoredomains.club)
- [Ссылка на сгенерированный макет](https://disk.yandex.ru/d/XLTAY9OVFSzRHw)