# Eed-Frontend
Фронтенд приложения, эмулирующего работу аппаратур связи

## DEV Сборка для локальной машины
shell

yarn install
yarn run lint
yarn run serve

## Сборка проекта в релиз
shell

yarn run build
Проект будет собран в корень, папка dist


## Сборка через docker 
shell

docker build -t eed-frontend .
docker run eed-frontend 


## Описание основных файлов проекта

#### @api/config.js
Файл, в котором задаются данные для подключения к eed-backend (host:port) 

#### @handlers/hwComponentsHandle.js
Файл, содержащий функции работы с HardwareComponents (аппаратурой, её блоками и элементами на ней) 

#### @handlers/ServerHandler.js
Файл, в котором описан класс взаимодействия с сервером

#### @handlers/newServerHandler.js
Файл, в котором описан класс взаимодействия с сервером

#### @icons/
Папка с некоторыми иконками сайта

#### @router/index.js
Файл отвечающий за регистрацию страниц и их путей

#### @views/Login.vue
Страница авторизации

#### @views/P302O.vue
Страница аппаратуры П-302-О
Использует: sideBarMenu, hardwareCanvas

#### @views/P302O/sideBarMenu.vue
Модуль выезжающего бокового меню

#### @views/P302O/hardwareCanvas.vue
Модуль отображения текущего блока аппаратуры
Использует: canvasComponent

#### @views/P302O/canvasComponent.vue
Модуль отображения элементов аппаратуры (кнопки, рычаги, лампочки и тд.)

#### @views/eidtor/
В папке хранятся файлы, относящиейся к находящемуся в процессе разработки редактору аппаратур и нормативов
