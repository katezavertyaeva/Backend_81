# 🧪 Задание: Magic 8 Ball API (без query)

## 🎯 Цель

* `res.json()`
* `res.redirect()`
* случайные ответы
* версионирование API

---

# 📌 Условия

## 📁 Версии API

Сделай:

* `/api/v1/8ball`
* `/api/v2/8ball`

---

# 🎱 1. Версия v1 (простая)

📥 **GET /api/v1/8ball**

👉 Всегда возвращает случайный ответ:

```json
{
  "answer": "Yes"
}
```

## 🔤 Ответы:

```ts
const answersV1 = [
  "Yes",
  "No",
  "Maybe",
  "Ask again later"
];
```

---

# 🎱 2. Версия v2 (расширенная)

📥 **GET /api/v2/8ball**

👉 Возвращает более подробный ответ:

```json
{
  "answer": "Yes",
  "confidence": "high",
  "timestamp": "2026-04-09T12:00:00.000Z"
}
```

---

## 🔤 Ответы:

```ts
const answersV2 = [
  { text: "Yes", confidence: "high" },
  { text: "No", confidence: "high" },
  { text: "Maybe", confidence: "medium" },
  { text: "Ask again later", confidence: "low" }
];
```

---

# 🔁 3. Редирект

📥 **GET /8ball**

👉 Должен редиректить на последнюю версию:

```ts
res.redirect(302, "/api/v2/8ball");
```

---

# 🧠 Подсказки

## 🎲 Случайный элемент

```ts
function getRandom<T>(arr: T[]): T {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}
```

---

# ⭐ Ожидаемое поведение

### 👉 `/api/v1/8ball`

```json
{
  "answer": "No"
}
```

### 👉 `/api/v2/8ball`

```json
{
  "answer": "Maybe",
  "confidence": "medium",
  "timestamp": "2026-04-09T12:00:00.000Z"
}
```

### 👉 `/8ball`

➡ редирект на `/api/v2/8ball`

---
