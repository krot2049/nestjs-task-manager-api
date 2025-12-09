# Task Manager API

## Запуск

1. **Запустите базу данных:**
   docker-compose up -d

*Docker должен быть установлен и запущен!*


2. **Установите зависимости и запустите сервер:**
   npm install
   npm run start:dev


3. **Откройте index.html в браузере** для тестирования API.

## Настройка БД (если нужно)

По умолчанию: PostgreSQL на localhost:5432, база task_manager.

Создайте файл `.env` для своих настроек:
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=task_manager
JWT_SECRET=ваш-секретный-ключ



## Возможности

### Авторизация
- Регистрация
- Вход с JWT
- Автосохранение токена

### Задачи
- Создание, просмотр, обновление, удаление
- Фильтрация по статусу (OPEN, IN_PROGRESS, DONE)
- Поиск по тексту

## API

### Эндпоинты
- POST `/auth/signup` — регистрация
- POST `/auth/signin` — вход
- POST `/tasks` — создать задачу
- GET `/tasks` — все задачи
- PATCH `/tasks/:id/status` — обновить статус
- DELETE `/tasks/:id` — удалить задачу

### Фильтрация
- GET `/tasks?status=OPEN`
- GET `/tasks?search=текст`
