<h1 align="center" style="color:#073042" >Movies. Поиск фильмов через сервис BeatFilm</h1>
<p align="center" style="font-weight:bolder">Дипломная работа в рамках обучения на Я.Практикуме</p>
<img src="./readme/main.png" width="100%">
<h3 align="center"style="text-decoration:underline; font-style:italic">Описание проекта <span style="font-style: normal">&#128444;</span></h3>
<p>Проект представляет собой поисковый сервис с помощью которого можно с помощью поиска найти фильмы на стороннем ресурсе BeatFilm.</p>
<p align="center" style="font-weight:bolder">Используемые технологии</p>
<div align="center" style="font-weight:bolder; color:#3DDC84">JavaScript React.js Git Express.js mongoDB HTML CSS</div>

При первом входе пользователь попадает на главную страницу с описанием информации по созданному проекту.

Пользователю предоставляется возможность перейти на страницу регистрации или входа в правой верхней части экрана.

После успешной регистрации/авторизации, пользователь попадает на страницу поиска фильмов - необходимо ввести ключевое слово и нажать на кнопку поиск, также среди найденных фильсов можно произвести фильтрацию на короткометражные фильмы (менее 40 минут включительно), нажав на переключатель. При нажатии на фильм на новой вкладке открывается трейлер данного фильма.

Понравившиеся фильмы можно добавить в Сохраненные - поставить лайк &#128156;. Удалить фильм из любимых можно повторным нажатием на сердечко либо со страницы Сохраненные фильмы при нажатии на крестик &#10006;. На странице Сохраненные фильмы можно также произвести аналогичный поиск.

Имеется возможность изменения данных пользователя при переходе на страницу профиля - имя пользователя и его электронную почту.

<img src="./readme/video.gif" width="100%">
<h3 align="center"style="text-decoration:underline; font-style:italic">Инструкция по развертыванию <span style="font-style: normal">&#128212;</span></h3>
<p align="center">Хотите попробовать в использовании данный ресурс?</p>
<ol>
 <li>Клонируйте данный репозиторий локально</li>
 <li>Клонируйте репозиторий с бэкендом - <a href="https://github.com/MariaRez/movies-explorer-api">&#128073;&#128161;</a></li>
 <li>В бэкенде на строке 32 измените порт на 3001</li>
 <li>Запустите бэкенд командой <span style="font-weight:bolder; color:#3DDC84">npm run dev</span></li>
 <li>В клонированном фронтенде в файлах /src/utils/<span style="font-weight:bolder">auth.js</span> и /src/utils/<span style="font-weight:bolder">MainApi.js</span> на 56 и 83 строках соответственно замените baseUrl на <span style="font-weight:bolder; color:#3DDC84">"http://localhost:3001"</span></li>
 <li>Запустите фронтенд командой <span style="font-weight:bolder; color:#3DDC84">npm run start</span></li>
 <li>Наслаждайтесь функционалом &#127881;</li>
</ol>
<h3 align="center"style="text-decoration:underline; font-style:italic">Планы по доработке проекта <span style="font-style: normal">&#128221;</span></h3>
<ul style="list-style: square">
<li>Закрытие модальных окон при нажатии на Escape</li>
<li>Закрытие модальных окон при нажатии на клику все окна</li>
<li>Фильтрация фильмов по различным критериям - страна производства, язык фильма и другие критерии</li>
<li>Возможность добавления и изменения аватара пользователя</li>
<li>Функция восстановления пароля</li>
<li>Изменение пароля пользователя</li>
</ul>
<h3 align="center"style="text-decoration:underline; font-style:italic">Дополнительная информация <span style="font-style: normal">&#128222;</span></h3>
<ul style="list-style: square">
<li>Публичный IP 158.160.57.76</li>
<li><a style="color:#3DDC84" href="https://mariarez.students.nomoredomainsclub.ru">Ссылка на фронтенд (ограниченный срок гранта - может не работать)</a></li>
<li><a style="color:#3DDC84" href="https://api.mariarez.students.nomoredomains.club">Ссылка на бэкенд (ограниченный срок гранта - может не работать)</a></li>
<li><a style="color:#3DDC84" href="https://disk.yandex.ru/d/XLTAY9OVFSzRHw">Ссылка на сгенерированный макет</a></li>
<ul>