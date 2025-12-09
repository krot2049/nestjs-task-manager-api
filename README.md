Task Manager API
Запуск проекта (обязательный порядок):

Запустите Docker-контейнер с базой данных:

bash
docker-compose up -d
Важно: Docker должен быть установлен и запущен перед выполнением этой команды.

Запуск сервера:

bash
npm install
npm run start:dev
Откройте index.html в браузере
Тестируйте API через готовый веб-интерфейс

Настройка базы данных (если нужно)
По умолчанию используется PostgreSQL на localhost:5432 с базой task_manager.

Если у вас другие настройки, создайте файл .env:

text
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=task_manager
JWT_SECRET=ваш-секретный-ключ
Что умеет веб-интерфейс:
Авторизация
Регистрация новых пользователей

Вход с получением JWT токена

Автоматическое сохранение токена

Управление задачами
Создание новых задач

Просмотр всех своих задач

Фильтрация по статусу (OPEN, IN_PROGRESS, DONE)

Поиск по названию и описанию

Обновление статуса задач

Удаление задач

Технические детали
Эндполиты:
POST /auth/signup - регистрация

POST /auth/signin - вход (JWT токен)

POST /tasks - создать задачу

GET /tasks - получить все задачи

PATCH /tasks/:id/status - обновить статус

DELETE /tasks/:id - удалить задачу

Фильтрация:
GET /tasks?status=OPEN

GET /tasks?search=текст

