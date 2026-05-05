
# Docker

**1. Docker Desktop**
Это как красивая кухня с плитой, духовкой и панелью управления.
На ней есть кнопки, окна и всё удобно для работы — чтобы повар (ты) мог видеть, что готовится, и быстро запускать/останавливать процессы.
📌 Это программа с графическим интерфейсом для Windows и macOS, которая упрощает работу с Docker.

---

**2. Docker Engine**
Это сама «плита» и «духовка» внутри кухни.
Она реально греет, варит и печёт, когда ты ей даёшь рецепт.
📌 Это основной механизм Docker, который запускает и управляет контейнерами. Работает на фоне, без красивых кнопок.

---

**3. Image (образ)**
Это как рецепт блюда 📖.
В нём написано: какие продукты нужны, в каком порядке их класть и как готовить.
📌 Образ — это «застывший» шаблон программы со всем, что ей нужно для работы (код, библиотеки, конфиги).

---

**4. Container (контейнер)**
Это уже готовое блюдо 🍲, сделанное по рецепту (образу).
📌 Контейнер — это запущенная копия образа, которая реально работает и выполняет задачи.

---

**5. Process / Server**
Это как официант, который разносит еду, пока ты готовишь новые блюда.
📌 Внутри контейнера обычно запускается процесс (например, веб-сервер), который принимает запросы и отвечает на них.

---

💡 **Если собрать всё вместе:**

* **Docker Desktop** — красивая кухня, где видно, что готовишь.
* **Docker Engine** — мотор кухни, который всё реально делает.
* **Image** — рецепт.
* **Container** — готовое блюдо по рецепту.



## Основные команды Docker
---

## 📦 Работа с образами

```bash
docker build -t имя_образа .      # Собрать образ из Dockerfile
docker images                     # Показать список образов
docker rmi имя_образа             # Удалить образ
```

---

## 🏃 Запуск контейнеров

```bash
docker run имя_образа                     # Запустить контейнер
docker run --rm имя_образа                 # Запустить и удалить после завершения
docker run -it имя_образа /bin/sh          # Запустить с интерактивным терминалом
docker ps                                  # Показать запущенные контейнеры
docker ps -a                               # Показать все контейнеры
docker stop id_или_имя                     # Остановить контейнер
docker rm id_или_имя                       # Удалить контейнер
```

---

## 📤 Работа с Docker Hub

```bash
docker login                               # Войти в Docker Hub
docker tag имя_образа user/репо:тег        # Переименовать (тегировать) образ
docker push user/репо:тег                  # Отправить образ в Docker Hub
docker pull user/репо:тег                  # Скачать образ с Docker Hub
```

---

## 🛠 Полезное

```bash
docker exec -it id_или_имя bash            # Зайти внутрь запущенного контейнера
docker logs id_или_имя                     # Посмотреть логи контейнера
docker system prune -a                     # Очистить все неиспользуемые образы/контейнеры
```

---


## Инструкция - как создать простое докер приложение, выводящее в консоль. Выложить его на докер-хаб

---

## 1. Создаём папку и заходим в неё

```bash
mkdir console-log-app
cd console-log-app
```

---

## 2. Создаём файл **app.js**

**app.js**:

```js
console.log("Hello from inside Docker!");
```

---

## 3. Создаём файл **Dockerfile**

**Dockerfile**:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
CMD ["node", "app.js"]
```

---

## 4. Собираем образ

```bash
docker build -t console-log-app .
```

---

## 5. Логинимся в Docker Hub

```bash
docker login
```

---

## 6. Тегируем образ под свой репозиторий

```bash
docker tag console-log-app myname/console-log-app:latest
```

*(замени `myname` на свой Docker Hub username)*

---

## 7. Пушим на Docker Hub

```bash
docker push myname/console-log-app:latest
```

---

## 8. Проверка

```bash
docker run --rm myname/console-log-app
```

Ожидаемый вывод:

```
Hello from inside Docker!
```




---

## 🗂 Структура Dockerfile

| Инструкция     | Описание                                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------------------------------- |
| **FROM**       | Базовый образ, с которого начинаем. Пример: `FROM node:18-alpine`                                                   |
| **WORKDIR**    | Рабочая директория внутри контейнера. Если нет — создаётся. Пример: `WORKDIR /app`                                  |
| **COPY**       | Копирует файлы с хоста в контейнер. Пример: `COPY . .` (всё в текущую рабочую папку)                                |
| **RUN**        | Выполняет команду при сборке образа. Пример: `RUN npm install`                                                      |
| **CMD**        | Команда, которая запускается **по умолчанию** при старте контейнера. Пример: `CMD ["node", "app.js"]`               |
| **ENTRYPOINT** | Основная команда, которую можно дополнять аргументами при запуске контейнера. Пример: `ENTRYPOINT ["npm", "start"]` |
| **EXPOSE**     | Документирует, какие порты контейнер использует. Пример: `EXPOSE 3000`                                              |
| **ENV**        | Переменные окружения. Пример: `ENV NODE_ENV=production`                                                             |

---

## 🔹 Минимальный пример

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

**Как это работает:**

1. **FROM** — берём официальный образ Node.js.
2. **WORKDIR** — создаём и переходим в `/app`.
3. **COPY package*.json ./*\* — копируем файлы с зависимостями.
4. **RUN npm install** — устанавливаем зависимости.
5. **COPY . .** — копируем весь проект в контейнер.
6. **EXPOSE 3000** — указываем порт приложения.
7. **CMD** — запускаем сервер.

---

## Пример: простой Node.js сервер + Dockerfile, который его запускает.

---

## 1. Структура проекта

```
simple-server/
├── server.js
├── package.json
└── Dockerfile
```

---

## 2. Код простого сервера

**`server.js`**

```js
const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello from Docker server!\n');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
```

---

**`package.json`**

```json
{
  "name": "simple-server",
  "version": "1.0.0",
  "main": "server.js"
}
```

*(Здесь нет зависимостей, так как мы используем встроенный модуль `http`.)*

---

## 3. Dockerfile

**`Dockerfile`**

```dockerfile
# 1. Базовый образ Node.js
FROM node:18-alpine

# 2. Рабочая директория
WORKDIR /app

# 3. Копируем package.json
COPY package.json .

# 4. (Нет npm install, т.к. зависимостей нет)
# Если бы были — добавили бы:
# RUN npm install

# 5. Копируем остальной код
COPY . .

# 6. Открываем порт 3000
EXPOSE 3000

# 7. Запуск сервера
CMD ["node", "server.js"]
```

---

## 4. Сборка и запуск

```bash
docker build -t simple-server .
docker run -p 3000:3000 simple-server
```

Теперь сервер доступен на
[http://localhost:3000](http://localhost:3000)
Ответ:

```
Hello from Docker server!
```

---
## Если хотим - можем добавить **docker-compose** для `simple-server`.

---

**`docker-compose.yml`**

```yaml
version: "3.8"

services:
  simple-server:
    build: .
    container_name: simple-server-container
    ports:
      - "3000:3000"
```

---

### Как использовать

1. Убедись, что рядом с этим файлом есть твой

   * `Dockerfile`
   * `server.js`
   * `package.json`

2. Запусти:

```bash
docker compose up
```

3. Перейди в браузере на:

```
http://localhost:3000
```

Ты увидишь:

```
Hello from Docker server!
```

4. Остановить:

```bash
docker compose down
```

---


Вот максимально простой старт с **Express.js** — буквально «с нуля до первого ответа сервера» 👇

---

## 🚀 1. Создать проект

Открой терминал:

```bash
mkdir my-app
cd my-app
npm init -y
```

---

## 📦 2. Установить Express

```bash
npm install express
```

---

## 🧠 3. Создать файл сервера

Создай файл `index.js`:

```js
const express = require('express')
const app = express()

const PORT = 3000

app.get('/', (req, res) => {
  res.send('Привет, мир!')
})

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`)
})
```

---

## ▶️ 4. Запустить сервер

```bash
node index.js
```

Открой в браузере:

```
http://localhost:3000
```

👉 Увидишь:
**"Привет, мир!"**

---

## 🧩 Что здесь происходит

* `express()` — создаём приложение
* `app.get('/')` — говорим: "если пришёл запрос на `/`, ответь"
* `res.send()` — отправляем ответ
* `app.listen()` — запускаем сервер

---

## 💡 Мини-улучшение (удобный перезапуск)

Установи **nodemon**:

```bash
npm install -D nodemon
```

И запускай так:

```bash
npx nodemon index.js
```

Теперь сервер будет сам перезапускаться при изменениях 👌

---
