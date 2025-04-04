# PackageFlowAngular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Tasks

* Приложение должно работать с API (см. раздел ниже) для загрузки данных о пакетах
* Каждый пакет должен быть представлен в виде карточки
  * Заголовок должен отображать имя пакета. В случае если имя составное (через /), первая часть должна быть выделена цветом
  * Тело должно содержать число скачек и зависимостей. В случае если число превышает 1000, оно должно быть округлено вниз до тысяч с буквой «К»; в случае если превышает 1000000, то до миллионов с буквой «М».
  * При наведении курсора на карточку её заголовок должен быть подсвечен, а также другим цветом должны быть подсвечены заголовки всех карточек пакетов, находящихся в зависимостях у выделенного пакета (в примере tslib является зависимостью @angular/core)
* Список пакетов должен быть скроллируемым
* Пользователь должен иметь возможность фильтровать пакеты по названию
* Пользователь должен иметь возможность перезагрузить все данные по кнопке или иным способом

### API

`GET /packages` – возвращает список всех пакетов:

```json
{
  id: string;
  weeklyDownloads: number;
  dependencyCount: number;
}[]
```

`GET /packages/:id/dependencies` – возвращает список ID пакетов-зависимостей для указанного пакета:

```json
string[]
```
